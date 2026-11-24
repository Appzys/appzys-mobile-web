"""Extract existing screen interiors; keep original store assets unchanged.
Run with a Python environment containing Pillow after updating source artwork.
Bounds are fractions of each original image, reviewed per screenshot.
"""
import argparse
import json
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
BOUNDS = {
    'copy-text-on-screen': [(0,0,1,1), (.125,.245,.875,1), (.125,.245,.875,1)],
    'ai-text-scanner': [(0,0,1,1), (.14,.25,.855,1), (.17,.25,.83,1)],
    'ai-transcript-audio-to-text': [(0,0,1,1), (0,0,1,1), (.198,.205,.803,.966)],
    'handwriting-to-text-scanner': [(.17,.17,.815,.968), (.175,.17,.82,.968), (.16,.18,.845,.968)],
    'live-transcribe': [(0,0,1,1), (.16,.21,.845,1), (.16,.21,.845,1)],
    'ai-study-tutor': [(0,0,1,1), (.185,.205,.815,.915), (.185,.195,.815,.925)],
}
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--app', choices=list(BOUNDS), help='Prepare only this app')
args = parser.parse_args()
screens = json.loads((ROOT / 'src/data/productScreenshots.json').read_text())
for slug, bounds in BOUNDS.items():
    if args.app and slug != args.app:
        continue
    for index, box in enumerate(bounds):
        source = Image.open(ROOT / ('public' + screens[slug][index]['src']))
        crop = source.crop(tuple(round(v * (source.width if i % 2 == 0 else source.height)) for i,v in enumerate(box)))
        if slug == 'ai-transcript-audio-to-text':
            crop = crop.convert('RGB')
            if index == 0:
                fitted = crop.resize((720, 1280), Image.Resampling.LANCZOS)
                canvas = Image.new('RGB', (720, 1520), fitted.getpixel((0, 0)))
                canvas.paste(fitted.crop((0, 0, 720, 336)), (0, 0))
                canvas.paste(fitted.crop((0, 336, 720, 960)), (0, 456))
                canvas.paste(fitted.getpixel((10, 700)), (0, 1080, 720, 1200))
                canvas.paste(fitted.crop((0, 960, 720, 1280)), (0, 1200))
            else:
                if index == 2:
                    # Remove the source device camera and preserve original status glyphs.
                    time = crop.crop((35, 12, 105, 49))
                    indicators = crop.crop((535, 12, 615, 49))
                    crop.paste('white', (0, 0, crop.width, 70))
                    crop.paste(time, (35, 22))
                    crop.paste(indicators, (535, 22))
                fitted = ImageOps.contain(crop, (720, 1520), Image.Resampling.LANCZOS)
                canvas = Image.new('RGB', (720, 1520), 'white')
                canvas.paste(fitted, ((720 - fitted.width) // 2, 0))
            if index == 1:
                # Use the approved sparse gray Android status bar, preserving the app UI.
                status = Image.open(ROOT / 'public/product-screenshots/shared-status-bar.png').convert('RGB')
                canvas.paste(status, (0, 0))
            canvas.save(ROOT / f'public/product-screenshots/{slug}-surface-{index + 1}.png')
            continue
        if slug == 'ai-text-scanner' and index == 1:
            # The enlarged OCR result extends outside the promotional device.
            # Fit both original regions inside the single website screen.
            strips = []
            for region in [(210, 640, 1230, 1560), (164, 1590, 1276, 2560)]:
                strip = source.crop(region).convert('RGB')
                strips.append(strip.resize((720, round(strip.height * 720 / strip.width)), Image.Resampling.LANCZOS))
            crop = Image.new('RGB', (720, sum(strip.height for strip in strips)), '#e3f4ff')
            offset = 0
            for strip in strips:
                crop.paste(strip, (0, offset))
                offset += strip.height
        if slug in ('copy-text-on-screen', 'ai-text-scanner'):
            # Uniform screen size, preserving every pixel's proportions. Extend only
            # the existing bottom system/toolbar color; never blend or synthesize UI.
            crop = crop.convert('RGB')
            fitted = crop.resize((720, round(crop.height * 720 / crop.width)), Image.Resampling.LANCZOS)
            canvas = Image.new('RGB', (720, 1520), crop.getpixel((crop.width // 2, crop.height - 1)))
            if slug == 'ai-text-scanner' and index == 0:
                # Keep the three promotional sections intact. Put the extra height
                # in the original blue spacing, not beneath the green footer.
                canvas = Image.new('RGB', (720, 1520), fitted.getpixel((0, 0)))
                canvas.paste(fitted.crop((0, 0, 720, 350)), (0, 0))
                canvas.paste(fitted.crop((0, 350, 720, 1008)), (0, 470))
                canvas.paste(fitted.crop((0, 1008, 720, fitted.height)), (0, 1248))
                canvas.save(ROOT / f'public/product-screenshots/{slug}-surface-{index + 1}.png')
                continue
            # Screens 2 and 3 start closer to the source crop's top edge.
            # Match screen 1's status-bar clearance without changing device size.
            top_inset = 16 if (slug == 'copy-text-on-screen' and index in (1, 2)) or (slug == 'ai-text-scanner' and index == 1) else 0
            if top_inset:
                canvas.paste(crop.getpixel((crop.width // 2, 10)), (0, 0, 720, top_inset))
            canvas.paste(fitted, (0, top_inset))
            if slug == 'ai-text-scanner' and index == 1:
                # Retain the original time/icons, remove the old rounded bezel,
                # and place both groups on the same inset baseline.
                time = canvas.crop((46, 20, 165, 50))
                indicators = canvas.crop((590, 20, 675, 50))
                canvas.paste('white', (0, 0, 720, 72))
                canvas.paste(time, (46, 28))
                canvas.paste(indicators, (590, 28))
            crop = canvas
            crop.save(ROOT / f'public/product-screenshots/{slug}-surface-{index + 1}.png')
            continue
        # Promotional callouts extend beyond the pictured device. Reflow those
        # original regions into the screen instead of slicing through their text.
        if slug == 'handwriting-to-text-scanner' and index in (1, 2):
            regions = (
                [(200, 340, 880, 574), (130, 596, 955, 1210), (130, 1240, 955, 1780)]
                if index == 1 else
                [(185, 345, 895, 808), (80, 836, 1000, 1050), (180, 1082, 900, 1850)]
            )
            strips = []
            for region in regions:
                strip = source.crop(region)
                strips.append(strip.resize((720, round(strip.height * 720 / strip.width)), Image.Resampling.LANCZOS))
            crop = Image.new('RGB', (720, sum(strip.height for strip in strips)), '#f4f5fa')
            offset = 0
            for strip in strips:
                crop.paste(strip, (0, offset))
                offset += strip.height
        # Remove black bezel remnants at the rounded corners of handwriting crops.
        if slug == 'handwriting-to-text-scanner':
            crop = crop.convert('RGB')
            for right in (False, True):
                for bottom in (False, True):
                    fill = crop.getpixel((crop.width // 2, crop.height - 5 if bottom else 5))
                    for dx in range(28):
                        for dy in range(28):
                            x = crop.width - 1 - dx if right else dx
                            y = crop.height - 1 - dy if bottom else dy
                            if max(crop.getpixel((x, y))) < 100:
                                crop.putpixel((x, y), fill)
        if slug == 'live-transcribe' and index > 0:
            # Exclude the original black top bezel before adding status clearance.
            crop = crop.crop((0, 10, crop.width, crop.height))
            for right in (False, True):
                for dx in range(28):
                    for y in range(28):
                        x = crop.width - 1 - dx if right else dx
                        if max(crop.getpixel((x, y))) < 100:
                            crop.putpixel((x, y), (255, 255, 255))
        if slug == 'ai-study-tutor' and index > 0:
            # Remove only old black bezel pixels at the lower outer corners.
            crop = crop.convert('RGB')
            for right in (False, True):
                fill = crop.getpixel((crop.width // 2, crop.height - 5))
                for dx in range(48):
                    for dy in range(48):
                        x = crop.width - 1 - dx if right else dx
                        y = crop.height - 1 - dy
                        if max(crop.getpixel((x, y))) < 100:
                            crop.putpixel((x, y), fill)
        # The remaining apps use the same approved 720 x 1520 screen canvas.
        # Fit every original region proportionally and reserve status-bar clearance.
        crop = crop.convert('RGB')
        top_inset = 16 if slug == 'handwriting-to-text-scanner' or index > 0 else 0
        fitted = ImageOps.contain(crop, (720, 1520 - top_inset), Image.Resampling.LANCZOS)
        canvas = Image.new('RGB', (720, 1520), crop.getpixel((crop.width // 2, crop.height - 5)))
        if top_inset:
            canvas.paste(crop.getpixel((crop.width // 2, 5)), (0, 0, 720, top_inset))
        canvas.paste(fitted, ((720 - fitted.width) // 2, top_inset))
        if slug == 'ai-study-tutor' and index == 0:
            # Distribute the spare height between existing sections, with the
            # exams panel anchored at the bottom rather than a blank footer.
            canvas = Image.new('RGB', (720, 1520), fitted.getpixel((0, fitted.height - 1)))
            canvas.paste(fitted.crop((0, 0, 720, 320)), (0, 0))
            canvas.paste(fitted.crop((0, 320, 720, 1014)), (0, 440))
            canvas.paste(fitted.crop((0, 1014, 720, fitted.height)), (0, 1520 - (fitted.height - 1014)))
        if slug == 'ai-study-tutor' and index == 1:
            # Keep the composer and native navigation attached to the bottom.
            # Remove only the old device's rounded corner remnants.
            fitted = fitted.convert('RGB')
            fill = fitted.getpixel((5, fitted.height - 90))
            for right in (False, True):
                for dx in range(40):
                    for dy in range(50):
                        x = fitted.width - 1 - dx if right else dx
                        y = fitted.height - 1 - dy
                        fitted.putpixel((x, y), fill)
            split = fitted.height - 350
            lower = fitted.crop((0, split, fitted.width, fitted.height))
            canvas = Image.new('RGB', (720, 1520), fill)
            x = (720 - fitted.width) // 2
            canvas.paste(fitted.crop((0, 0, fitted.width, split)), (x, top_inset))
            canvas.paste(lower, (x, 1520 - lower.height))
        canvas.save(ROOT / f'public/product-screenshots/{slug}-surface-{index + 1}.png')
