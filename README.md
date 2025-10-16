# 🎬 Flixtrol - Netflix Remote Control

A Chrome extension that lets you control Netflix playback from any page with a floating control panel. Perfect for controlling Netflix during Google Meet presentations or while multitasking!

## ✨ Features

- **Floating Control Panel**: Beautiful, draggable control panel that appears on any page
- **Remote Control**: Play/pause, skip forward/backward (10s), volume control
- **Auto-Detection**: Automatically finds and connects to your Netflix tab
- **Keyboard Shortcut**: Quick toggle with `Ctrl+Shift+N` (or `Cmd+Shift+N` on Mac)
- **Smart Positioning**: Remembers panel position between sessions
- **Real-time Status**: Shows connection status to Netflix tab

## 🚀 Installation

### Method 1: Load as Unpacked Extension (Development)

1. **Generate Icons** (required):
   ```bash
   # Option A: Using the HTML generator (recommended)
   # Open generate-icons.html in your browser and click "Download All"
   
   # Option B: Using the Node.js script
   node generate-icons.js
   # Then convert the generated SVGs to PNGs
   ```

2. **Open Chrome Extensions Page**:
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)

3. **Load Extension**:
   - Click "Load unpacked"
   - Select the `flixtrol` directory
   - The extension icon should appear in your toolbar!

### Method 2: Package and Install (Optional)

1. After generating icons, package the extension:
   - In Chrome, go to `chrome://extensions/`
   - Click "Pack extension"
   - Select the `flixtrol` directory
   - Chrome will create a `.crx` file

2. Install the `.crx` file by dragging it to `chrome://extensions/`

## 📖 Usage

### Basic Usage

1. **Open Netflix**: Start playing something on Netflix in any tab
2. **Toggle Control Panel**: 
   - Click the Flixtrol extension icon in your toolbar, OR
   - Press `Ctrl+Shift+N` (Windows/Linux) or `Cmd+Shift+N` (Mac)
3. **Control Playback**: The floating panel appears with Netflix controls

### During Presentations

1. Start your Netflix content in one tab
2. Join your Google Meet call
3. Start screen sharing
4. Toggle the Flixtrol control panel (`Ctrl+Shift+N`)
5. Control Netflix without switching tabs!

### Controls

- **Play/Pause**: Toggle playback
- **⏪ Backward**: Skip back 10 seconds
- **⏩ Forward**: Skip forward 10 seconds
- **Volume 🔉/🔊**: Decrease/increase volume by 10%
- **Drag**: Click and drag the header to reposition
- **Close**: Click the × button or toggle with shortcut

## 🎯 Use Cases

- **Presentations**: Control Netflix during Google Meet/Zoom screen shares
- **Multitasking**: Control playback while working in other tabs
- **Accessibility**: Quick controls without tab switching
- **Watch Parties**: Control playback while managing other tasks

## 🛠️ Technical Details

### Architecture

- **Manifest V3**: Modern Chrome extension format
- **Background Service Worker**: Manages tab detection and message routing
- **Content Scripts**: 
  - Netflix controller for video playback control
  - Floating panel for user interface
- **Chrome Storage API**: Saves panel position and preferences

### Permissions

- `tabs`: Find Netflix tabs
- `storage`: Remember panel position
- `scripting`: Inject control panel
- `activeTab`: Access current tab
- Host permissions for `*.netflix.com`

### Browser Compatibility

- Google Chrome (recommended)
- Microsoft Edge (Chromium-based)
- Brave Browser
- Other Chromium-based browsers

## 🔧 Development

### File Structure

```
flixtrol/
├── manifest.json              # Extension configuration
├── background.js              # Background service worker
├── scripts/
│   ├── netflix-controller.js # Netflix video control
│   └── control-panel.js       # Floating UI panel
├── styles/
│   └── panel.css             # Panel styling
├── icons/                    # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── generate-icons.html       # Icon generator (browser)
├── generate-icons.js         # Icon generator (Node.js)
└── README.md                 # This file
```

### Customization

**Change Keyboard Shortcut**:
Edit `manifest.json`:
```json
"commands": {
  "toggle-panel": {
    "suggested_key": {
      "default": "Ctrl+Shift+N"
    }
  }
}
```

**Adjust Skip Duration**:
Edit `scripts/netflix-controller.js`, change the number in:
```javascript
video.currentTime += 10; // Change 10 to your preferred seconds
```

**Customize Appearance**:
Edit `styles/panel.css` to change colors, size, or animations.

## 🐛 Troubleshooting

### Panel shows "No Netflix Tab Found"
- Make sure you have a Netflix video playing (`netflix.com/watch`)
- Try refreshing the Netflix tab
- Click the refresh icon on the control panel

### Controls not working
- Ensure Netflix is actually playing a video (not just browsing)
- Try toggling the panel off and on again
- Check that the extension has proper permissions

### Panel disappeared
- Press `Ctrl+Shift+N` to toggle it back on
- The panel might be off-screen; it will reset on next toggle

### Extension not loading
- Make sure you generated the icon files
- Check that all files are present in the directory
- Look for errors in `chrome://extensions/` (click "Details" → "Errors")

## 📝 Future Enhancements

Potential features for future versions:
- Skip intro/credits buttons
- Subtitle controls
- Playback speed adjustment
- Multiple Netflix tabs support
- Custom keyboard shortcuts per control
- Themes and customization options
- Support for other streaming services

## 🤝 Contributing

Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source. Feel free to use and modify as needed.

## ⚠️ Disclaimer

This extension is not affiliated with, endorsed by, or sponsored by Netflix. It's a third-party tool created for convenience and productivity.

## 🎉 Credits

Created to solve the problem of controlling Netflix during screen presentations. Built with modern Chrome Extension APIs (Manifest V3).

---

**Enjoy seamless Netflix control! 🍿**

