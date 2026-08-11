"""
Growth-accounting model for the solution thesis (Q12), v1.
Pure Python, no dependencies. Run:  python3 model.py
Regenerates the scenario table printed in thesis.md Part II.

Method: GDP per capita growth = productivity-per-hour growth + hours-per-capita growth.
Levers enter as LEVEL effects phased over explicit windows (converted to annual
growth contributions), or as flow contributions with start/end years.
Double-counting rules:
  - The pension lever (C11) has NO growth effect of its own here: its GDP effect
    IS the labor lever (L1); its role is fiscal (financing).
  - Labor gains are net of the lower productivity of marginal workers (F030/F031).
  - L4 (R&D) and L5 (education) are capped jointly (skills->TFP overlap).
Every parameter cites its anchor in facts.json. Assumptions marked (A#) are
modeling choices to be attacked by future runs.
"""

HORIZON = list(range(2027, 2056))  # 29 years

# ----------------------------------------------------------------------------
# Baselines (per-capita growth, %/yr)
# ----------------------------------------------------------------------------
# A1: France trend productivity/hour ~0.9 (recent trend 0.8-1.0; F013/F014 context)
# A2: hours/capita drag from aging: 20-64 share 55.3%(2026)->54.0%(2050), INSEE
#     central [F038] => ~ -0.10 pp/yr; no policy drift assumed post-suspension.
FR_BASE_PRODHOUR = 0.9
FR_BASE_HOURS = -0.10
# A3: Germany per-capita baseline. Recent-trend view ~0.8; EC 2024 Ageing Report
#     baseline is more optimistic (potential 1.4 -> 1.0 over horizon, assumes TFP
#     recovery the report itself flags as risky) [F041]. Run both: 0.8 central,
#     1.1 as sensitivity. Exact per-capita path still to pin [Q18].
DE_BASE = 0.8
DE_BASE_HIGH = 1.1

def phased(level_gain_pct, start, end):
    """A level gain (% of GDP) linearly realized between start and end years,
    expressed as annual growth contribution inside the window."""
    def contrib(year, scale=1.0):
        if start <= year < end:
            return scale * level_gain_pct / (end - start)
        return 0.0
    return contrib

# ----------------------------------------------------------------------------
# Levers (central calibration; 'scale' shrinks/expands per scenario)
# ----------------------------------------------------------------------------
LEVERS = {
    # L1 Work: +5% GDP level (Germany/Sweden alignment net of composition,
    # F030 +3.2% / F031 up to +5%; central 5) phased 2027-2042.
    "L1_work": phased(5.0, 2027, 2042),
    # L2 Reallocation/simplification: GLVR 3.4% GDP for the 50-employee cluster
    # alone [F039]; broader agenda, conservatively +2.5% level, 2029-2042 (A4).
    "L2_realloc": phased(2.5, 2029, 2042),
    # L3 Capital deepening: productive I/Y +1.5pp (production-tax cut F016 +
    # savings redirection F023) => Solow level ~ +3% with alpha=1/3, 2029-2049 (A5).
    "L3_capital": phased(3.0, 2029, 2049),
    # L4 R&D->TFP: BERD 1.5->2.4% GDP => ln(1.6)*0.13 ~ +6.1% MFP long run
    # [F037]; public R&D adds; 50% absorption haircut (A6) => +4.5% level 2032-2055.
    "L4_rnd": phased(4.5, 2032, 2055),
    # L5 Education: +25 PISA over 15y => +0.5pp long-run growth (Hanushek-
    # Woessmann [F034], contested); 50% haircut, cohort lag: flow +0.25pp/yr
    # from 2039 (A7).
    "L5_edu": lambda year, scale=1.0: scale * 0.25 if year >= 2039 else 0.0,
}
# A7b: joint cap on L4+L5 in any year (skills/TFP overlap): 0.45 pp/yr central.
TFP_EDU_CAP = 0.45
# L6 AI/energy bonus (C10): 0 central; +0.20 pp/yr 2032-2050 in HIGH only (A8).
def l6_ai(year, scale):
    return scale * 0.20 if 2032 <= year < 2050 else 0.0
# A9: transition drag on ACTUAL growth: consolidation ~0.7% GDP/yr effort for
# 6 years, multiplier 0.7, half offset by rate/confidence effects [F029 easing].
def drag(year, scale=1.0):
    return -scale * 0.25 if year < 2033 else 0.0

SCENARIOS = {
    # scale applied to all levers; ai=1 activates L6; drag scale; Germany baseline
    "Low (levers at 50%)":        dict(scale=0.5, ai=0.0, dragscale=1.0, de=DE_BASE),
    "Central":                    dict(scale=1.0, ai=0.0, dragscale=1.0, de=DE_BASE),
    "Central, Germany at 1.1":    dict(scale=1.0, ai=0.0, dragscale=1.0, de=DE_BASE_HIGH),
    "High (full + AI bonus)":     dict(scale=1.0, ai=1.0, dragscale=0.8, de=DE_BASE),
}

def run(scenario):
    p = SCENARIOS[scenario]
    # France starts ~10% below Germany per capita (PPP) - A10, range 8-13%,
    # to be pinned by Q02/Q18.
    fr_level, de_level = 90.0, 100.0
    rows = []
    for y in HORIZON:
        tfp_edu = min(LEVERS["L4_rnd"](y, p["scale"]) + LEVERS["L5_edu"](y, p["scale"]), TFP_EDU_CAP)
        g_fr = (FR_BASE_PRODHOUR + FR_BASE_HOURS
                + LEVERS["L1_work"](y, p["scale"])
                + LEVERS["L2_realloc"](y, p["scale"])
                + LEVERS["L3_capital"](y, p["scale"])
                + tfp_edu
                + l6_ai(y, p["ai"])
                + drag(y, p["dragscale"]))
        g_de = p["de"]
        fr_level *= (1 + g_fr / 100)
        de_level *= (1 + g_de / 100)
        rows.append((y, g_fr, g_de, fr_level, de_level))
    return rows

def decade_avg(rows, y0, y1):
    g = [r[1] for r in rows if y0 <= r[0] <= y1]
    return sum(g) / len(g)

if __name__ == "__main__":
    print("| Scenario | 2027-2035 | 2036-2045 | 2046-2055 | FR=DE year | FR/DE 2050 |")
    print("|---|---|---|---|---|---|")
    for name in SCENARIOS:
        rows = run(name)
        overtake = next((r[0] for r in rows if r[3] >= r[4]), None)
        ratio_2050 = next(r[3] / r[4] for r in rows if r[0] == 2050)
        print(f"| {name} | {decade_avg(rows,2027,2035):.1f}%/yr | "
              f"{decade_avg(rows,2036,2045):.1f}%/yr | {decade_avg(rows,2046,2055):.1f}%/yr | "
              f"{overtake or 'not by 2055'} | {ratio_2050:.2f} |")
    print()
    print("Reading: per-capita growth France (program) vs Germany baseline 0.8%/yr;")
    print("France starts at 90 (Germany=100). Aggregate GDP growth = per-capita + population")
    print("(+0.15%/yr to 2037, ~0 after; INSEE central [F038]).")
