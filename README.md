# gregoiredemoge.com

Personal website of Grégoire Démogé, built with SvelteKit (Svelte 5) and deployed on Vercel.

```sh
npm install
npm run dev      # local dev server
npm run build    # production build (adapter-vercel)
npm run check    # type-check
```

Content lives in `src/lib/data/`: `site.ts` (bio, topics, companies, links) and `books.ts` (book list and categories). Book covers are static images in `static/covers/`, referenced by file name from `books.ts`.

Deploy: import the repo in Vercel, framework preset SvelteKit, no extra config.

---

# A Thesis on Restoring French Growth

A long-form, evidence-based essay on how France can grow again — written in English for an educated generalist reader, built iteratively by agents invoked on this repo every few hours.

| File | What it is |
|---|---|
| [`AGENTS.md`](AGENTS.md) | The operating manual every agent run follows |
| [`facts.json`](facts.json) | The evidence base: sources, facts, comparables, claims, open questions |
| [`thesis.md`](thesis.md) | The argumentative spine |
| [`article.md`](article.md) | The essay itself (the copy) |
| [`journal.md`](journal.md) | The logbook: one entry per run, newest first |

The standard: the rigor of scientific literature, the readability of great business writing, and an argument challenged until it is unbreakable.
