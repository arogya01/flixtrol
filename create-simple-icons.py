#!/usr/bin/env python3
"""
Simple Icon Creator - No dependencies required!
Creates minimal valid PNG icons for Chrome extension
"""

import struct
import zlib
import os

def create_simple_png(size, color_rgb=(229, 9, 20)):
    """Create a simple solid color PNG"""
    
    # PNG signature
    png_signature = b'\x89PNG\r\n\x1a\n'
    
    # IHDR chunk (image header)
    width = height = size
    bit_depth = 8
    color_type = 2  # RGB
    compression = 0
    filter_method = 0
    interlace = 0
    
    ihdr_data = struct.pack('>IIBBBBB', width, height, bit_depth, color_type,
                            compression, filter_method, interlace)
    ihdr_chunk = create_chunk(b'IHDR', ihdr_data)
    
    # IDAT chunk (image data)
    # Create image data with gradient effect
    raw_data = bytearray()
    r, g, b = color_rgb
    
    for y in range(height):
        raw_data.append(0)  # Filter type for this scanline
        for x in range(width):
            # Create a subtle gradient effect
            factor = 1 - (x + y) / (width + height) * 0.3
            raw_data.extend([
                int(r * factor),
                int(g * factor),
                int(b * factor)
            ])
    
    compressed_data = zlib.compress(bytes(raw_data), 9)
    idat_chunk = create_chunk(b'IDAT', compressed_data)
    
    # IEND chunk (image end)
    iend_chunk = create_chunk(b'IEND', b'')
    
    # Combine all chunks
    png_data = png_signature + ihdr_chunk + idat_chunk + iend_chunk
    
    return png_data

def create_chunk(chunk_type, chunk_data):
    """Create a PNG chunk"""
    chunk_len = struct.pack('>I', len(chunk_data))
    chunk_crc = struct.pack('>I', zlib.crc32(chunk_type + chunk_data) & 0xffffffff)
    return chunk_len + chunk_type + chunk_data + chunk_crc

def main():
    # Create icons directory
    icons_dir = 'icons'
    os.makedirs(icons_dir, exist_ok=True)
    
    # Netflix red color
    netflix_red = (229, 9, 20)
    
    sizes = [16, 48, 128]
    
    for size in sizes:
        png_data = create_simple_png(size, netflix_red)
        filename = f'{icons_dir}/icon{size}.png'
        
        with open(filename, 'wb') as f:
            f.write(png_data)
        
        print(f'✓ Created {filename}')
    
    print('\n✅ All icons created successfully!')
    print('   Icons are simple Netflix-red squares.')
    print('   For better icons, open generate-icons.html in your browser.')

if __name__ == '__main__':
    main()

