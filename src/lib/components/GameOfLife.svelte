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
				// No WebGL or the CDN is unreachable: the page just stays white.
			});

		return () => {
			cancelled = true;
			destroyBackground?.();
			destroyBackground = undefined;
		};
	});
</script>

<!--
	Fixed, full-viewport host. 100lvh so mobile browser chrome showing or
	hiding does not resize (and reseed) the grid on every scroll.
-->
<div class="host" aria-hidden="true">
	<div bind:this={backgroundHost}></div>
</div>

<style>
	.host {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		height: 100lvh;
		z-index: -1;
		overflow: hidden;
	}
</style>
