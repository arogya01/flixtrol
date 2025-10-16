#!/usr/bin/env node

/**
 * Icon Generator Script for Flixtrol
 * Generates PNG icons for the Chrome extension
 * Run with: node generate-icons.js
 */

const fs = require('fs');
const path = require('path');

// Create icons directory
const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir);
}

// SVG template for the icon
function createSVG(size) {
    const playSize = size * 0.4;
    const centerX = size / 2;
    const centerY = size / 2;
    const strokeWidth = size * 0.08;
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#e50914;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#b20710;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="${size}" height="${size}" fill="url(#bgGradient)"/>
  
  <!-- Remote control outline -->
  <rect x="${size * 0.15}" y="${size * 0.15}" width="${size * 0.7}" height="${size * 0.7}" 
        fill="none" stroke="white" stroke-width="${strokeWidth}"/>
  
  <!-- Play button -->
  <polygon points="${centerX - playSize * 0.3},${centerY - playSize * 0.5} ${centerX - playSize * 0.3},${centerY + playSize * 0.5} ${centerX + playSize * 0.5},${centerY}" 
           fill="white"/>
</svg>`;
}

// Generate SVG files
const sizes = [16, 48, 128];

sizes.forEach(size => {
    const svg = createSVG(size);
    const svgPath = path.join(iconsDir, `icon${size}.svg`);
    fs.writeFileSync(svgPath, svg);
    console.log(`✓ Generated ${svgPath}`);
});

console.log('\n📝 SVG icons generated successfully!');
console.log('⚠️  Note: Chrome extensions work best with PNG files.');
console.log('   Convert SVGs to PNGs using one of these methods:');
console.log('   1. Open generate-icons.html in a browser and click "Download All"');
console.log('   2. Use an online converter like https://cloudconvert.com/svg-to-png');
console.log('   3. Use ImageMagick: convert icon.svg icon.png');
console.log('   4. For now, you can also rename .svg to .png and Chrome will accept them in developer mode\n');

