<script lang="ts">
	import { site, topics, companies } from '$lib/data/site';
	import { categories, booksIn } from '$lib/data/books';
	import BookCard from '$lib/components/BookCard.svelte';

	const year = new Date().getFullYear();
</script>

<svelte:head>
	<title>{site.title}</title>
	<meta name="description" content={site.description} />
	<link rel="canonical" href={site.url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={site.title} />
	<meta property="og:description" content={site.description} />
	<meta property="og:url" content={site.url} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={site.title} />
	<meta name="twitter:description" content={site.description} />
</svelte:head>

<header class="top">
	<a class="brand" href="/">{site.name}</a>
	<nav aria-label="Sections">
		<a href="#about">About</a>
		<a href="#work">Work</a>
		<a href="#books">Books</a>
	</nav>
</header>

<main>
	<section id="about" class="hero">
		<p class="eyebrow">Hi, I'm Greg.</p>
		<h1>
			Product &amp; growth co-founder at
			<a href={site.links.fullenrich} target="_blank" rel="noopener noreferrer">FullEnrich</a>,
			the B2B contact enrichment platform.
		</h1>
		<p class="lede">
			I spend my days building a product, growing it, and figuring out how a company should run
			now that AI does a real share of the work. This page is a snapshot of what I care about and the
			books I keep pushing on people.
		</p>
		<p class="cta">
			<a href={site.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
			<span class="dot" aria-hidden="true">·</span>
			<a href={site.links.fullenrich} target="_blank" rel="noopener noreferrer">FullEnrich</a>
		</p>
	</section>

	<section id="topics" class="section">
		<h2>Things I think about a lot</h2>
		<ul class="topics">
			{#each topics as topic (topic.name)}
				<li class="topic">
					<h3>{topic.name}</h3>
					<p>{topic.blurb}</p>
				</li>
			{/each}
		</ul>
	</section>

	<section id="work" class="section">
		<h2>Companies I worked with</h2>
		<p class="section-lede">
			Before FullEnrich, as a product manager or product designer, at every stage from first
			prototype to exit.
		</p>
		<ul class="companies">
			{#each companies as company (company.name)}
				<li>
					<a href={company.url} target="_blank" rel="noopener noreferrer">{company.name}</a>
					<span class="note">{company.note}</span>
				</li>
			{/each}
		</ul>
	</section>

	<section id="books" class="section">
		<h2>Books I recommend to a lot of people</h2>
		<p class="section-lede">
			The short list I send when someone asks what to read about product, strategy, or working with
			people. Grouped by what they are good for.
		</p>

		<nav class="category-nav" aria-label="Book categories">
			{#each categories as category (category.id)}
				<a href={`#books-${category.id}`}>{category.name}</a>
			{/each}
		</nav>

		{#each categories as category (category.id)}
			<div class="category" id={`books-${category.id}`}>
				<div class="category-head">
					<span class="swatch" style="--hue: {category.hue}" aria-hidden="true"></span>
					<h3>{category.name}</h3>
					<p>{category.tagline}</p>
				</div>
				<ul class="books">
					{#each booksIn(category.id) as book (book.title)}
						<BookCard {book} hue={category.hue} />
					{/each}
				</ul>
			</div>
		{/each}
	</section>
</main>

<footer class="foot">
	<p>© {year} {site.name}</p>
	<p>
		<a href={site.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
	</p>
</footer>

<style>
	.top,
	main,
	.foot {
		width: min(var(--max-w), 100% - 2 * var(--gutter));
		margin-inline: auto;
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 28px 0;
		font-size: 15px;
	}

	.brand {
		font-weight: 700;
		text-decoration: none;
		letter-spacing: -0.01em;
	}

	nav {
		display: flex;
		gap: 20px;
	}

	nav a {
		text-decoration: none;
		color: var(--ink-soft);
	}

	nav a:hover {
		color: var(--ink);
	}

	.hero {
		padding: 56px 0 24px;
	}

	.eyebrow {
		font-size: 15px;
		font-weight: 600;
		color: var(--accent);
		margin-bottom: 14px;
	}

	h1 {
		font-size: clamp(30px, 5vw, 42px);
		max-width: 22ch;
	}

	h1 a {
		text-decoration-thickness: 2px;
	}

	.lede {
		margin-top: 22px;
		font-size: 19px;
		color: var(--ink-soft);
		max-width: 36em;
	}

	.cta {
		margin-top: 22px;
		font-size: 15px;
		font-weight: 600;
	}

	.dot {
		margin: 0 8px;
		color: var(--ink-muted);
	}

	.section {
		padding: 56px 0 8px;
	}

	h2 {
		font-size: 24px;
	}

	.section-lede {
		margin-top: 10px;
		color: var(--ink-soft);
		max-width: 38em;
	}

	.topics {
		margin-top: 22px;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 14px;
	}

	.topic {
		padding: 18px 18px 20px;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--bg-elevated);
	}

	.topic h3 {
		font-size: 16px;
	}

	.topic p {
		margin-top: 8px;
		font-size: 15px;
		line-height: 1.55;
		color: var(--ink-soft);
	}

	.companies {
		margin-top: 20px;
		border-top: 1px solid var(--line);
	}

	.companies li {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		padding: 13px 0;
		border-bottom: 1px solid var(--line);
	}

	.companies a {
		font-weight: 600;
		text-decoration: none;
	}

	.companies a:hover {
		color: var(--accent);
	}

	.companies .note {
		color: var(--ink-muted);
		font-size: 15px;
		text-align: right;
	}

	.category-nav {
		margin-top: 22px;
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.category-nav a {
		font-size: 13.5px;
		font-weight: 600;
		text-decoration: none;
		padding: 6px 12px;
		border-radius: 999px;
		border: 1px solid var(--line);
		background: var(--bg-elevated);
		color: var(--ink-soft);
	}

	.category-nav a:hover {
		border-color: var(--accent);
		color: var(--ink);
	}

	.category {
		padding-top: 44px;
		scroll-margin-top: 24px;
	}

	.category-head {
		display: grid;
		grid-template-columns: auto 1fr;
		column-gap: 10px;
		align-items: center;
	}

	.swatch {
		width: 10px;
		height: 10px;
		border-radius: 3px;
		background: hsl(var(--hue) 65% 52%);
	}

	.category-head h3 {
		font-size: 19px;
	}

	.category-head p {
		grid-column: 2;
		margin-top: 4px;
		font-size: 15px;
		color: var(--ink-muted);
	}

	.books {
		margin-top: 24px;
		display: grid;
		gap: 28px;
	}

	.foot {
		display: flex;
		justify-content: space-between;
		padding: 72px 0 40px;
		font-size: 14px;
		color: var(--ink-muted);
	}

	.foot a {
		text-decoration: none;
		color: var(--ink-soft);
	}

	@media (max-width: 560px) {
		.top {
			padding: 20px 0;
		}

		nav {
			gap: 14px;
		}

		.hero {
			padding-top: 36px;
		}

		.topics {
			grid-template-columns: 1fr;
		}

		.companies li {
			flex-direction: column;
			gap: 2px;
		}

		.companies .note {
			text-align: left;
		}
	}
</style>
