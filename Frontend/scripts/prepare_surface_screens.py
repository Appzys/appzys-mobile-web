"""Extract existing screen interiors; keep original store assets unchanged.
Run with a Python environment containing Pillow after updating source artwork.
Bounds are fractions of each original image, reviewed per screenshot.
"""
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
BOUNDS = {
    'copy-text-on-screen': [(0,0,1,1), (.125,.245,.875,1), (.125,.245,.875,1)],
    'ai-text-scanner': [(0,0,1,1), (.14,.25,.855,1), (.17,.25,.83,1)],
    'ai-transcript-audio-to-text': [(0,0,1,1), (.18,.205,.815,.965), (.19,.205,.81,.96)],
    'handwriting-to-text-scanner': [(.17,.17,.815,.968), (.175,.17,.82,.968), (.16,.18,.845,.968)],
    'live-transcribe': [(0,0,1,1), (.16,.21,.845,1), (.16,.21,.845,1)],
    'ai-study-tutor': [(0,0,1,1), (.185,.205,.815,.925), (.185,.195,.815,.925)],
}
screens = json.loads((ROOT / 'src/data/productScreenshots.json').read_text())
for slug, bounds in BOUNDS.items():
    for index, box in enumerate(bounds):
        source = Image.open(ROOT / ('public' + screens[slug][index]['src']))
        crop = source.crop(tuple(round(v * (source.width if i % 2 == 0 else source.height)) for i,v in enumerate(box)))
        crop.save(ROOT / f'public/product-screenshots/{slug}-surface-{index + 1}.webp', quality=94)
