<script lang="ts">
	import '../app.css';
	import GameOfLife from '$lib/components/GameOfLife.svelte';

	let { children } = $props();
</script>

<GameOfLife />

{@render children()}
