<script lang="ts">
	// Conway's Game of Life, drawn very faintly behind the page.
	// One fixed canvas, a coarse grid, a slow tick, cells that fade in and out.
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const CELL = 16; // px per cell (CSS pixels)
		const TICK_MS = 420; // one generation
		const DENSITY = 0.1; // initial fill
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		const dark = window.matchMedia('(prefers-color-scheme: dark)');

		let cols = 0;
		let rows = 0;
		let cells = new Uint8Array(0); // 1 = alive
		let age = new Float32Array(0); // 0..1 opacity ramp, for soft fades
		let raf = 0;
		let timer = 0;
		let generation = 0;

		function seed() {
			for (let i = 0; i < cells.length; i++) cells[i] = Math.random() < DENSITY ? 1 : 0;
			age.fill(0);
			generation = 0;
		}

		function resize() {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const w = window.innerWidth;
			const h = window.innerHeight;
			canvas.width = Math.round(w * dpr);
			canvas.height = Math.round(h * dpr);
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

			const newCols = Math.ceil(w / CELL) + 1;
			const newRows = Math.ceil(h / CELL) + 1;
			if (newCols !== cols || newRows !== rows) {
				const next = new Uint8Array(newCols * newRows);
				const nextAge = new Float32Array(newCols * newRows);
				for (let y = 0; y < Math.min(rows, newRows); y++) {
					for (let x = 0; x < Math.min(cols, newCols); x++) {
						next[y * newCols + x] = cells[y * cols + x];
						nextAge[y * newCols + x] = age[y * cols + x];
					}
				}
				const fresh = cols === 0;
				cols = newCols;
				rows = newRows;
				cells = next;
				age = nextAge;
				if (fresh) seed();
			}
			draw();
		}

		function step() {
			const next = new Uint8Array(cells.length);
			let alive = 0;
			for (let y = 0; y < rows; y++) {
				const up = ((y - 1 + rows) % rows) * cols;
				const mid = y * cols;
				const down = ((y + 1) % rows) * cols;
				for (let x = 0; x < cols; x++) {
					const l = (x - 1 + cols) % cols;
					const r = (x + 1) % cols;
					const n =
						cells[up + l] + cells[up + x] + cells[up + r] +
						cells[mid + l] + cells[mid + r] +
						cells[down + l] + cells[down + x] + cells[down + r];
					const v = cells[mid + x] ? (n === 2 || n === 3 ? 1 : 0) : n === 3 ? 1 : 0;
					next[mid + x] = v;
					alive += v;
				}
			}
			cells = next;
			generation++;
			// Keep the board from going still: sprinkle a few cells now and then,
			// and reseed if it ever dies out.
			if (alive < cells.length * 0.01) seed();
			else if (generation % 40 === 0) {
				for (let k = 0; k < 6; k++) {
					const x = Math.floor(Math.random() * (cols - 3));
					const y = Math.floor(Math.random() * (rows - 3));
					// a glider
					const g = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]];
					for (const [dx, dy] of g) cells[(y + dy) * cols + (x + dx)] = 1;
				}
			}
		}

		function draw() {
			const w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
			const h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));
			ctx!.clearRect(0, 0, w, h);
			const color = dark.matches ? '255,255,255' : '26,25,43';
			const maxAlpha = dark.matches ? 0.055 : 0.045;
			const size = CELL - 6; // small square, generous gap
			const off = (CELL - size) / 2;
			for (let y = 0; y < rows; y++) {
				for (let x = 0; x < cols; x++) {
					const i = y * cols + x;
					// ease opacity toward the target state
					const target = cells[i];
					age[i] += (target - age[i]) * 0.18;
					const a = age[i];
					if (a < 0.01) continue;
					ctx!.fillStyle = `rgba(${color},${(a * maxAlpha).toFixed(4)})`;
					ctx!.fillRect(x * CELL + off, y * CELL + off, size, size);
				}
			}
		}

		function loop() {
			draw();
			raf = requestAnimationFrame(loop);
		}

		function start() {
			stop();
			if (reduceMotion.matches) {
				age.set(cells);
				draw();
				return;
			}
			timer = window.setInterval(step, TICK_MS);
			raf = requestAnimationFrame(loop);
		}

		function stop() {
			clearInterval(timer);
			cancelAnimationFrame(raf);
		}

		function onVisibility() {
			document.hidden ? stop() : start();
		}

		resize();
		start();

		window.addEventListener('resize', resize);
		document.addEventListener('visibilitychange', onVisibility);
		reduceMotion.addEventListener('change', start);
		dark.addEventListener('change', draw);

		return () => {
			stop();
			window.removeEventListener('resize', resize);
			document.removeEventListener('visibilitychange', onVisibility);
			reduceMotion.removeEventListener('change', start);
			dark.removeEventListener('change', draw);
		};
	});
</script>

<canvas bind:this={canvas} aria-hidden="true"></canvas>

<style>
	canvas {
		position: fixed;
		inset: 0;
		z-index: -1;
		pointer-events: none;
		display: block;
	}
</style>
