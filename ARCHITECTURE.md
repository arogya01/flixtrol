# 🏗️ Flixtrol Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Chrome Browser                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────────────────────────────────┐    │
│  │          Background Service Worker                  │    │
│  │           (background.js)                           │    │
│  │  • Netflix tab detection                            │    │
│  │  • Message routing                                  │    │
│  │  • Icon click handling                              │    │
│  │  • Keyboard shortcut handling                       │    │
│  └───────────┬────────────────────────┬────────────────┘    │
│              │                        │                      │
│              ▼                        ▼                      │
│  ┌──────────────────────┐  ┌──────────────────────┐        │
│  │   Netflix Tab        │  │   Any Tab            │        │
│  │  (netflix.com/watch) │  │  (google.com/meet)   │        │
│  ├──────────────────────┤  ├──────────────────────┤        │
│  │                      │  │                      │        │
│  │  Content Script:     │  │  Content Script:     │        │
│  │  netflix-controller  │  │  control-panel       │        │
│  │        .js           │  │        .js           │        │
│  │                      │  │                      │        │
│  │  • Find <video>      │  │  • Create floating   │        │
│  │  • Control playback  │  │    panel UI          │        │
│  │  • Execute commands  │  │  • Handle user input │        │
│  │  • Report state      │  │  • Send commands     │        │
│  │                      │  │  • Drag & position   │        │
│  │        ▼             │  │        ▲             │        │
│  │  ┌──────────────┐   │  │  ┌──────────────┐   │        │
│  │  │ Netflix Video│   │  │  │  Control UI  │   │        │
│  │  │   <video>    │   │  │  │  + Buttons   │   │        │
│  │  │   Element    │   │  │  │  + Styling   │   │        │
│  │  └──────────────┘   │  │  └──────────────┘   │        │
│  └──────────────────────┘  └──────────────────────┘        │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Message Flow Diagram

### 1. Toggle Panel (User Action)

```
User clicks icon / presses Ctrl+Shift+N
            │
            ▼
    ┌───────────────┐
    │  Background   │
    │   Worker      │──────► Find Netflix tab
    └───────┬───────┘
            │
            ├──► Inject control-panel.js
            ├──► Inject panel.css
            │
            ▼
    ┌───────────────┐
    │  Current Tab  │
    │ Control Panel │──────► Show/Hide Panel
    └───────────────┘
```

### 2. Control Command (User Interaction)

```
User clicks Play/Pause button
            │
            ▼
    ┌───────────────┐
    │ Control Panel │
    │  (Any Tab)    │
    └───────┬───────┘
            │
            │ chrome.runtime.sendMessage({
            │   action: 'controlNetflix',
            │   command: 'playPause'
            │ })
            │
            ▼
    ┌───────────────┐
    │  Background   │
    │   Worker      │──────► Find Netflix tab ID
    └───────┬───────┘
            │
            │ chrome.tabs.sendMessage(netflixTabId, {
            │   action: 'executeControl',
            │   command: 'playPause'
            │ })
            │
            ▼
    ┌───────────────┐
    │  Netflix Tab  │
    │  Controller   │──────► video.pause() or video.play()
    └───────────────┘
```

## Component Responsibilities

### Manifest (manifest.json)
**Role**: Configuration & Permissions

```json
{
  "permissions": [
    "tabs",      // → Find Netflix tabs
    "storage",   // → Save panel position
    "scripting"  // → Inject content scripts
  ],
  "content_scripts": [
    // Auto-load on Netflix
  ],
  "commands": {
    // Keyboard shortcuts
  }
}
```

### Background Worker (background.js)
**Role**: Orchestration & State Management

**Responsibilities**:
- Listen for user actions (icon click, keyboard)
- Discover Netflix tabs
- Track active Netflix tab
- Route messages between tabs
- Inject control panel dynamically
- Handle tab lifecycle (close, navigate)

**Key Functions**:
```javascript
findNetflixTab()        // → Scan all tabs for netflix.com/watch
toggleControlPanel()    // → Show/hide panel on current tab
// Message routing
chrome.runtime.onMessage.addListener()
```

### Netflix Controller (scripts/netflix-controller.js)
**Role**: Video Player Control

**Responsibilities**:
- Locate video element (`document.querySelector('video')`)
- Execute playback commands
- Control volume
- Seek forward/backward
- Report player state

**Key Functions**:
```javascript
controls.playPause()    // → video.play() / video.pause()
controls.forward()      // → video.currentTime += 10
controls.volumeUp()     // → video.volume += 0.1
controls.getState()     // → Return player info
```

### Control Panel (scripts/control-panel.js)
**Role**: User Interface

**Responsibilities**:
- Create floating panel DOM
- Handle button clicks
- Implement drag-and-drop
- Show connection status
- Save/restore position
- Send commands to background

**Key Functions**:
```javascript
createPanel()          // → Build UI elements
sendControl(command)   // → Send to background
updateStatus()         // → Check Netflix connection
dragStart/drag/dragEnd // → Repositioning
```

### Styling (styles/panel.css)
**Role**: Visual Design

**Features**:
- Netflix-themed colors (#e50914)
- Smooth animations
- Semi-transparent background
- Hover effects
- Responsive layout
- High z-index (always on top)

## Data Flow Patterns

### 1. User-Initiated Control
```
User Input → Panel UI → Background → Netflix Controller → Video Element
```

### 2. Status Updates
```
Panel UI → Background → Netflix Controller → Video State → Panel UI
```

### 3. Tab Detection
```
Background Worker → chrome.tabs.query() → Filter netflix.com/watch → Store tab ID
```

### 4. Position Persistence
```
Panel Drag End → chrome.storage.local.set() → Saved
Panel Load → chrome.storage.local.get() → Restore position
```

## Communication Protocol

### Message Types

#### From Panel → Background
```javascript
{
  action: 'controlNetflix',
  command: 'playPause' | 'forward' | 'backward' | 'volumeUp' | 'volumeDown'
}

{
  action: 'getNetflixTab'
  // Request current Netflix tab ID
}
```

#### From Background → Netflix
```javascript
{
  action: 'executeControl',
  command: 'playPause' | 'forward' | 'backward' | 'volumeUp' | 'volumeDown'
}

{
  action: 'getState'
  // Request player state
}
```

#### From Background → Panel
```javascript
{
  action: 'togglePanel',
  netflixTabId: number | null
}
```

## Lifecycle Events

### Extension Load
```
1. chrome.runtime.onInstalled
   └─► findNetflixTab()
   └─► Initialize state
```

### Icon Click
```
1. chrome.action.onClicked
   └─► toggleControlPanel(activeTab)
       ├─► findNetflixTab()
       ├─► chrome.scripting.executeScript()
       ├─► chrome.scripting.insertCSS()
       └─► Send toggle message
```

### Keyboard Shortcut
```
1. chrome.commands.onCommand
   └─► Get active tab
   └─► toggleControlPanel(activeTab)
```

### Tab Close
```
1. chrome.tabs.onRemoved
   └─► If Netflix tab → netflixTabId = null
   └─► Clean up state
```

### Tab Update
```
1. chrome.tabs.onUpdated
   └─► If URL = netflix.com/watch → Update netflixTabId
```

## State Management

### Background Worker State
```javascript
{
  netflixTabId: number | null,  // Current Netflix tab
  panelStates: {                // Panel visibility per tab
    [tabId]: boolean
  }
}
```

### Panel State (chrome.storage)
```javascript
{
  panelPosition: {
    x: number,  // Left position in pixels
    y: number   // Top position in pixels
  }
}
```

### Runtime State
```javascript
// In control panel
{
  isDragging: boolean,
  currentX: number,
  currentY: number,
  netflixTabId: number | null
}
```

## Error Handling

### Netflix Tab Not Found
```
Panel shows: "No Netflix Tab Found" (red indicator)
Action: Continues checking every 5 seconds
Recovery: Auto-connects when Netflix tab appears
```

### Video Element Not Found
```
Controller: Returns { error: 'Video not found' }
Action: Background retries on next command
Recovery: Works once video loads
```

### Tab Closed
```
Background: Detects tab removal
Action: Clears netflixTabId
Recovery: Auto-detects new Netflix tab
```

### Message Send Failure
```
Background: catch() on sendMessage
Action: Log error, clear tab ID
Recovery: Next command triggers re-detection
```

## Performance Considerations

### Lazy Loading
- Control panel injected only when needed
- Not present on every page by default

### Minimal Background Activity
- Event-driven (no polling loops)
- Tab detection only when needed

### Efficient DOM Operations
- Single panel instance per tab
- Reuse existing panel on toggle

### Storage Optimization
- Only save position on drag end
- Minimal data stored

## Security Considerations

### Permissions
- **tabs**: Read-only tab info
- **storage**: Isolated extension storage
- **scripting**: Controlled injection
- **Host**: Only `*.netflix.com/*`

### Content Script Isolation
- Runs in isolated world
- No access to page JavaScript
- Only DOM manipulation

### Message Validation
- Check message source
- Validate command types
- Handle unknown commands gracefully

## Browser API Usage

### chrome.action
- Icon clicks
- Badge text (potential)

### chrome.commands
- Keyboard shortcuts

### chrome.tabs
- Query tabs
- Send messages
- Listen for updates

### chrome.scripting
- Dynamic script injection
- CSS injection

### chrome.storage.local
- Persistent preferences
- Panel position

### chrome.runtime
- Message passing
- Extension lifecycle

## Extension Points

Want to extend Flixtrol? Here's how:

### Add New Control
1. Add button in `control-panel.js`
2. Add handler in `sendControl()`
3. Add command in `netflix-controller.js`
4. Update styling in `panel.css`

### Support Other Sites
1. Add host permission in `manifest.json`
2. Create new controller script
3. Update background detection logic
4. Add site-specific controls

### Add Settings
1. Create settings UI
2. Store in `chrome.storage.local`
3. Read in control panel
4. Apply preferences

---

**This architecture enables clean separation of concerns, easy testing, and future extensibility!**

