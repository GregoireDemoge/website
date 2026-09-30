// Game of Life background, ported from the FullEnrich manifesto page.
// Renders with three.js (loaded from a CDN on demand) as a point cloud with a
// rounded-dot texture. Cells fade in with age and leave a short ghost trail.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ThreeNamespace = any;

declare global {
	interface Window {
		THREE?: ThreeNamespace;
	}
}

function loadThree(): Promise<ThreeNamespace> {
	if (typeof window === 'undefined') {
		return Promise.reject(new Error('Game of Life background requires a browser'));
	}

	if (window.THREE) {
		return Promise.resolve(window.THREE);
	}

	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
		script.async = true;
		script.onload = () => {
			if (window.THREE) resolve(window.THREE);
			else reject(new Error('Three.js failed to load'));
		};
		script.onerror = () => reject(new Error('Three.js failed to load'));
		document.head.appendChild(script);
	});
}

function getContainerSize(container: HTMLElement) {
	return {
		width: container.clientWidth,
		height: container.clientHeight
	};
}

export async function initGameOfLifeBackground(container: HTMLElement): Promise<() => void> {
	const THREE = await loadThree();

	container.style.cssText =
		'position:absolute;inset:0;overflow:hidden;pointer-events:auto;touch-action:pan-y;';

	// ── Setup ──────────────────────────────────────────────
	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0xffffff);

	const camera = new THREE.OrthographicCamera();
	camera.position.z = 1;

	const renderer = new THREE.WebGLRenderer({ antialias: true });
	let { width: viewWidth, height: viewHeight } = getContainerSize(container);
	renderer.setSize(viewWidth, viewHeight);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
	container.appendChild(renderer.domElement);

	// ── Top and bottom fades ───────────────────────────────
	const fadeDiv = document.createElement('div');
	fadeDiv.style.cssText =
		'position:absolute;bottom:0;left:0;right:0;height:120px;background:linear-gradient(to bottom,rgba(255,255,255,0),rgba(255,255,255,1));pointer-events:none;z-index:1;';
	container.appendChild(fadeDiv);

	const fadeTop = document.createElement('div');
	fadeTop.style.cssText =
		'position:absolute;top:0;left:0;right:0;height:56px;background:linear-gradient(to top,rgba(255,255,255,0),rgba(255,255,255,1));pointer-events:none;z-index:1;';
	container.appendChild(fadeTop);

	// ── Grid config ────────────────────────────────────────
	const CELL_SIZE = 11;
	let cols: number, rows: number, totalCells: number;
	let grid: Uint8Array, nextGrid: Uint8Array;
	let age: Float32Array;
	let ghost: Float32Array;
	let targetOpacity: Float32Array,
		currentOpacity: Float32Array,
		targetSize: Float32Array,
		currentSize: Float32Array;

	const TICK_INTERVAL = 0.18;
	let tickAccum = 0;
	const LERP_SPEED = 6;

	function createDotTexture() {
		const c = document.createElement('canvas');
		c.width = c.height = 32;
		const ctx = c.getContext('2d')!;
		const r = 5;
		const m = 2;
		ctx.beginPath();
		ctx.moveTo(m + r, m);
		ctx.lineTo(32 - m - r, m);
		ctx.quadraticCurveTo(32 - m, m, 32 - m, m + r);
		ctx.lineTo(32 - m, 32 - m - r);
		ctx.quadraticCurveTo(32 - m, 32 - m, 32 - m - r, 32 - m);
		ctx.lineTo(m + r, 32 - m);
		ctx.quadraticCurveTo(m, 32 - m, m, 32 - m - r);
		ctx.lineTo(m, m + r);
		ctx.quadraticCurveTo(m, m, m + r, m);
		ctx.closePath();
		ctx.fillStyle = 'rgba(0,0,0,1)';
		ctx.fill();
		return new THREE.CanvasTexture(c);
	}

	const GHOST_GENERATIONS = 4;

	function ageOpacity(a: number) {
		const t = Math.min(a / 2, 1);
		return 0.025 + t * 0.14;
	}

	function ageSize(a: number) {
		const t = Math.min(a / 2, 1);
		return 3.0 + t * 3.6;
	}

	function ghostOpacity(g: number) {
		return 0.02 * (g / GHOST_GENERATIONS);
	}

	function ghostSize(g: number) {
		return 2.0 + (g / GHOST_GENERATIONS) * 1.5;
	}

	function idx(x: number, y: number) {
		return ((y + rows) % rows) * cols + ((x + cols) % cols);
	}

	function seedPatterns() {
		grid.fill(0);

		function seedCluster(cx: number, cy: number, w: number, h: number, density: number) {
			for (let x = cx - w / 2; x < cx + w / 2; x++) {
				for (let y = cy - h / 2; y < cy + h / 2; y++) {
					if (Math.random() < density) {
						const ix = Math.floor(x),
							iy = Math.floor(y);
						if (ix >= 0 && ix < cols && iy >= 0 && iy < rows) {
							grid[idx(ix, iy)] = 1;
						}
					}
				}
			}
		}

		function place(pattern: number[][], ox: number, oy: number) {
			pattern.forEach(([dx, dy]) => {
				const x = ox + dx,
					y = oy + dy;
				if (x >= 0 && x < cols && y >= 0 && y < rows) grid[idx(x, y)] = 1;
			});
		}

		const rpentomino = [
			[0, -1],
			[1, -1],
			[0, 0],
			[-1, 0],
			[0, 1]
		];

		const glider = [
			[1, 0],
			[2, 1],
			[0, 2],
			[1, 2],
			[2, 2]
		];

		const lwss = [
			[1, 0],
			[4, 0],
			[0, 1],
			[0, 2],
			[4, 2],
			[0, 3],
			[1, 3],
			[2, 3],
			[3, 3]
		];

		const cxMid = Math.floor(cols / 2);
		const cyMid = Math.floor(rows / 2);

		seedCluster(cxMid, cyMid + rows * 0.15, cols * 0.3, rows * 0.25, 0.35);
		seedCluster(cols * 0.15, rows * 0.2, cols * 0.12, rows * 0.15, 0.4);
		seedCluster(cols * 0.8, rows * 0.15, cols * 0.1, rows * 0.1, 0.45);
		seedCluster(cols * 0.85, rows * 0.55, cols * 0.08, rows * 0.2, 0.35);
		seedCluster(cols * 0.2, rows * 0.75, cols * 0.1, rows * 0.12, 0.4);

		place(rpentomino, cxMid - 10, cyMid);
		place(rpentomino, cxMid + 15, cyMid - 5);
		place(rpentomino, cxMid, cyMid + 10);

		for (let i = 0; i < 8; i++) {
			place(
				glider,
				Math.floor(Math.random() * cols * 0.8 + cols * 0.1),
				Math.floor(Math.random() * rows * 0.8 + rows * 0.1)
			);
		}

		place(lwss, Math.floor(cols * 0.1), Math.floor(rows * 0.4));
		place(lwss, Math.floor(cols * 0.7), Math.floor(rows * 0.6));

		for (let i = 0; i < totalCells * 0.02; i++) {
			const x = Math.floor(Math.random() * cols);
			const y = Math.floor(Math.random() * rows);
			grid[idx(x, y)] = 1;
		}
	}

	function initGrid() {
		({ width: viewWidth, height: viewHeight } = getContainerSize(container));
		cols = Math.ceil(viewWidth / CELL_SIZE) + 2;
		rows = Math.ceil(viewHeight / CELL_SIZE) + 2;
		totalCells = cols * rows;

		grid = new Uint8Array(totalCells);
		nextGrid = new Uint8Array(totalCells);
		age = new Float32Array(totalCells);
		ghost = new Float32Array(totalCells);
		targetOpacity = new Float32Array(totalCells);
		currentOpacity = new Float32Array(totalCells);
		targetSize = new Float32Array(totalCells);
		currentSize = new Float32Array(totalCells);

		seedPatterns();

		for (let i = 0; i < totalCells; i++) {
			age[i] = grid[i] ? 1 : 0;
			ghost[i] = 0;
			const a = age[i];
			targetOpacity[i] = grid[i] ? ageOpacity(a) : 0;
			currentOpacity[i] = 0;
			targetSize[i] = grid[i] ? ageSize(a) : 1.0;
			currentSize[i] = 0;
		}
	}

	let aliveCount = 0;

	function step() {
		nextGrid.fill(0);
		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				let neighbors = 0;
				for (let dy = -1; dy <= 1; dy++) {
					for (let dx = -1; dx <= 1; dx++) {
						if (dx === 0 && dy === 0) continue;
						neighbors += grid[idx(x + dx, y + dy)];
					}
				}
				const i = idx(x, y);
				const alive = grid[i];
				if (alive) {
					nextGrid[i] = neighbors === 2 || neighbors === 3 ? 1 : 0;
				} else {
					nextGrid[i] = neighbors === 3 ? 1 : 0;
				}
			}
		}

		[grid, nextGrid] = [nextGrid, grid];

		for (let i = 0; i < totalCells; i++) {
			if (grid[i]) {
				age[i]++;
				ghost[i] = GHOST_GENERATIONS;
				targetOpacity[i] = ageOpacity(age[i]);
				targetSize[i] = ageSize(age[i]);
			} else {
				if (age[i] > 0) {
					ghost[i] = GHOST_GENERATIONS;
				}
				age[i] = 0;

				if (ghost[i] > 0) {
					ghost[i]--;
					targetOpacity[i] = ghostOpacity(ghost[i]);
					targetSize[i] = ghostSize(ghost[i]);
				} else {
					targetOpacity[i] = 0;
					targetSize[i] = 1.0;
				}
			}
		}

		aliveCount++;
		if (aliveCount % 30 === 0) {
			const rpentomino = [
				[0, -1],
				[1, -1],
				[0, 0],
				[-1, 0],
				[0, 1]
			];
			const ox = Math.floor(Math.random() * (cols - 10) + 5);
			const oy = Math.floor(Math.random() * (rows - 10) + 5);
			rpentomino.forEach(([dx, dy]) => {
				const x = ox + dx,
					y = oy + dy;
				if (x >= 0 && x < cols && y >= 0 && y < rows) {
					const i = idx(x, y);
					grid[i] = 1;
					age[i] = 1;
					targetOpacity[i] = ageOpacity(1);
					targetSize[i] = ageSize(1);
				}
			});
		}
	}

	let geometry: InstanceType<ThreeNamespace['BufferGeometry']>;
	let sizeAttr: InstanceType<ThreeNamespace['BufferAttribute']>;
	let opacityAttr: InstanceType<ThreeNamespace['BufferAttribute']>;
	let pointsMesh: InstanceType<ThreeNamespace['Points']>;

	const dotTex = createDotTexture();
	const material = new THREE.ShaderMaterial({
		transparent: true,
		depthWrite: false,
		uniforms: {
			uPixelRatio: { value: renderer.getPixelRatio() },
			uDotTexture: { value: dotTex }
		},
		vertexShader: `
			attribute float aSize;
			attribute float aOpacity;
			uniform float uPixelRatio;
			varying float vOpacity;

			void main() {
			  vec3 pos = position;
			  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
			  gl_PointSize = aSize * uPixelRatio;
			  gl_Position = projectionMatrix * mv;
			  vOpacity = aOpacity;
			}
		`,
		fragmentShader: `
			uniform sampler2D uDotTexture;
			varying float vOpacity;
			void main() {
			  if (vOpacity < 0.01) discard;
			  float alpha = texture2D(uDotTexture, gl_PointCoord).a;
			  gl_FragColor = vec4(0.05, 0.05, 0.07, alpha * vOpacity);
			}
		`
	});

	function buildGeometry() {
		if (pointsMesh) {
			scene.remove(pointsMesh);
			geometry.dispose();
		}

		geometry = new THREE.BufferGeometry();
		const positions = new Float32Array(totalCells * 3);
		const sizes = new Float32Array(totalCells);
		const opacities = new Float32Array(totalCells);

		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				const i = y * cols + x;
				positions[i * 3] = (x - cols / 2) * CELL_SIZE;
				positions[i * 3 + 1] = -(y - rows / 2) * CELL_SIZE;
				positions[i * 3 + 2] = 0;
				sizes[i] = currentSize[i];
				opacities[i] = currentOpacity[i];
			}
		}

		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
		geometry.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1));

		sizeAttr = geometry.attributes.aSize;
		opacityAttr = geometry.attributes.aOpacity;

		pointsMesh = new THREE.Points(geometry, material);
		scene.add(pointsMesh);
	}

	function updateCamera() {
		const hw = viewWidth / 2;
		const hh = viewHeight / 2;
		camera.left = -hw;
		camera.right = hw;
		camera.top = hh;
		camera.bottom = -hh;
		camera.updateProjectionMatrix();
	}

	const mouseGrid = { x: -1, y: -1 };

	function updateMouse(cx: number, cy: number) {
		mouseGrid.x = Math.floor(cx / CELL_SIZE);
		mouseGrid.y = Math.floor(cy / CELL_SIZE);
	}

	function seedAtMouse() {
		const mx = mouseGrid.x,
			my = mouseGrid.y;
		if (mx < 0 || mx >= cols || my < 0 || my >= rows) return;
		const r = 2;
		for (let dx = -r; dx <= r; dx++) {
			for (let dy = -r; dy <= r; dy++) {
				if (Math.random() > 0.5) continue;
				const x = mx + dx,
					y = my + dy;
				if (x >= 0 && x < cols && y >= 0 && y < rows) {
					const i = idx(x, y);
					grid[i] = 1;
					age[i] = 1;
					targetOpacity[i] = ageOpacity(1);
					targetSize[i] = ageSize(1);
				}
			}
		}
	}

	initGrid();
	updateCamera();
	buildGeometry();

	const clock = new THREE.Clock();
	let frameId = 0;

	function animate() {
		const delta = clock.getDelta();
		tickAccum += delta;

		if (tickAccum >= TICK_INTERVAL) {
			tickAccum -= TICK_INTERVAL;
			step();
		}

		const lerpFactor = 1 - Math.exp(-LERP_SPEED * delta);
		for (let i = 0; i < totalCells; i++) {
			currentOpacity[i] += (targetOpacity[i] - currentOpacity[i]) * lerpFactor;
			currentSize[i] += (targetSize[i] - currentSize[i]) * lerpFactor;
			sizeAttr.array[i] = currentSize[i];
			opacityAttr.array[i] = currentOpacity[i];
		}
		sizeAttr.needsUpdate = true;
		opacityAttr.needsUpdate = true;

		renderer.render(scene, camera);
		frameId = requestAnimationFrame(animate);
	}

	frameId = requestAnimationFrame(animate);

	function pointerPosition(clientX: number, clientY: number) {
		const rect = container.getBoundingClientRect();
		return { x: clientX - rect.left, y: clientY - rect.top };
	}

	function updateMouseFromClient(clientX: number, clientY: number) {
		const { x, y } = pointerPosition(clientX, clientY);
		if (x < 0 || y < 0 || x > viewWidth || y > viewHeight) {
			mouseGrid.x = -1;
			return;
		}
		updateMouse(x, y);
	}

	const onResize = () => {
		({ width: viewWidth, height: viewHeight } = getContainerSize(container));
		if (viewWidth === 0 || viewHeight === 0) return;
		renderer.setSize(viewWidth, viewHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
		updateCamera();
		initGrid();
		buildGeometry();
	};

	const resizeObserver = new ResizeObserver(onResize);
	resizeObserver.observe(container);

	const onMouseMove = (e: MouseEvent) => updateMouseFromClient(e.clientX, e.clientY);

	const onClick = (e: MouseEvent) => {
		updateMouseFromClient(e.clientX, e.clientY);
		seedAtMouse();
	};

	const onTouchStart = (e: TouchEvent) => {
		updateMouseFromClient(e.touches[0].clientX, e.touches[0].clientY);
		seedAtMouse();
	};

	const onTouchMove = (e: TouchEvent) => {
		updateMouseFromClient(e.touches[0].clientX, e.touches[0].clientY);
		seedAtMouse();
	};

	container.addEventListener('mousemove', onMouseMove);
	container.addEventListener('click', onClick);
	container.addEventListener('touchstart', onTouchStart, { passive: true });
	container.addEventListener('touchmove', onTouchMove, { passive: true });

	return () => {
		cancelAnimationFrame(frameId);
		resizeObserver.disconnect();
		container.removeEventListener('mousemove', onMouseMove);
		container.removeEventListener('click', onClick);
		container.removeEventListener('touchstart', onTouchStart);
		container.removeEventListener('touchmove', onTouchMove);

		if (pointsMesh) {
			scene.remove(pointsMesh);
			geometry.dispose();
		}
		material.dispose();
		dotTex.dispose();
		renderer.dispose();
		container.replaceChildren();
	};
}
