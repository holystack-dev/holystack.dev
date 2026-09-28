#!/usr/bin/env python3
"""Copy an unmodified, dated Shema capture set into the website."""
import argparse
from datetime import date
import hashlib
import json
from pathlib import Path
import shutil


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, required=True, help='Shema firmware repository')
    parser.add_argument('--date', required=True, help='Capture directory date, YYYY-MM-DD')
    args = parser.parse_args()
    stamp = date.fromisoformat(args.date).isoformat()
    source = args.source.resolve()
    website = Path(__file__).resolve().parents[1]
    screenshots = source / 'design/product-screenshots' / stamp
    videos = source / 'design/product-videos' / stamp
    manifest = json.loads((screenshots / 'manifest.json').read_text())
    images = [item['file'] for item in manifest]
    if any(Path(name).name != name or not name.endswith('.png') for name in images):
        raise SystemExit('Unexpected screenshot filename in manifest')
    copies = [(screenshots / name, website / 'public/images/shema/screens' / stamp / name)
              for name in images + ['manifest.json', 'SHA256SUMS.json']]
    copies += [(videos / name, website / 'public/videos/shema' / stamp / name)
               for name in ['navigation-tour.mp4', 'navigation-tour.json']]
    # Validate the entire input and source image hashes before any output.
    checksums = json.loads((screenshots / 'SHA256SUMS.json').read_text())
    for original, _ in copies:
        if not original.is_file():
            raise SystemExit(f'Missing capture: {original}')
    for name in images:
        if hashlib.sha256((screenshots / name).read_bytes()).hexdigest() != checksums.get(name):
            raise SystemExit(f'Source checksum mismatch: {name}')
    for original, destination in copies:
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(original, destination)
        assert hashlib.sha256(original.read_bytes()).digest() == hashlib.sha256(destination.read_bytes()).digest()
    print(f'Copied {len(images)} original screenshots and the navigation tour for {stamp}.')
    print('Next: update src/data/shema.ts, review fixture captions, then npm run build.')


if __name__ == '__main__':
    main()
