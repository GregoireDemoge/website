<script lang="ts">
	import { site, companies } from '$lib/data/site';
	import { categories, booksIn } from '$lib/data/books';
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

<main>
	<section>
		<p>Hi, I'm Greg.</p>
		<p>
			I'm the product &amp; growth co-founder at
			<a href={site.links.fullenrich} target="_blank" rel="noopener noreferrer">FullEnrich</a>, a
			B2B contact enrichment platform.
		</p>
		<p>
			Stuff I am into: AI, growth, data, finance, and how product teams are organized. Most of my
			time these days goes into AI, both building products with it and rethinking how a company
			runs with it.
		</p>
		<p>
			You can find me on
			<a href={site.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>.
		</p>
	</section>

	<section>
		<h2>Companies I worked with as a product manager or designer</h2>
		<ul>
			{#each companies as company (company.name)}
				<li>
					<a href={company.url} target="_blank" rel="noopener noreferrer">{company.name}</a>
					<span class="muted">– {company.note}</span>
				</li>
			{/each}
		</ul>
	</section>

	<section>
		<h2>Books I recommend to a lot of people</h2>
		<p class="muted">Grouped by what they are good for.</p>

		{#each categories as category (category.id)}
			<h3>{category.name}</h3>
			<ul class="books">
				{#each booksIn(category.id) as book (book.title)}
					<li class="book">
						<img
							src={`/covers/${book.cover}`}
							alt={`Cover of ${book.title}`}
							width="56"
							height="84"
							decoding="async"
						/>
						<div>
							<p>
								<strong>{book.title}</strong>
								<span class="muted">– {book.author}</span>
							</p>
							<p class="soft">{book.blurb}</p>
						</div>
					</li>
				{/each}
			</ul>
		{/each}
	</section>
</main>

<style>
	main {
		max-width: 640px;
		margin: 0 auto;
		padding: 8px 20px 96px;
	}

	h2 {
		font-size: 16px;
		font-weight: 700;
		margin-bottom: 12px;
	}

	h3 {
		font-size: 16px;
		font-weight: 600;
		color: var(--ink-soft);
		margin: 32px 0 14px;
	}

	section {
		margin-bottom: 56px;
	}

	section > p + p {
		margin-top: 14px;
	}

	li + li {
		margin-top: 6px;
	}

	.muted {
		color: var(--ink-muted);
	}

	.soft {
		color: var(--ink-soft);
	}

	.books .book {
		display: grid;
		grid-template-columns: 56px 1fr;
		gap: 16px;
		align-items: start;
	}

	.books .book + .book {
		margin-top: 22px;
	}

	.book img {
		display: block;
		width: 56px;
		height: 84px;
		object-fit: cover;
		border-radius: 2px;
		border: 1px solid var(--line);
		background: var(--line);
	}

	.book p + p {
		margin-top: 2px;
	}
</style>
