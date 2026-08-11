# Journal

One entry per run, newest on top. Each entry: date, what was dug into, what changed, what was challenged (and survived or died), and what the next run should attack first.

---

## Run 0 — 2026-08-11 — Bootstrap

**What was done.** Created the project scaffolding: `AGENTS.md` (operating manual), `facts.json` (evidence base, 23 facts / 9 sources / 9 comparables / 6 claims / 8 open questions), `thesis.md` (spine with three candidate theses), `article.md` (title and voice tests only, prose deliberately deferred), this journal.

**Key findings from initial research (all sourced in `facts.json`):**

- The pivotal diagnostic fact is the Banque de France decomposition [F007]: France's income gap with the US is mostly fewer hours worked per capita, **but** the hourly-productivity gap — zero in 2000 — now explains more than a third of it and is growing. France used to be able to say "we work less but better." The second half is no longer true. This kills any one-lever thesis ("just work more" or "just innovate").
- France's fiscal position gives the essay its urgency: 57-58% of GDP spent, 43%+ taxed, and still a 5%+ deficit with debt at 115.6% and rising [F001-F004]. The spending gap with euro-area peers is two-thirds social protection, mostly pensions [F005].
- French R&D intensity has been flat for 25 years at ~2.2% of GDP while Germany went to 3.1% and Korea to 5% [F009]. Fits Draghi's "middle technology trap" [F010].

**What was challenged already:**

- **Nominal France-US comparisons** (1.85x gap) are misleading; PPP is mandatory (1.36x). Encoded as a hard rule in `AGENTS.md`.
- **The headline gap number itself is disputed:** Banque de France says 33% (2023), World Bank current-PPP implies ~26% (2024). F006 is flagged `challenged` until reconciled on one dataset [Q02]. The direction (widening) is not in dispute.
- **Ireland** pre-loaded as a REJECTED comparable (multinational accounting inflates GDP ~40% above GNI*) to set the comparability bar.
- **The author's own prior** ("the French mindset makes reform impossible") is encoded as claim C4 but marked `hypothesis` with real counter-evidence attached: unemployment fell three points after the 2015-2023 reforms [F020] and France leads Europe in FDI projects [F019]. C4's supporting survey data is stale (2005). It gets the hardest scrutiny of any claim [Q04].

**Open state.** 13 of 23 facts are `unverified` (recorded with sources to check, flagged BACKLOG). No central thesis chosen yet — three candidates (T-A chosen decline / T-B mindset / T-C assets without an OS) with a current lean toward T-A as frame.

**Next run should attack, in order:**

1. [Q02] Reconcile the France-US gap number on one dataset (OECD preferred). Quick win, unblocks the hook.
2. [Q03] Build the decomposition table: how much of the gap closes if France matched German employment rates? US hours? This table could anchor the entire essay.
3. Verify the highest-value unverified facts: F011 (senior employment), F012 (hours per capita), F015 (tax wedge), F018 (pension spending).
4. [Q04] Find RECENT survey evidence on French attitudes to markets/risk/work — C4 lives or dies on this, and the whole framing of the essay depends on whether C4 survives.
