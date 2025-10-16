# 🧪 Testing Guide

## What Was Fixed

**Issue**: The panel toggle wasn't working when clicking the extension icon.

**Root Cause**: The background script was re-injecting the content script on every click, and the control panel script would toggle but then return early, preventing the message listener from being set up properly.

**Solution**: 
1. Background script now tries to send a toggle message first
2. Only injects the script if the message fails (script not present)
3. Control panel script sets up once and listens for toggle messages

---

## How to Test the Fix

### Step 1: Reload the Extension

1. Go to `chrome://extensions/`
2. Find "Flixtrol - Netflix Remote Control"
3. Click the **reload icon** (circular arrow)
4. ✅ Extension reloaded with the fix

### Step 2: Test Basic Toggle

1. **Open any webpage** (e.g., google.com)
2. **Click the Flixtrol icon** in your toolbar
3. ✅ Panel should appear
4. **Click the icon again**
5. ✅ Panel should disappear
6. **Click once more**
7. ✅ Panel should reappear

**Expected**: Panel toggles on/off with each click

### Step 3: Test Keyboard Shortcut

1. With the panel visible, press `Ctrl+Shift+N` (or `Cmd+Shift+N` on Mac)
2. ✅ Panel should disappear
3. Press the shortcut again
4. ✅ Panel should reappear

**Expected**: Keyboard shortcut toggles the panel

### Step 4: Test with Netflix

1. **Open Netflix** (netflix.com) and **play a video**
2. **Open a new tab** (any website)
3. **Click the Flixtrol icon**
4. ✅ Panel appears with **green indicator** (Netflix Connected)
5. **Click play/pause button**
6. ✅ Netflix video pauses/plays
7. **Click the extension icon again**
8. ✅ Panel disappears
9. **Click once more**
10. ✅ Panel reappears and controls still work

**Expected**: Panel toggles correctly and controls work

### Step 5: Test During Google Meet

1. **Open Netflix** in one tab and play a video
2. **Join a Google Meet** in another tab
3. **Start screen sharing**
4. **Press** `Ctrl+Shift+N` (or `Cmd+Shift+N`)
5. ✅ Panel appears on your Meet screen
6. **Click play/pause, forward, backward buttons**
7. ✅ Netflix responds to controls
8. **Press shortcut again**
9. ✅ Panel disappears
10. **Press shortcut once more**
11. ✅ Panel reappears

**Expected**: Full functionality during screen share

---

## Debugging Tips

### If Panel Still Doesn't Appear

1. **Open Chrome DevTools** (F12 or Right-click → Inspect)
2. Go to the **Console** tab
3. Click the Flixtrol icon
4. Look for console messages:
   - `"Injecting control panel for the first time"` (first click)
   - `"Panel toggled via message"` (subsequent clicks)
   - Any errors in red

### Check Background Service Worker

1. Go to `chrome://extensions/`
2. Find Flixtrol → Click **"Details"**
3. Click **"Inspect views: service worker"**
4. Try toggling the panel
5. Watch for console messages and errors

### Common Issues

**Panel appears but won't toggle off**:
- Check browser console for JavaScript errors
- Try refreshing the page and clicking icon again

**"No Netflix Tab Found"**:
- This is expected if Netflix isn't playing
- Panel should still toggle, just shows red indicator

**Controls don't work**:
- Different issue (not related to toggle fix)
- Make sure Netflix is actually playing a video

---

## Test Results Checklist

- [ ] Extension reloaded successfully
- [ ] Panel appears on first click
- [ ] Panel disappears on second click
- [ ] Panel reappears on third click
- [ ] Keyboard shortcut works (toggle on/off)
- [ ] Works on different websites
- [ ] Netflix connection indicator works
- [ ] Controls work when Netflix is playing
- [ ] Toggle works during Google Meet screen share
- [ ] No console errors

---

## ✅ Success Criteria

The fix is working correctly if:
1. ✅ First click shows the panel
2. ✅ Second click hides the panel
3. ✅ Third click shows the panel again
4. ✅ Keyboard shortcut toggles consistently
5. ✅ Works on any webpage
6. ✅ No duplicate panels created
7. ✅ No console errors

---

**If all tests pass, the toggle functionality is working perfectly!** 🎉

