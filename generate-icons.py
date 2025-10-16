#!/usr/bin/env python3
"""
Icon Generator for Flixtrol Chrome Extension
Generates PNG icons in three sizes: 16x16, 48x48, 128x128
"""

try:
    from PIL import Image, ImageDraw
    import os
except ImportError:
    print("❌ Pillow library not found!")
    print("   Install it with: pip install Pillow")
    exit(1)

def create_icon(size):
    """Create a Netflix-themed icon with play button"""
    
    # Create image with Netflix red background
    img = Image.new('RGB', (size, size), color='#e50914')
    draw = ImageDraw.Draw(img)
    
    # Draw remote control outline (white rectangle)
    padding = int(size * 0.15)
    outline_width = max(1, int(size * 0.08))
    draw.rectangle(
        [padding, padding, size - padding, size - padding],
        outline='white',
        width=outline_width
    )
    
    # Draw play button triangle
    center_x = size / 2
    center_y = size / 2
    play_size = size * 0.4
    
    triangle = [
        (center_x - play_size * 0.3, center_y - play_size * 0.5),
        (center_x - play_size * 0.3, center_y + play_size * 0.5),
        (center_x + play_size * 0.5, center_y)
    ]
    draw.polygon(triangle, fill='white')
    
    return img

def main():
    # Create icons directory
    icons_dir = 'icons'
    os.makedirs(icons_dir, exist_ok=True)
    
    sizes = [16, 48, 128]
    
    for size in sizes:
        icon = create_icon(size)
        filename = f'{icons_dir}/icon{size}.png'
        icon.save(filename, 'PNG')
        print(f'✓ Generated {filename}')
    
    print('\n✅ All PNG icons generated successfully!')
    print('   Your extension is ready to load in Chrome!')

if __name__ == '__main__':
    main()

