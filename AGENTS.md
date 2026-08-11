# Project: A Thesis on Restoring French Growth

You are one agent in a relay. An agent is invoked on this repo every few hours. Each run inherits the work of all previous runs and must leave the project better than it found it. This file is your operating manual. Read it fully before touching anything.

## Mission

Produce a thesis on how France can restore economic growth. The end product is a long-form essay for a blog, written in English, aimed at an educated generalist reader (think: reader of The Economist or the Draghi report, not a professional economist).

The bar is double and non-negotiable:

1. **Rigor of scientific literature.** Every factual claim traces to a verified fact in `facts.json`, with a primary source. Every argument survives its best counterargument. Every country comparison is challenged for comparability before it is used.
2. **Prose that reads like great writing, not like a report.** See the Writing Standard below.

## Constraint from the author

The thesis must be a **vision**, not a list of politically safe tweaks. The author's prior: little is feasible in France because the national mindset resists it — but if we limit ourselves to what is politically feasible today, the thesis is worthless. So: propose what would actually work. Note political feasibility honestly where relevant, but never use it as a filter. If the mindset is the binding constraint, say so and address it head-on; that hypothesis is itself a claim to be tested against evidence (surveys, revealed preferences, reform history).

## Files

| File | Role | Rule |
|---|---|---|
| `AGENTS.md` | This manual | Update only if the protocol itself improves. |
| `facts.json` | The evidence base: sources, facts, comparables, claims, open questions | Single source of truth for every number. The essay may not contain a number that is absent from this file. |
| `thesis.md` | The argumentative spine: the central thesis, its claims, their evidence, the counterarguments | Logic lives here. If `thesis.md` is incoherent, fixing it takes priority over everything else. |
| `article.md` | The copy itself — the essay the reader will see | Prose lives here. It is the narrative rendering of `thesis.md`, never a source of new claims. |
| `journal.md` | The logbook | Append one entry per run. Newest entry on top. |

Everything in the repo is in English.

## Evidence protocol

### Facts (`facts.json`)

Every fact has: a statement, value(s), year, geography, source reference, access date, `confidence` (high / medium / low), and `status`:

- `unverified` — recorded from memory or a secondary source; must be checked against a primary source before the essay may rely on it.
- `verified` — checked against a primary source during a run.
- `challenged` — a credible source contradicts it, or its interpretation is disputed. Record the dispute in `notes`. Resolve before use.
- `refuted` — wrong. Keep it in the file (with the refutation) so no future run re-adds it.

Source hierarchy, in order of preference: (a) primary statistical agencies — INSEE, Eurostat, OECD, IMF, World Bank, ECB, Banque de France; (b) peer-reviewed literature; (c) institutional reports — Cour des comptes, France Stratégie, CAE, Draghi/Letta reports; (d) identified think tanks, with their leaning noted. Press only for current events. Aggregator sites (Trading Economics, Wikipedia, etc.) are leads, never final sources.

Comparison rules: use PPP for cross-country income and productivity comparisons, never nominal exchange rates. Prefer the same year and the same dataset for both sides of any comparison. When two reputable sources disagree, record both and flag the fact `challenged`.

### Comparables

Country comparisons are the backbone of the argument and its biggest vulnerability. Every comparable in `facts.json` carries a `comparability` assessment and explicit caveats. A comparable may be used in the essay only after a run has genuinely tried to break it (size, openness, trust levels, currency regime, starting conditions, measurement artifacts). Ireland is pre-loaded as a rejected comparable to set the standard: its GDP is inflated by multinational accounting and misleads on living standards.

### Claims (`thesis.md` + mirrored in `facts.json`)

Each claim has an ID, links to supporting and contradicting facts, and a list of counterarguments with their current status (open / answered / conceded). A claim with an open counterargument may not be stated in the essay without acknowledging the counterargument.

## Writing standard

The essay follows these rules (distilled from the author's brief):

1. Simple beats brilliant. A good argument in five sentences sways more people than a brilliant one in a hundred.
2. Prune ruthlessly. "He was happy," never "he was very happy." Cut every word that adds nothing.
3. Short sentences. One thought per sentence.
4. Active voice, subject first. "The boy hit the ball," not "the ball was hit by the boy."
5. The first sentence must grab. Rewrite it a dozen times if needed.
6. Concrete beats abstract. Prefer a number, a name, or an image to a generality.
7. Rigor must be invisible. Sources support the text; they never clog it. Facts appear as footnote-style references `[F012]` in drafts; a later pass converts them to reader-friendly citations.

The essay is not a paper. No hedging boilerplate, no "it is important to note," no throat-clearing. But it must never purchase punchiness with imprecision: if a sharp sentence overstates the evidence, sharpen the evidence or soften the sentence.

## Per-run protocol

Each run does the following, in order:

1. **Read** `journal.md` (latest entries), `thesis.md`, and skim `facts.json` statuses. Do not re-derive what previous runs settled; challenge it only with new evidence.
2. **Attack the weakest point first.** Priority order: (a) facts the essay relies on that are `unverified` or `challenged`; (b) claims with open counterarguments; (c) comparables not yet stress-tested; (d) open questions blocking the thesis.
3. **Advance the work.** Coherence beats coverage: you may (and should) revise across the whole of `thesis.md` and `article.md` in one run if coherence requires it. Do not silo yourself to one section. Typical run output: several facts verified or added, at least one claim strengthened or killed, and a real improvement to the spine or the prose.
4. **Challenge before you add.** Killing a weak claim, downgrading a shaky fact, or rejecting a bad comparable is as valuable as adding new material. The author wants the argument challenged until it is unbreakable.
5. **Log it.** Append a journal entry: date, what was dug into, what changed and why, what was challenged (and survived or died), what the next run should attack first.
6. **Commit and push** with a descriptive message. Never leave the repo dirty.

## Definition of done

The thesis converges when all of the following hold:

1. Every fact the essay relies on is `verified` with high confidence.
2. Every claim has all counterarguments answered or the claim has been conceded and removed.
3. Every comparable used has survived a genuine attempt to break it.
4. The essay passes the writing standard end to end (a run dedicated to prose-only editing finds nothing substantive).
5. Two consecutive runs produce no substantive change.

After convergence, remaining runs may only polish prose and refresh data. A later phase will add an HTML rendering with charts; until then, note in `facts.json` which facts carry data series worth charting (`chartable: true`).
