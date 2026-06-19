from PIL import Image
import os, glob

src_dir = '/app/workspace/public/stills-original/Photos'
out_dir = '/app/workspace/public/stills'
os.makedirs(out_dir, exist_ok=True)

files = glob.glob(os.path.join(src_dir, '*.jpg')) + glob.glob(os.path.join(src_dir, '*.JPG'))
files = [f for f in files if not f.endswith('.part')]

for i, f in enumerate(sorted(files)):
    name = f'still-{i+1}.jpg'
    out_path = os.path.join(out_dir, name)
    
    img = Image.open(f)
    
    # Resize to max 1600px wide (plenty for web, saves huge amounts)
    max_dim = 1600
    if max(img.size) > max_dim:
        ratio = max_dim / max(img.size)
        new_size = (int(img.size[0] * ratio), int(img.size[1] * ratio))
        img = img.resize(new_size, Image.LANCZOS)
    
    # Convert to RGB if needed
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Save with quality optimization
    img.save(out_path, 'JPEG', quality=78, optimize=True)
    
    orig = os.path.getsize(f)
    new = os.path.getsize(out_path)
    pct = (1 - new/orig) * 100
    print(f'{name}: {orig/1024/1024:.1f}MB → {new/1024/1024:.1f}MB ({pct:.0f}% smaller)')

total = sum(os.path.getsize(os.path.join(out_dir, f)) for f in os.listdir(out_dir))
print(f'\nTotal optimized: {total/1024/1024:.1f}MB')
