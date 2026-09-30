#!/usr/bin/env python3
"""Import Metanoia's reading content unchanged, with its content licence."""
import argparse
from datetime import date
import hashlib
import json
from pathlib import Path
import shutil

SITE = Path(__file__).resolve().parents[1]
LOCALES = ['en', 'es', 'pt_BR', 'fr', 'de', 'it', 'pl', 'tl', 'vi', 'id', 'ko', 'ml', 'ta', 'hi']


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, default=SITE.parent / 'metanoia')
    args = parser.parse_args()
    repo = args.source.resolve()
    source = repo / 'assets/data'
    paths = [Path('LICENSE')]
    for locale in LOCALES:
        commandment_path = Path(f'commandments/commandments_{locale}.json')
        question_path = Path(f'questions/questions_{locale}.json')
        commandments = json.loads((source / commandment_path).read_text())
        groups = json.loads((source / question_path).read_text())
        codes = {item['code'] for item in commandments}
        assert len(codes) == len(commandments) == len(groups) == 14, locale
        assert codes == {group['commandmentCode'] for group in groups}, locale
        questions = [question for group in groups for question in group['questions']]
        assert len({question['id'] for question in questions}) == len(questions), locale
        assert all(isinstance(question['text'], str) and question['text'].strip() for question in questions), locale
        paths.extend([commandment_path, question_path])
        for folder in ['confession_guide', 'prayers', 'faqs', 'invitation']:
            path = Path(f'{folder}/{folder}_{locale}.json')
            data = json.loads((source / path).read_text())
            if folder == 'prayers':
                assert data['categories'] and all(category['prayers'] for category in data['categories']), path
            elif folder == 'faqs':
                assert data and all(item['title'] and item['content'] for item in data), path
            else:
                assert data['sections'] and all(item['title'] and item['content'] for item in data['sections']), path
            paths.append(path)
    assert (source / 'LICENSE').is_file()
    dest = SITE / 'src/data/metanoia-content'
    records = []
    for path in paths:
        target = dest / path
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source / path, target)
        content = target.read_bytes()
        assert content == (source / path).read_bytes(), path
        records.append({'file': str(path), 'source': str((source / path).relative_to(repo)),
                        'sha256': hashlib.sha256(content).hexdigest(), 'bytes': len(content)})
    manifest = {'imported': date.today().isoformat(), 'kind': 'Unchanged examination, guide, prayers, FAQs and invitation text; quotes excluded',
                'source': 'https://github.com/holystack-dev/metanoia', 'files': records}
    (dest / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
    public_licence = SITE / 'public/metanoia/content-license.txt'
    public_licence.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source / 'LICENSE', public_licence)
    print(f'Copied and verified {len(records)} content files into {dest}')


if __name__ == '__main__':
    main()
