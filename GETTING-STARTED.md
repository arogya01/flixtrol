# 🎯 Getting Started with Flixtrol

## What You Have

A complete Chrome extension that lets you control Netflix from any page! Perfect for presentations and multitasking.

---

## 🚀 Let's Get You Started (3 Steps)

### Step 1: Load the Extension (1 minute)

1. Open Chrome and type in the address bar: `chrome://extensions/`
2. Turn on **Developer mode** (toggle in top-right corner)
3. Click **"Load unpacked"** button
4. Navigate to this folder (`flixtrol`) and select it
5. You'll see the Flixtrol icon appear in your toolbar! 🎉

### Step 2: Test It (1 minute)

1. Open a new tab and go to **netflix.com**
2. Sign in and **play any video** (movie or show)
3. Click the **Flixtrol icon** in your Chrome toolbar
4. A floating control panel appears! ✨

### Step 3: Use the Controls

Click the buttons to control Netflix:
- **▶️/⏸️** = Play or Pause
- **⏪** = Go back 10 seconds
- **⏩** = Skip forward 10 seconds  
- **🔉** = Lower volume
- **🔊** = Raise volume

**Bonus**: Drag the panel header to move it anywhere on your screen!

---

## 🎓 Real-World Usage: During a Presentation

Here's the magic moment - using Flixtrol during a Google Meet:

1. **Open Netflix** in one tab
2. **Start playing** your content
3. **Join Google Meet** in another tab
4. **Share your screen** (share a specific window or entire screen)
5. Press **`Ctrl+Shift+N`** (Windows/Linux) or **`Cmd+Shift+N`** (Mac)
6. The Flixtrol panel appears **on your Meet screen**! 🎬
7. Control Netflix without switching tabs!

Your audience sees your presentation. You see the Flixtrol controls. Perfect! 👌

---

## 🎨 Customize It

### Change the Keyboard Shortcut

1. Go to `chrome://extensions/shortcuts/`
2. Find "Flixtrol - Netflix Remote Control"
3. Click the pencil icon
4. Press your preferred key combination
5. Done!

### Pin the Icon to Toolbar

1. Click the puzzle piece icon in Chrome toolbar
2. Find "Flixtrol - Netflix Remote Control"  
3. Click the pin icon 📌

---

## 💡 Pro Tips

### Tip 1: Panel Position Memory
The panel remembers where you place it! Drag it once to your favorite spot, and it'll reappear there next time.

### Tip 2: Status Indicator
- **Green dot** = Connected to Netflix ✅
- **Red dot** = No Netflix found ❌

If you see red, make sure:
- You're actually playing a video on Netflix
- The URL shows `netflix.com/watch/...`
- Try refreshing the Netflix tab

### Tip 3: Quick Toggle
Use the keyboard shortcut (`Ctrl+Shift+N` or `Cmd+Shift+N`) to show/hide the panel instantly without clicking.

### Tip 4: Works Everywhere
The panel works on ANY page, not just Google Meet:
- Google Slides presentations
- Zoom screen shares
- Any website while multitasking
- Full-screen apps (with appropriate permissions)

---

## 🐛 Something Not Working?

### "No Netflix Tab Found" Message

**Problem**: Red indicator, panel says no Netflix found

**Solutions**:
1. Open Netflix and actually **play a video** (not just browse)
2. Make sure the URL includes `/watch/`
3. Try clicking a control button to retry connection
4. Refresh the Netflix tab

### Panel Disappeared

**Problem**: Can't see the panel anymore

**Solutions**:
1. Press `Ctrl+Shift+N` (or `Cmd+Shift+N`) to toggle it back
2. It might be off-screen - it will reset position on next toggle
3. Check if extension is still enabled at `chrome://extensions/`

### Controls Don't Work

**Problem**: Buttons don't do anything

**Solutions**:
1. Check the status indicator (should be green)
2. Make sure Netflix video is actually playing
3. Try pausing/playing on Netflix directly first
4. Close and reopen the panel
5. Refresh both Netflix tab and current tab

### Extension Won't Load

**Problem**: Chrome says "Failed to load extension"

**Solutions**:
1. Make sure you selected the correct `flixtrol` folder
2. Verify icons exist: check `icons/icon16.png`, `icon48.png`, `icon128.png`
3. If icons are missing, run: `python3 create-simple-icons.py`
4. Check for error details in `chrome://extensions/` (click "Details")

---

## 📚 Learn More

- **README.md** - Complete documentation with all features
- **INSTALL.md** - Detailed installation troubleshooting
- **ARCHITECTURE.md** - How it works under the hood
- **PROJECT-SUMMARY.md** - Full project overview

---

## 🎯 Common Use Cases

### Use Case 1: Google Meet Presentations
Present a Netflix documentary while maintaining control over playback during your discussion.

### Use Case 2: Multi-Monitor Setup
Netflix on one screen, work on another, controls always accessible.

### Use Case 3: Educational Settings
Teachers can control educational content while teaching on video calls.

### Use Case 4: Watch Parties
Control playback while managing chat or other coordination tools.

---

## ⌨️ Keyboard Reference

| Action | Windows/Linux | Mac |
|--------|--------------|-----|
| Toggle Panel | `Ctrl+Shift+N` | `Cmd+Shift+N` |
| (Everything else is click-based in the panel) |

---

## 🎉 You're All Set!

That's it! You now have a powerful Netflix remote control that works from any page.

### Quick Recap:
1. ✅ Extension installed
2. ✅ Open Netflix and play a video
3. ✅ Click Flixtrol icon or press shortcut
4. ✅ Control Netflix from anywhere!

### Next Steps:
- Try it during your next Google Meet
- Experiment with the drag-and-drop positioning
- Customize the keyboard shortcut to your liking
- Share it with friends who do presentations!

---

**Enjoy seamless Netflix control! 🍿 🎬**

*Have fun, and happy streaming!*

