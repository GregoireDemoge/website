# The Thesis (working spine)

Status: **v1.2 — diagnosis settled; solution thesis modeled and revised; `article.md` still FROZEN.** Run 3 built the growth-accounting model (`model.py`), which cut the headline target to honest size (C13 v2), causally grounded the ownership lever (C12 supported), corrected the demographic claim (C5), and opened the missing pillars (demography, housing) as explicit gaps. No essay prose gets touched until Part II stabilizes — it is close.

Time horizon: **none imposed.** The author explicitly accepts a 20-30 year program. Feasibility is scored, never used as a filter; slow levers (education, capital accumulation) are first-class citizens precisely because the horizon allows them to compound.

All `[Fxxx]`, `[Cx]`, `[Qxx]` tags refer to `facts.json`.

## The central thesis (v1)

**France runs the developed world's largest transfer from the future to the present — and the machine that hid its cost has broken.**

France pays for today's comfort — the rich world's shortest working lives, retirees who live as well as workers [F018], the highest social spending on earth [F001][F005] — with tomorrow's resources: borrowed money [F002][F003], unworked hours [F008][F012], and an innovation engine idling at 2.2% of GDP for twenty-five years [F009]. Two anesthetics hid the cost of this trade: cheap credit and a productivity edge that let the French say "we work less, but better." Both are gone. Interest is now the fastest-growing item in the budget [F024][F025], and the productivity edge has reversed [F007]. So the trade will be renegotiated. That part is arithmetic, not opinion [C7]. The only open variable is who holds the pen: France, through a deliberate program that raises both hours worked and output per hour while reforming the welfare state to save it — or its creditors, who now hold more than half the debt [F028], through an imposed adjustment that will be faster, dumber and crueler than anything a French government would design. The deepest obstacle is not technical. The reforms are known and the assets are real — nuclear power [F017], a savings pool [F023], engineers, demographics better than Germany's or Italy's. The obstacle is that the French have spent fifty years learning to despise the system that pays for their model [F021] — so the national story about work, risk and wealth is the first reform, not the last [C4].

**Retired candidates** (kept for the record; all three were merged rather than killed): T-A "the chosen decline nobody chose" became the narrative frame; T-B "the mindset is the bottleneck" survives in softened, falsifiable form inside C4 (mindset caps reform scale and makes reforms reversible — it does not make them impossible, see F020); T-C "assets without an operating system" became the constructive program (Part II).

---

# Part II — The solution thesis (v1): the thirty-year program

The question this part answers: not "how does France avoid the wall" but **how does France become the growth powerhouse of Europe — the country that, by 2045-2050, has overtaken Germany in income per head and set the continent's pace.** The countdown (C7) supplies the *when-it-starts*; this part supplies the *what* and the *how much*.

## The target, stated so it can be missed (v2 — model-disciplined)

By 2045-2050 [C13]:

- Per-capita growth **roughly doubled**: from a ~0.8%/yr baseline to **1.3-1.6%/yr (central)**, 1.4-1.8%/yr (high) sustained across three decades — the fastest large economy in Europe throughout.
- **GDP per capita (PPP) overtakes Germany around 2040-2045** (central; sensitive to assumptions — see model), standing ~5-9% above by 2050.
- Debt ratio below 90% of GDP and falling; double-A recovered; R&D ≥ 3.5% of GDP; employment rate ≥ 75%; a national capital fund at 50-100% of GDP.

The precedent that this is possible inside the euro: Germany itself, 2005-2019 — "sick man of Europe" to dominant economy in fifteen years, with no currency of its own to devalue. Relative decades happen; France has simply been on the losing side of the last two.

**What the model killed (run 3, kept as a trophy of the method):** the original target of "2.3-2.6% GDP growth sustained for two decades" did not survive its own growth accounting. Once double-counting was forbidden — pensions have no GDP effect separate from the labor lever; labor gains net of composition; R&D and education capped jointly; level levers expiring on explicit windows — the honest central scenario is ~1.5-1.75% aggregate GDP at peak, ~2% only in the high scenario. The powerhouse claim survives in *relative* terms (nobody in big-Europe does better; Germany is overtaken) but not as an absolute miracle. The thesis is stronger for having cut its own headline number before a critic did.

## The model (v1) — `model.py`, reproducible

GDP per capita growth = productivity-per-hour growth + hours-per-capita growth. Levers enter as level effects phased over explicit windows. Parameters cite `facts.json`; assumptions are tagged A1-A10 in the script for future runs to attack.

| Scenario | 2027-2035 | 2036-2045 | 2046-2055 | Overtakes Germany | FR/DE per capita, 2050 |
|---|---|---|---|---|---|
| Low (levers at 50%) | 1.0%/yr | 1.2%/yr | 1.0%/yr | not by 2055 | 0.97 |
| **Central** | **1.3%/yr** | **1.6%/yr** | **1.3%/yr** | **2042** | **1.05** |
| High (full + AI bonus) | 1.4%/yr | 1.8%/yr | 1.4%/yr | 2040 | 1.09 |

Key calibrations: labor +5% level over 15y [F030][F031]; reallocation/simplification +2.5% level (one distortion cluster alone costs 3.4% of GDP [F039]); capital deepening +3% level over 20y [F016][F023]; R&D→TFP +4.5% level via the 0.13/0.17 OECD elasticities with a 50% absorption haircut [F037]; education +0.25pp/yr from 2039 (Hanushek-Woessmann halved [F034]); transition drag -0.25pp/yr during the consolidation years; France baseline 0.8%/yr per capita including the aging drag [F038]; Germany baseline 0.8%/yr; starting gap -10%.

**Two structural findings the essay must own:**

1. **Growth peaks in decade 2, then sags.** The big early levers (work, simplification) are *level* levers — they exhaust. Only innovation, education, and the demographic pillars sustain decade 3. The program is not a plateau; it is a relay race, and the baton passes around 2040 from "work more" to "know more."
2. **The demographic window is real and closing** [F038]: fertility at 1.45 (central assumption) means the labor lever's ceiling erodes after 2045 and the active population shrinks from 2040. Family policy and skilled immigration are not social policy in this thesis; they are growth policy — and they are currently missing [Q16].

Sensitivity honesty: the 2042 overtake assumes Germany at 0.8%/yr and a -10% starting gap. Germany at 1.0% and -13% pushes it toward 2050+. Pin both [Q18][Q02] and publish the grid.

## The five levers, quantified

### Lever 1 — Work: +3 to +7% of GDP, the bankable lever [C8]

The evidence is now government-grade. France works 673 hours per inhabitant per year; Germany 776, Sweden 748, EU average 750 [F031]. Aligning the employment rate on Germany's = +1.5M jobs and **+3.2% of GDP** net of part-time adjustment and lower marginal productivity — +7.0% unadjusted ceiling — plus **~EUR 38bn/year** of public revenue and ~EUR 20bn on the social balance [F030]. The gap concentrates entirely at the two ends of working life: youth entry and the 55-64 cohort [F030][F011].

Program content: effective retirement age converging to the German/Nordic norm via an automatic life-expectancy link placed outside annual politics (the single most effective lever per Rexecode [F031]); systemic points-based pension replacing the 42 regimes; senior-employment package (experience rating, training accounts that survive job changes); attack on the >70% effective marginal rates around the SMIC created by contribution-relief phase-outs [F015 note]; apprenticeship consolidation (the one recent success to protect [F020]).

Honest cost: the added workers are less productive than average — *already netted out* in the +3.2/+5% figures [F030][F031]. The real risk is political reversibility (2023 reform suspended 2025), which is why Lever 5 exists.

### Lever 2 — Capital: redirect EUR 6,590bn from lending the state to owning the economy [C9]

The pool exists: French households hold **EUR 6,590bn** of financial wealth — twice the public debt, 2.7 times the CAC 40 — and add ~EUR 130bn of net placements a year. Allocation: EUR 3,911bn in rate products vs 2,576bn in equity-type; only **EUR 310bn in directly-held listed shares**; EUR 947bn sleeps in livrets, EUR 1,571bn in euro-fund life insurance [F023]. The home bias is already there (58% France, 80% euro area) — redirection is plumbing, not patriotism [F023].

Program content: a **universal auto-enrollment capitalization layer** on top of the pay-as-you-go core — Sweden's premium pension and Australia's superannuation are the design comparables [Q13]. Even 3-4% of wages compounding 25-30 years builds a national fund of 50-100% of GDP: pension pre-funding, domestic equity base, and the ownership mechanism of Lever 5 in one instrument. Alongside: production taxes normalized from EUR 104bn (3.57% of GDP, 3x the peer median, ~6x Germany) toward the peer median — **~EUR 65-70bn/year returned to firms before profit** [F016] — financed by Lever 4, not by deficit.

Sequencing constraint (recorded as open counterargument): insurers currently hold ~10% of state debt [F023]; the state must not lose its captive buyer before fiscal stabilization is underway. Capital reversal follows or accompanies, never precedes, Lever 4.

### Lever 3 — Frontier: energy-intensive intelligence [C10]

France's defensible niche — the one no EU peer can copy this generation — is being **the only large economy in Europe with cheap, expandable, low-carbon baseload power at the moment AI demand is constrained by exactly that input**. The existing fleet [F017?] plus six EPR2 (EUR 72.8bn₂₀₂₀ ≈ 83bn₂₀₂₅, first unit 2038, state-backed financing) [F032]. The market has started voting: EUR 109bn of private AI-infrastructure commitments announced February 2025, >EUR 50bn of datacenter projects underway — already the largest AI build-out in Europe, explicitly anchored on nuclear [F033].

Program content: treat power-for-compute as industrial strategy (grid queues, land, price contracts); raise R&D from 2.18% toward 3.5% of GDP (+~EUR 35-40bn/year) with the increment concentrated on young firms rather than incumbent optimization [F009][Q05]; university autonomy and researcher pay to stop the brain drain; let the AI stack (compute → labs → applications) anchor on the energy advantage, with Mistral as existence proof [F033].

Honest costs, recorded: EPR2 is already +40% over its 2022 estimate before construction begins [F032] — the thesis carries nuclear delivery risk explicitly, with a risk budget, not with faith. And the "datacenters are low-margin hosting" objection is open [C10] — the answer must show where AI value pools land [Q14].

### Lever 4 — State: the pension machine is the war chest [C11]

Nothing else has the size. France spends ~14% of GDP on pensions, **4 points of GDP more than Germany ≈ EUR 115bn/year**; French retirees live as well as workers, with lower poverty [F018]. Recovering even a third of the gap over 15 years — retirement age (= Lever 1), indexation discipline, special-regime convergence — funds, simultaneously: debt stabilization (~EUR 25bn/year needed [F025]), the production-tax cut (~EUR 65-70bn [F016]), and the education/research investment of Levers 3 and 5. The Swedish precedent says a 20-point-of-GDP spending reduction over 15 years is survivable with the welfare state intact [X01 — still to verify].

This lever is the program's honesty test: any French growth plan that does not touch pensions is decoration. Refusing Lever 4 means refusing the program — and accepting the imposed version later (C7).

### Lever 5 — Ownership: the mindset is downstream of the balance sheet [C12]

The program's deepest bet, now causally grounded: **beliefs follow ownership, not lectures.** France's anti-capitalism is real (62% negative [F021]) but distributional — executives accept the system at 58%, workers reject it at 69% [F021]. And the mechanism is no longer speculative: randomly assigning people stock investments shifts their economic values durably toward markets, via familiarity and reduced distrust (field experiment, England [F035]); exogenously granting property titles moves squatters' beliefs 20% toward market values (Buenos Aires [F036]). Two methods, two asset classes, one direction. The auto-enrollment fund of Lever 2 puts a quarterly statement in every worker's pocket that makes "growth" mean *my money*. Remaining honest caveat: both studies are individual-scale; the national, decades-long extrapolation is an assumption stated openly.

**The bootstrap, resolved (the chicken-and-egg was the real objection).** The fund that creates owners seems to require the reform that owners' beliefs currently block. Answer: sequencing by political capital, in three stages. *Stage 1 (pre-crisis, administratively boring):* build on what the French already accept — France has Europe's largest employee-shareholding base and the PER retirement plan is growing fast; default enrollment, employer matches, and opt-out design need decrees, not revolutions [to verify: employee-shareholding numbers]. *Stage 2 (the crisis window [C7]):* the big pieces pass the way Sweden's did after 1991 — with the plan pre-written (Sweden's Lindbeck Commission is the model: 113 proposals ready when the money ran out [X01, verify]). *Stage 3 (the fund defends itself):* within a decade, tens of millions of visible accounts convert diffuse future winners into identifiable current winners — reversing the status-quo bias that kills reforms (Fernandez-Rodrik 1991, to source). The deep design principle: **the program is sequenced by political capital, not by economic logic — start with what builds constituencies, end with what spends them.**

**The wrapper: sovereignty, not enrichment.** Fifty years of selling reform as "what Brussels/markets/ratings demand" produced a nation that experiences its own survival as humiliation. But the same France that rejects "liberalization" built the nuclear fleet, the TGV, Airbus and Ariane — collective effort framed as national project. The program should be presented as what it factually is: a thirty-year plan for French power — energy-compute sovereignty (Lever 3), full employment of experience (Lever 1), a nation of owners (Levers 2/5), the school reconquest (education) — *dirigiste in form, liberal in content*. The mindset is not only an obstacle; it contains its own lever: the French trust the state [Algan-Cahuc distrust literature, to source]. Let the state pivot from insurer-of-the-present to investor-in-the-future, and the French model's own political grammar carries the reform. Guardrails recorded (the wrapper must not eat the content): arms-length fund governance [Q19 — France's own FRR was raided; document it], sunset clauses, published evaluations.

## Financing coherence (no magic money)

Sources over 15 years: pension-machine recovery (up to ~EUR 115bn/yr envelope, realistically a third) [F018] + labor-lever fiscal dividend (+EUR 38bn/yr at maturity) [F030] + credibility dividend on interest (every 100bp saved on EUR 3.3tn ≈ EUR 33bn/yr, phased with refinancing) [F029]. Uses: debt stabilization (EUR 25bn/yr) [F025] + production-tax normalization (EUR 65-70bn/yr) [F016] + R&D/education increment (EUR 35-40bn/yr) [F009]. The arithmetic closes only if Lever 4 delivers — hence its position as the keystone. Full model in [Q12].

## Sequencing: three decades

- **Decade 1 (start → +10y): the turn.** Fiscal stabilization + pension redesign + labor levers (fastest GDP payback [F030]) + capitalization layer opens + production-tax cut phased + EPR2 construction + education reform starts (slowest lever, started first [F034]). The hardest decade politically — likely triggered by the countdown (C7), as Sweden 1991 [X01].
- **Decade 2 (+10 → +20y): the harvest begins.** EPR2 units come online (2038+) [F032]; reformed-school cohorts enter work [F034]; the capital fund passes ~30-40% of GDP and domestic equity deepens; R&D at 3%+ starts paying TFP; debt below 100% and falling; rating recovered.
- **Decade 3 (+20 → +30y): compounding dominance.** All levers mature simultaneously; France's relative gain vs the euro area compounds past +25-30%; overtake point vs Germany per capita [C13]; the capitalization fund reaches 50-100% of GDP and partially pre-funds pensions, closing the loop that started the crisis.

## Known gaps (deliberate, queued — not hidden)

- **Demography as policy** [Q16]: family policy and skilled immigration are absent from the five levers, yet the model shows decade 3 sags without them [F038]. This is the program's next pillar to build or explicitly reject.
- **Housing and mobility** [Q17]: housing costs constrain labor mobility, family formation, and disposable income; no lever addresses them yet.
- **The EU layer**: capital-markets union, single-market deepening — deliberately out of scope (France-first thesis) but the essay must say why.
- **The left's counter-program, steelmanned**: "keep the hours, tax wealth instead" deserves a full engagement (wealth-tax yields, Zucman debate) rather than a strawman — future run.
- **Gerontocracy** (recorded as counterargument on C11): by 2035 the median voter is near 55; the program's losers may hold the majority. Partial answers exist (grandfathering, ownership as compensating asset, crisis dynamics) but this deserves its own section — it is the darkest objection to the whole thesis.

## What would falsify the solution thesis

- ~~The growth-accounting model shows the honest stack yields far less than claimed~~ → **it did** (run 3): C13 was cut from 2.3-2.6% to ~1.5-2.0% aggregate and rewritten. The remaining falsifier: if pinning the comparison parameters [Q18] pushes the overtake past 2055 even in the high scenario, the "powerhouse" frame dies and the thesis retreats to "escape the wall."
- ~~Ownership-attitude evidence comes back weak~~ → it came back strong at the mechanism level [F035][F036]; the remaining falsifier is scale: if macro-historical cases (right-to-buy, Sweden PPM) show individual effects wash out nationally, C12 downgrades.
- EPR2 slips the way Flamanville did (years, not months) → Lever 3's window closes; the AI-energy niche gets taken by US/Gulf compute.
- A neutral decomposition shows the pension envelope [F018] is smaller than it looks after netting taxes on pensions [Q07] → the financing coherence breaks and the program must shrink.
- Fertility stays on the low branch (1.2) of INSEE's projections [F038] → the labor lever's ceiling shrinks materially after 2045; the program needs the Q16 pillar to compensate or the target recedes.

---

## The question

France was about as rich as America, per person, within living memory. The gap is now roughly 30% and widening [F006]. Growth has slowed to a potential of about 1% a year [F013], debt is at 115% of GDP and rising [F002], and the state already taxes and spends more than almost any country ever has in peacetime [F001][F004]. The question: **what would it actually take — not what is comfortable, not what is poll-tested — for France to grow again?**

## The hook (under test): the countdown [C7]

The essay opens with a prediction, not a lament: on current settings, France runs out of road — the argument is that a forced fiscal adjustment is coming within a foreseeable window, that the economy has specific, named problems that make growing out of it impossible on current policy, and that neither the French public nor its government is prepared to do what avoiding it requires.

The load-bearing arithmetic is the debt-vs-growth contrast [F027]: France's debt now grows faster than the GDP it buys (2024 sketch: ~EUR 170bn borrowed for ~EUR 95bn of nominal GDP growth — 0.55 euro of GDP per euro of debt). Read in reverse, the same arithmetic is the trap: merely stabilizing the debt ratio means removing a fiscal impulse of several points of GDP, which on standard multipliers absorbs all measured growth for years [Q09]. That is why no government volunteers, and why the adjustment, when it comes, will be either chosen through higher growth or imposed through austerity. The trajectory is already priced: interest is the fastest-growing budget item (EUR 64.8bn 2026 → 74.2bn 2027 → ~124bn 2030 on unchanged policy) [F024][F025], the double-A rating is gone [F026], and unchanged policy points to debt peaking above 130% of GDP [F025].

**Honesty constraint on the hook.** "Default in X years" must be earned, not asserted. Either the window is derived from explicit debt dynamics — refinancing wall, r−g, primary balance, who holds the debt [Q10][Q11] — with assumptions the reader can check, or the framing retreats to "forced adjustment, with the choice window closing." An outright default is the tail case for an ECB-backstopped sovereign; the modal bad scenario is a Greek-style imposed program. The hook must survive the "economists have cried wolf on French debt for 30 years" objection or be reframed. Note also that F027 is an accounting contrast, not a causal multiplier — the essay must not oversell it.

## Claim tree (mirror of `facts.json` claims)

| ID | Claim | Status | Weakest point right now |
|---|---|---|---|
| C1 | The gap is hours per capita AND, increasingly, productivity; one lever cannot close it | supported | "Leisure is a legitimate preference" counterargument still open |
| C2 | Not a revenue problem: a spending-composition and efficiency problem (pensions = 2/3 of the gap with peers) | supported | Needs net social expenditure check [Q07] |
| C3 | France is in the middle-technology trap; innovation regime change required | supported | The CIR puzzle unexplained [Q05] |
| C4 | The mindset caps reform scale and makes reforms reversible (softened, falsifiable form) | hypothesis | Descriptive half verified [F021]; causal half still open — attitudes may be symptom, not constraint [F020] |
| C5 | Turnaround is plausible: France's latent assets are real and rare — but the demographic one is expiring [F038] | hypothesis | "Latent assets that stay latent are not assets" — needs activation mechanism; demographic claim corrected run 3 |
| C6 | Low labor input is policy-induced, hence reversible — not pure cultural preference | hypothesis | Germany's wedge is HIGHER than France's [F015] — claim restated around effective incentives at the margins of working life (retirement rules, entry age, marginal wedges near the SMIC), not the headline wedge |
| C7 | Debt-financed growth has hit its arithmetic limit; a forced adjustment is coming — chosen or imposed | supported | "Crying wolf" objection managed via reframed hook (markers, not a naked date); Japan objection answered [F028]; rates eased in 2025 [F029] — keep honest |
| C8 | SOLUTION Work: +3-7% GDP from German/Nordic labor quantity; retirement age = biggest lever | supported | Political reversibility (2023 reform suspended) — answered only via C12 |
| C9 | SOLUTION Capital: redirect the EUR 6.6tn savings pool via auto-enrollment capitalization + production-tax normalization | supported | Sequencing: state must not lose its captive debt buyer before stabilization; scheme design [Q13] |
| C10 | SOLUTION Frontier: energy-intensive intelligence (nuclear + AI + R&D to 3.5%) | hypothesis | EPR2 delivery risk (+40% pre-construction [F032]); "hosting is low-margin" objection open [Q14] |
| C11 | SOLUTION State: the pension machine (4pp GDP vs Germany) is the war chest that funds everything else | supported | "Pension cuts are recessionary" open; political holdability rests on C12 + C7 |
| C12 | SOLUTION Mindset: beliefs follow ownership — universal capital ownership is the engine of political durability | supported | Causal mechanism established [F035][F036]; national-scale extrapolation stated as assumption; bootstrap resolved via sequencing |
| C13 | TARGET (v2): per-capita growth doubled (1.3-1.6% central), overtake Germany ~2040-2045, fastest large economy in Europe | supported | Overtake date sensitive to Germany baseline and starting gap [Q18]; decade-3 sag without the Q16 pillar |

## Counterarguments the thesis must beat (master list)

1. **The happiness defense.** France trades income for life quality; GDP misses it. — Answer must concede what is true (health outcomes, life expectancy) and then show the trade is debt-financed [F002][F003] and demographically doomed on current settings.
2. **The Germany objection.** Germans work even fewer hours per worker than the French and are richer [F008]. — Answer via employment rates and hours per capita [F011][F012]. If this fails, C1 needs rework.
3. **The reform-fatalism objection.** "France cannot reform" is contradicted by 2015-2023: unemployment fell three points [F020], FDI leads Europe [F019]. — The essay must metabolize this honestly; it strengthens C6 (policy works) but wounds C4 (mindset as binding constraint).
4. **The Draghi objection.** The productivity problem is European, not French [F010]; France cannot fix the EU alone. — Answer: decompose what is EU-level (scale, capital markets) vs France-level (hours, spending mix, tax wedge, R&D intensity below even the EU trend line [F009]).
5. **The austerity objection.** Cutting spending into a slow economy kills growth. — Answer via composition (WHAT is cut/reformed matters more than how much) and the Swedish sequencing [X01].
6. **The inequality objection.** The US model buys growth with inequality France rightly refuses. — Answer: the relevant models are Sweden, Denmark, Netherlands, Switzerland [X01][X03][X04], not the US; the US is the measuring stick, not the destination [X07].
7. **The ECB-backstop objection.** France cannot default; the ECB will always stand behind it, and 80bp spreads [F026] prove markets agree. — Answer: TPI is conditional on fiscal compliance — the backstop protects countries doing the adjustment, it does not remove it. Greece shows what "imposed" looks like inside the euro.
8. **The Japan objection.** Japan lives with 250% debt/GDP; 115% is nowhere near a cliff. — ANSWERED: Japan borrows in its own currency from its own savers; France cannot print euros and 54.6% of its debt is held abroad [F028].
9. **The crying-wolf objection.** French debt doom has been predicted for 30 years and never arrived. — The hardest one for the hook [C7]. Answer must show what changed: r−g flipping, the refinancing wall, interest as the fastest-growing budget line [F024][F025], the lost double-A [F026]. If the window cannot be derived honestly [Q10], reframe the hook.

## What would falsify the thesis (kept honest)

- Evidence that the France-US gap is mostly a measurement artifact (PPP vintage issues [Q02]) → would gut the urgency framing.
- A credible path where r−g stays favorable and the debt ratio stabilizes without adjustment (e.g. durable inflation surprise, growth surprise) [Q10] → would kill the countdown framing of C7.
- Evidence that the post-2019 productivity slide is transitory composition effects [Q01] → would soften C1's productivity half.
- Recent survey data showing French attitudes converged with Germany's [Q04] → would kill C4 as framed.
- Net-social-expenditure analysis showing the spending gap vs peers mostly disappears [Q07] → would force C2 to retreat to pure efficiency/deficit grounds.

## Structure of the essay (as drafted in `article.md` v0.1)

0. The prediction (hook) [C7] — reframed honestly: a forced renegotiation with public markers, not a naked default date. The debt-buys-less-growth arithmetic [F027] carries the opening.
1. How France got poorer without noticing — the two gaps [C1][F006][F007].
2. The usual suspects are innocent — not under-taxation, not austerity, not only Europe, not the French themselves [C2][F001-F005][F019][F020].
3. The trade nobody named — pensions as the heart of the transfer machine [F018][F005]; the two anesthetics (cheap credit, productivity edge) now gone.
4. What France believes — C4 in its softened form: the mindset caps the dose and voids the warranty (2023 pension reform suspended 2025); the savings-to-deficit loop [F021][F023].
5. The hand France holds [C5] — nuclear, savings, talent, FDI.
6. The program: five reversals — work (hours per capita), risk (savings to equity, Swedish-style capitalization layer), frontier (R&D + nuclear-powered AI strategy), state (composition not austerity, Danish flexicurity), story (name the trade; ownership as mindset lever) [C6][X01][X03].
7. Why anything would change — Sweden's crisis-forced precedent, France's own 2015-2023 proof, the countdown markers; close on the pen.
