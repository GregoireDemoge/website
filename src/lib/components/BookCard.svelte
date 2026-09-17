<script lang="ts">
	import type { Book } from '$lib/data/books';

	let { book, hue }: { book: Book; hue: number } = $props();

	// Deterministic little variation per title so covers in the same
	// category do not look identical.
	const seed = $derived([...book.title].reduce((acc, c) => acc + c.charCodeAt(0), 0));
	const tilt = $derived((seed % 3) - 1); // -1, 0, 1
	const bandY = $derived(55 + (seed % 25)); // 55..79 (%)
</script>

<li class="book">
	<div
		class="cover"
		style="--hue: {hue}; --band-y: {bandY}%; --tilt: {tilt}deg"
		aria-hidden="true"
	>
		{#if book.cover}
			<img src={book.cover} alt="" loading="lazy" />
		{:else}
			<div class="spine"></div>
			<div class="cover-text">
				<span class="cover-title">{book.title}</span>
				<span class="cover-author">{book.author}</span>
			</div>
		{/if}
	</div>
	<div class="meta">
		<h3 class="title">
			{#if book.url}
				<a href={book.url} target="_blank" rel="noopener noreferrer">{book.title}</a>
			{:else}
				{book.title}
			{/if}
		</h3>
		<p class="author">{book.author}</p>
		<p class="blurb">{book.blurb}</p>
	</div>
</li>

<style>
	.book {
		display: grid;
		grid-template-columns: 84px 1fr;
		gap: 18px;
		align-items: start;
	}

	.cover {
		position: relative;
		aspect-ratio: 2 / 3;
		width: 84px;
		border-radius: 3px 8px 8px 3px;
		overflow: hidden;
		background:
			linear-gradient(
				160deg,
				hsl(var(--hue) 70% 62%) 0%,
				hsl(var(--hue) 62% 48%) 60%,
				hsl(var(--hue) 55% 38%) 100%
			);
		box-shadow:
			0 1px 2px rgb(0 0 0 / 0.12),
			0 8px 18px -8px rgb(0 0 0 / 0.35),
			inset 3px 0 0 rgb(255 255 255 / 0.18);
		transform: rotate(var(--tilt));
		transition: transform 180ms ease, box-shadow 180ms ease;
	}

	.book:hover .cover {
		transform: rotate(0deg) translateY(-2px);
		box-shadow:
			0 2px 3px rgb(0 0 0 / 0.12),
			0 14px 24px -10px rgb(0 0 0 / 0.4),
			inset 3px 0 0 rgb(255 255 255 / 0.18);
	}

	.cover img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.spine {
		position: absolute;
		inset: 0 auto 0 0;
		width: 6px;
		background: rgb(0 0 0 / 0.18);
	}

	.cover::after {
		content: '';
		position: absolute;
		left: 6px;
		right: 0;
		top: var(--band-y);
		height: 6px;
		background: rgb(255 255 255 / 0.55);
		mix-blend-mode: soft-light;
	}

	.cover-text {
		position: absolute;
		inset: 10px 8px 10px 12px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		color: #fff;
		text-shadow: 0 1px 1px rgb(0 0 0 / 0.2);
	}

	.cover-title {
		font-size: 10.5px;
		font-weight: 800;
		line-height: 1.15;
		letter-spacing: -0.01em;
	}

	.cover-author {
		font-size: 7.5px;
		font-weight: 600;
		line-height: 1.2;
		opacity: 0.85;
	}

	.meta {
		padding-top: 2px;
	}

	.title {
		font-size: 17px;
		font-weight: 700;
		letter-spacing: -0.01em;
	}

	.title a {
		text-decoration: none;
	}

	.title a:hover {
		color: var(--accent);
	}

	.author {
		margin-top: 2px;
		font-size: 14px;
		color: var(--ink-muted);
	}

	.blurb {
		margin-top: 8px;
		font-size: 15px;
		line-height: 1.55;
		color: var(--ink-soft);
	}

	@media (max-width: 480px) {
		.book {
			grid-template-columns: 68px 1fr;
			gap: 14px;
		}

		.cover {
			width: 68px;
		}

		.cover-title {
			font-size: 9px;
		}

		.cover-author {
			font-size: 6.5px;
		}
	}
</style>
