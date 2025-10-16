# 📦 Installation Guide

Complete installation instructions for Flixtrol Chrome Extension.

## Prerequisites

- Google Chrome (or any Chromium-based browser like Edge, Brave)
- A Netflix subscription (to actually use the controls)

## Installation Steps

### 1. Verify Icon Files

The extension should already have PNG icons in the `icons/` directory:
- ✅ `icons/icon16.png`
- ✅ `icons/icon48.png`  
- ✅ `icons/icon128.png`

If these files are missing, generate them:

**Option A - Simple Python Script (Recommended):**
```bash
python3 create-simple-icons.py
```

**Option B - Better Looking Icons (Requires Browser):**
1. Open `generate-icons.html` in your browser
2. Click "Download All" button
3. Move the downloaded PNG files to the `icons/` directory

**Option C - Using Node.js:**
```bash
node generate-icons.js
# Then open generate-icons.html to convert SVGs to PNGs
```

### 2. Load Extension in Chrome

#### For Chrome/Edge/Brave:

1. **Open Extensions Page**
   - Chrome: Navigate to `chrome://extensions/`
   - Edge: Navigate to `edge://extensions/`
   - Brave: Navigate to `brave://extensions/`

2. **Enable Developer Mode**
   - Look for the toggle switch in the top-right corner
   - Turn it ON

3. **Load the Extension**
   - Click the "Load unpacked" button
   - Navigate to the `flixtrol` directory
   - Click "Select" or "Open"

4. **Verify Installation**
   - You should see "Flixtrol - Netflix Remote Control" in your extensions list
   - The Flixtrol icon should appear in your browser toolbar
   - Status should show "Loaded"

### 3. Configure (Optional)

#### Change Keyboard Shortcut:
1. Go to `chrome://extensions/shortcuts/`
2. Find "Flixtrol - Netflix Remote Control"
3. Click the pencil icon next to "Toggle Netflix control panel"
4. Press your desired key combination
5. Click "OK"

#### Pin Extension to Toolbar:
1. Click the puzzle piece icon in Chrome toolbar
2. Find "Flixtrol - Netflix Remote Control"
3. Click the pin icon to keep it visible

## Verification

Test that everything works:

1. **Open Netflix**: Go to [netflix.com](https://netflix.com)
2. **Start Playing**: Play any video (must be at `/watch/` URL)
3. **Toggle Panel**: Click the Flixtrol icon or press `Ctrl+Shift+N` (Windows/Linux) or `Cmd+Shift+N` (Mac)
4. **Check Status**: The panel should show a green indicator and "Netflix Connected"
5. **Test Controls**: Try play/pause, forward, backward buttons

## Troubleshooting Installation

### Extension won't load

**Error: "Manifest file is missing or unreadable"**
- Make sure you selected the correct `flixtrol` folder
- Verify `manifest.json` exists in the root of the folder

**Error: "Failed to load extension"**
- Check that all required files exist:
  - `manifest.json`
  - `background.js`
  - `scripts/netflix-controller.js`
  - `scripts/control-panel.js`
  - `styles/panel.css`
  - Icon files in `icons/` directory

### Icons missing or broken

**Symptom: Extension loads but shows broken icon images**
- Run: `python3 create-simple-icons.py`
- Or open `generate-icons.html` in browser and download icons
- Make sure PNG files are in the `icons/` directory

**Symptom: "Could not load icon" errors**
- Check file names match exactly: `icon16.png`, `icon48.png`, `icon128.png`
- Verify files are valid PNG images (not SVG or other formats)

### Permission Denied Errors

**On macOS/Linux:**
```bash
chmod +x create-simple-icons.py
./create-simple-icons.py
```

### Extension Disabled Automatically

Chrome may disable extensions that aren't from the Web Store:
1. Click "Details" on the extension in `chrome://extensions/`
2. Re-enable it if disabled
3. For permanent solution, add to your organization's policy (enterprise) or accept the warning

## Distribution (Optional)

To share the extension with others:

### Method 1: Share Folder
1. Zip the entire `flixtrol` directory
2. Share the zip file
3. Recipients follow the same installation steps

### Method 2: Create .crx Package
1. In Chrome, go to `chrome://extensions/`
2. Enable Developer mode
3. Click "Pack extension"
4. Select the `flixtrol` directory
5. Chrome creates a `.crx` file (and `.pem` key file)
6. Share the `.crx` file

**Note**: Recipients may need to enable Developer mode to install `.crx` files not from the Chrome Web Store.

### Method 3: Publish to Chrome Web Store (Advanced)
To distribute widely:
1. Create a [Chrome Web Store Developer account](https://chrome.google.com/webstore/devconsole/) ($5 one-time fee)
2. Package your extension as a `.zip`
3. Upload and submit for review
4. Once approved, users can install directly from the Web Store

## Updating the Extension

After making changes:
1. Go to `chrome://extensions/`
2. Find Flixtrol
3. Click the reload icon (circular arrow)
4. Test your changes

## Uninstallation

To remove Flixtrol:
1. Go to `chrome://extensions/`
2. Find "Flixtrol - Netflix Remote Control"
3. Click "Remove"
4. Confirm removal

Your panel position preferences will be cleared automatically.

## Next Steps

- See [QUICKSTART.md](QUICKSTART.md) for usage instructions
- Read [README.md](README.md) for full documentation
- Customize the extension to your needs

---

**Need help? Check the Troubleshooting section in README.md**

