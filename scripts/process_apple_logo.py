import os
from PIL import Image, ImageOps

# Exact Apple Vector Path from Apple's official design kit
apple_path_d = "M28.2226562,20.3846154 C29.0546875,20.3846154 30.0976562,19.8048315 30.71875,19.0317864 C31.28125,18.3312142 31.6914062,17.352829 31.6914062,16.3744437 C31.6914062,16.2415766 31.6796875,16.1087095 31.65625,16 C30.7304687,16.0362365 29.6171875,16.640178 28.9492187,17.4494596 C28.421875,18.06548 27.9414062,19.0317864 27.9414062,20.0222505 C27.9414062,20.1671964 27.9648438,20.3121424 27.9765625,20.3604577 C28.0351562,20.3725366 28.1289062,20.3846154 28.2226562,20.3846154 Z M25.2929688,35 C26.4296875,35 26.9335938,34.214876 28.3515625,34.214876 C29.7929688,34.214876 30.109375,34.9758423 31.375,34.9758423 C32.6171875,34.9758423 33.4492188,33.792117 34.234375,32.6325493 C35.1132812,31.3038779 35.4765625,29.9993643 35.5,29.9389701 C35.4179688,29.9148125 33.0390625,28.9122695 33.0390625,26.0979021 C33.0390625,23.6579784 34.9140625,22.5588048 35.0195312,22.474253 C33.7773438,20.6382708 31.890625,20.5899555 31.375,20.5899555 C29.9804688,20.5899555 28.84375,21.4596313 28.1289062,21.4596313 C27.3554688,21.4596313 26.3359375,20.6382708 25.1289062,20.6382708 C22.8320312,20.6382708 20.5,22.5950413 20.5,26.2911634 C20.5,28.5861411 21.3671875,31.013986 22.4335938,32.5842339 C23.3476562,33.9129053 24.1445312,35 25.2929688,35 Z"

# 1. Save standard SVG file
svg_content = f'''<svg viewBox="19 15 17 21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="{apple_path_d}" fill-rule="nonzero" />
</svg>'''

with open('public/apple-logo.svg', 'w') as f:
    f.write(svg_content)
print("Created public/apple-logo.svg")

# 2. Extract silhouette from user's image media_1795012530838_7ae7f47c.jpg to make clean transparent PNGs
user_img_path = r'C:\Users\priya\.gemini\antigravity\brain\1f270e85-4a58-4acc-9c80-0d6c2feaf860\.user_uploaded\media_1795012530838_7ae7f47c.jpg'
if os.path.exists(user_img_path):
    img = Image.open(user_img_path).convert('RGB')
    # The logo is pure black on a light checkerboard (checkerboard is > 180)
    # Let's extract the black mask
    w, h = img.size
    rgba = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    pixels_in = img.load()
    pixels_out = rgba.load()
    
    for y in range(h):
        for x in range(w):
            r, g, b = pixels_in[x, y]
            # If dark pixel (apple silhouette)
            if r < 80 and g < 80 and b < 80:
                # Smooth alpha based on luminance
                lum = (r + g + b) / 3.0
                alpha = int(max(0, min(255, (80 - lum) * (255.0 / 80.0))))
                pixels_out[x, y] = (0, 0, 0, 255)
            elif r < 140 and g < 140 and b < 140:
                lum = (r + g + b) / 3.0
                alpha = int(max(0, min(255, (140 - lum) * (255.0 / 80.0))))
                pixels_out[x, y] = (0, 0, 0, alpha)

    # Crop to bounding box
    bbox = rgba.getbbox()
    if bbox:
        cropped = rgba.crop(bbox)
        # Pad slightly to square
        bw = cropped.width
        bh = cropped.height
        side = max(bw, bh) + 40
        square_img = Image.new('RGBA', (side, side), (0, 0, 0, 0))
        square_img.paste(cropped, ((side - bw) // 2, (side - bh) // 2))
        
        # Save as 512x512
        final_512 = square_img.resize((512, 512), Image.Resampling.LANCZOS)
        final_512.save('public/logo.png', 'PNG')
        final_512.save('public/icon.png', 'PNG')
        final_512.save('public/apple-logo.png', 'PNG')
        print("Generated public/logo.png, public/icon.png, public/apple-logo.png from uploaded Apple logo!")
