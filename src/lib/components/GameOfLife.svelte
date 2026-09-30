<script lang="ts">
	import { onMount } from 'svelte';
	import { initGameOfLifeBackground } from '$lib/game-of-life-background';

	let backgroundHost = $state<HTMLDivElement | undefined>(undefined);
	let destroyBackground: (() => void) | undefined;

	onMount(() => {
		if (!backgroundHost) return;

		let cancelled = false;
		initGameOfLifeBackground(backgroundHost)
			.then((destroy) => {
				if (cancelled) {
					destroy();
					return;
				}
				destroyBackground = destroy;
			})
			.catch(() => {
				// No WebGL or the CDN is unreachable: the band just stays white.
			});

		return () => {
			cancelled = true;
			destroyBackground?.();
			destroyBackground = undefined;
		};
	});
</script>

<!-- A short band at the top of the page, fading to white at both edges. -->
<div class="band" aria-hidden="true">
	<div bind:this={backgroundHost}></div>
</div>

<style>
	.band {
		position: relative;
		width: 100%;
		height: 260px;
		overflow: hidden;
	}

	@media (max-width: 560px) {
		.band {
			height: 200px;
		}
	}
</style>
