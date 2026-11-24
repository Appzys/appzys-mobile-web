"""Save reviewable case study originals, prepared screens and frame assets by app."""
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT.parent / 'working' / 'case-study-assets'
screens = json.loads((ROOT / 'src/data/productScreenshots.json').read_text())
FRAME = '''<svg xmlns="http://www.w3.org/2000/svg" width="740" height="1540" viewBox="0 0 740 1540"><rect x="2" y="2" width="736" height="1536" rx="72" fill="#11151c" stroke="#9ba6b4" stroke-width="4"/><rect x="16" y="16" width="708" height="1508" rx="56" fill="none" stroke="#11151c" stroke-width="12"/></svg>'''
for slug, images in screens.items():
    folder = DEST / slug
    folder.mkdir(parents=True, exist_ok=True)
    for index, screen in enumerate(images, 1):
        original = ROOT / ('public' + screen['src'])
        shutil.copy2(original, folder / f'{slug}-screenshot-{index:02d}-original{original.suffix}')
        extension = 'png'
        prepared = ROOT / f'public/product-screenshots/{slug}-surface-{index}.{extension}'
        shutil.copy2(prepared, folder / f'{slug}-screenshot-{index:02d}-screen.{extension}')
    (folder / f'{slug}-phone-frame.svg').write_text(FRAME)
    shutil.copy2(ROOT / 'public/product-screenshots/device-frame.png', folder / f'{slug}-catalog-device-frame.png')
(DEST / 'README.txt').write_text('Originals and prepared screens are grouped by app.\nAll six apps use the approved shared frame geometry and 720 x 1520 screen canvases.\nphone-frame.svg is a reusable frame reference; the case study website renders its frame in CSS (Frontend/src/index.css).\ncatalog-device-frame.png is the existing catalog overlay.\nRegenerate this folder with /usr/bin/python3 Frontend/scripts/export_case_study_assets.py\n')
print(DEST)
