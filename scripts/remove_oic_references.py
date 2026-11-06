#!/usr/bin/env python3
"""Remove expandable original-OIC source/reference blocks from lesson HTML only."""
import argparse
import csv
import re
from pathlib import Path

PATTERN = re.compile(
    r'<details\s+class=["\']source["\'][^>]*>[\s\S]*?</details>\s*',
    re.IGNORECASE,
)
LESSON = re.compile(r"week-\d{2}-lesson-\d{2}\.html$", re.I)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--root", default="OIC_ESL")
    ap.add_argument("--apply", action="store_true", help="Actually edit files (default: audit only)")
    ap.add_argument("--report", default="reference-removal-report.csv")
    args = ap.parse_args()
    root = Path(args.root)
    if not root.is_dir():
        raise SystemExit(f"Missing folder: {root}")
    rows = []
    for file in sorted(root.rglob("*.html")):
        if not LESSON.fullmatch(file.name):
            continue
        text = file.read_text(encoding="utf-8")
        matches = list(PATTERN.finditer(text))
        rows.append((str(file), len(matches), "modified" if args.apply and matches else "unchanged"))
        if args.apply and matches:
            updated = PATTERN.sub("", text)
            file.write_text(updated, encoding="utf-8")
    with open(args.report, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["file", "reference_blocks", "status"])
        w.writerows(rows)
    print(f"Lesson files: {len(rows)}; blocks found: {sum(r[1] for r in rows)}; "
          f"files affected: {sum(bool(r[1]) for r in rows)}; mode: {'APPLY' if args.apply else 'DRY RUN'}")
    print(f"Report: {args.report}")

if __name__ == "__main__":
    main()
