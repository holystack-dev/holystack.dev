#!/usr/bin/env python3
"""Copy existing Metanoia product captures unchanged. Never launches the app."""
import argparse
import hashlib
import json
from pathlib import Path
import re
import shutil

SITE = Path(__file__).resolve().parents[1]
CAPTURES = [
    '00_lock.png', '01_home.png', '02_journal.png', '03_examine_list.png',
    '04_examine_guided.png', '05_confess.png', '06_penance.png', '07_guide.png',
    '08_prayers.png', '09_confession_mode.png', '10_examen_scripture.png',
    '11_security.png', '12_journal_dark.png',
]


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, default=SITE.parent / 'metanoia')
    parser.add_argument('--date', default='2026-09-27', help='Website import date, YYYY-MM-DD')
    args = parser.parse_args()
    if not re.fullmatch(r'\d{4}-\d{2}-\d{2}', args.date):
        parser.error('--date must be YYYY-MM-DD')
    repo = args.source.resolve()
    package = repo / 'output/app-store/en/source/captures'
    sources = [(package / name, name) for name in CAPTURES]
    sources.append((repo / 'assets/icon/icon.png', 'icon.png'))
    missing = [str(src) for src, _ in sources if not src.is_file()]
    if missing:
        parser.error('Missing inputs:\n' + '\n'.join(missing))
    dest = SITE / 'src/assets/metanoia' / args.date
    # Validate everything before writing; do not silently replace a dated set.
    for src, name in sources:
        target = dest / name
        if target.exists() and digest(target) != digest(src):
            parser.error(f'{target} differs; use a new import date')
    dest.mkdir(parents=True, exist_ok=True)
    records = []
    for src, name in sources:
        target = dest / name
        shutil.copy2(src, target)
        assert digest(src) == digest(target), f'Copy mismatch: {name}'
        records.append({'file': name, 'source': str(src.relative_to(repo)),
                        'sha256': digest(target), 'bytes': target.stat().st_size})
    manifest = {'imported': args.date, 'kind': 'Unchanged original app screenshots and current app icon',
                'note': 'Product captures contain sample entries. Import date is not an app release date.',
                'files': records}
    (dest / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
    print(f'Copied and verified {len(records)} assets into {dest}')


if __name__ == '__main__':
    main()
