"""Anti-tell audit for article.md (see AGENTS.md, 'The anti-tell checklist').

Usage: python3 audit.py [file]
Reports banned patterns, rationed patterns, sentence-length violations (>32 words),
and rhythm statistics. Zero output under BANNED means the hard checks pass;
everything under RATIONED needs a judgment call logged in the journal.
"""

import re
import sys

PATH = sys.argv[1] if len(sys.argv) > 1 else "article.md"

BANNED_PATTERNS = [
    (r"\u2014", "em-dash"),
    (r"\bnot just\b|\bisn't just\b|\bnot only\b|\bno longer\b|\bless about\b", "antithesis scaffold"),
    (r"\bit'?s not (a |the |about )?\w+[,;] it'?s\b", "it's-not-X-it's-Y"),
    (r"\bdelve\b|\btapestry\b|\bintricate\b|\bpivotal\b|\bcrucial\b|\brobust\b|\bseamless\b",
     "stock vocab 1"),
    (r"\bleverage[sd]?\b|\bharness\b|\bunlock\b|\bshowcase\b|\bunderscore\b|\btestament\b",
     "stock vocab 2"),
    (r"\bmeticulous\b|\bboasts\b|\bvibrant\b|\bfoster\b|\bgarner\b|\bmultifaceted\b|\bcomprehensive\b",
     "stock vocab 3"),
    (r"\bnotably\b|\bmoreover\b|\bfurthermore\b|^Additionally\b", "stock connective"),
    # sentence-initial "In today's..." only; "in today's money/euros" is a specific use
    (r"(?m)(?:^|(?<=[.!?] ))In today's (?!money|euros|prices)", "hedge opener (In today's...)"),
    (r"\bIn an era of\b|\b[Ii]t is important to note\b|\b[Ii]t'?s worth noting\b", "hedge opener"),
    (r"\bUltimately\b|\bIn conclusion\b|\bOverall,", "hedge closer"),
    (r"\bplays? a (crucial|vital|key) role\b", "role-in-shaping"),
    (r"\bParis\b(?! AI| Agreement)", "Paris metonymy (check: city references are fine)"),
]

RATIONED_PATTERNS = [
    (r"\bsignificantly\b|\beffectively\b|\bincreasingly\b|\bdeeply\b|\btruly\b", "intensifier"),
    (r", not ", "X-not-Y contrast"),
    (r"\?", "question"),
]


def strip_markup(text: str) -> str:
    text = re.sub(r"<[^>]+>", " ", text)               # html tags
    text = re.sub(r"\[F\d{3}\??\]", "", text)          # fact tags
    text = re.sub(r"\[Q\d{2}\]|\[C\d+\]", "", text)    # question/claim tags
    text = re.sub(r"^#.*$", "", text, flags=re.M)      # headings
    text = re.sub(r"^Status:.*$", "", text, flags=re.M)
    return text


def sentences(text: str):
    # crude splitter: good enough for length policing (handles closing quotes after punctuation)
    for s in re.split(r"(?<=[.!?])[\"'\u201d\u2019]?\s+(?=[A-Z\u00c0-\u00dc*\"'\u201c])", text):
        s = s.strip()
        if s:
            yield s


def main():
    raw = open(PATH).read()
    # audit prose only: cut draft notes if present
    raw = raw.split("## Draft notes")[0]
    text = strip_markup(raw)

    print(f"=== BANNED (must be zero) — {PATH} ===")
    clean = True
    for pat, label in BANNED_PATTERNS:
        hits = [m.group(0) for m in re.finditer(pat, text, flags=re.I if "Paris" not in label else 0)]
        if hits:
            clean = False
            print(f"  {label}: {len(hits)} -> {hits[:8]}")
    if clean:
        print("  clean")

    print("=== RATIONED (audit each) ===")
    words_total = len(text.split())
    for pat, label in RATIONED_PATTERNS:
        n = len(re.findall(pat, text))
        print(f"  {label}: {n} (per 1000 words: {1000 * n / max(words_total, 1):.1f})")

    print("=== SENTENCE LENGTH (hard rule: none >32 words without journal justification) ===")
    lengths = []
    over = []
    for s in sentences(text):
        n = len(s.split())
        lengths.append(n)
        if n > 32:
            over.append((n, s))
    if lengths:
        print(f"  sentences: {len(lengths)}; avg length {sum(lengths) / len(lengths):.1f} words; max {max(lengths)}")
    for n, s in over:
        print(f"  [{n}w] {s[:140]}")
    if not over:
        print("  no sentence over 32 words")

    print(f"=== SIZE ===\n  ~{words_total} words of prose")


if __name__ == "__main__":
    main()
