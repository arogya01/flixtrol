// Control Panel Content Script
// This script creates and manages the floating control panel

(function() {
  'use strict';
  
  // Check if panel already exists (script already injected)
  if (document.getElementById('flixtrol-panel')) {
    console.log('Panel already exists, skipping re-initialization');
    return;
  }
  
  let netflixTabId = null;
  let isDragging = false;
  let currentX = 0;
  let currentY = 0;
  let initialX = 0;
  let initialY = 0;
  
  // Create control panel HTML
  const panel = document.createElement('div');
  panel.id = 'flixtrol-panel';
  panel.className = 'flixtrol-container';
  panel.innerHTML = `
    <div class="flixtrol-header" id="flixtrol-header">
      <span class="flixtrol-title">🎬 Netflix Controls</span>
      <button class="flixtrol-close" id="flixtrol-close">×</button>
    </div>
    <div class="flixtrol-status" id="flixtrol-status">
      <span class="status-indicator" id="status-indicator">●</span>
      <span id="status-text">Searching for Netflix...</span>
    </div>
    <div class="flixtrol-controls">
      <button class="flixtrol-btn" id="btn-backward" title="Rewind 10s">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
          <text x="12" y="16" font-size="8" text-anchor="middle" fill="currentColor">10</text>
        </svg>
      </button>
      <button class="flixtrol-btn flixtrol-btn-primary" id="btn-play-pause" title="Play/Pause">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" id="play-icon">
          <path d="M8 5v14l11-7z"/>
        </svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" id="pause-icon" style="display:none;">
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
        </svg>
      </button>
      <button class="flixtrol-btn" id="btn-forward" title="Forward 10s">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z"/>
          <text x="12" y="16" font-size="8" text-anchor="middle" fill="currentColor">10</text>
        </svg>
      </button>
    </div>
    <div class="flixtrol-volume">
      <button class="flixtrol-btn-small" id="btn-volume-down" title="Volume Down">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
        </svg>
      </button>
      <div class="volume-indicator" id="volume-indicator">
        <div class="volume-bar" id="volume-bar"></div>
      </div>
      <button class="flixtrol-btn-small" id="btn-volume-up" title="Volume Up">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
        </svg>
      </button>
    </div>
  `;
  
  document.body.appendChild(panel);
  
  // Get saved position or use default
  chrome.storage.local.get(['panelPosition'], (result) => {
    if (result.panelPosition) {
      panel.style.left = result.panelPosition.x + 'px';
      panel.style.top = result.panelPosition.y + 'px';
      panel.style.right = 'auto';
      panel.style.bottom = 'auto';
    }
  });
  
  // Check Netflix tab status
  async function updateStatus() {
    chrome.runtime.sendMessage({ action: 'getNetflixTab' }, (response) => {
      const statusIndicator = document.getElementById('status-indicator');
      const statusText = document.getElementById('status-text');
      
      if (response && response.netflixTabId) {
        netflixTabId = response.netflixTabId;
        statusIndicator.style.color = '#5eead4'; // Soft teal/cyan
        statusText.textContent = 'Netflix Connected';
      } else {
        netflixTabId = null;
        statusIndicator.style.color = '#ff8787'; // Soft coral
        statusText.textContent = 'No Netflix Tab Found';
      }
    });
  }
  
  updateStatus();
  setInterval(updateStatus, 5000); // Check every 5 seconds
  
  // Send control command
  function sendControl(command) {
    if (!netflixTabId) {
      updateStatus();
    }
    chrome.runtime.sendMessage({
      action: 'controlNetflix',
      command: command
    });
  }
  
  // Button event listeners
  document.getElementById('btn-play-pause').addEventListener('click', () => {
    sendControl('playPause');
    // Toggle icon
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    if (playIcon.style.display === 'none') {
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
    } else {
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
    }
  });
  
  document.getElementById('btn-forward').addEventListener('click', () => {
    sendControl('forward');
  });
  
  document.getElementById('btn-backward').addEventListener('click', () => {
    sendControl('backward');
  });
  
  document.getElementById('btn-volume-up').addEventListener('click', () => {
    sendControl('volumeUp');
    updateVolumeBar(1);
  });
  
  document.getElementById('btn-volume-down').addEventListener('click', () => {
    sendControl('volumeDown');
    updateVolumeBar(-1);
  });
  
  document.getElementById('flixtrol-close').addEventListener('click', () => {
    panel.style.display = 'none';
  });
  
  // Volume bar update (visual feedback)
  let currentVolume = 100;
  function updateVolumeBar(change) {
    currentVolume = Math.max(0, Math.min(100, currentVolume + change * 10));
    document.getElementById('volume-bar').style.width = currentVolume + '%';
  }
  
  // Dragging functionality
  const header = document.getElementById('flixtrol-header');
  
  header.addEventListener('mousedown', dragStart);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', dragEnd);
  
  function dragStart(e) {
    if (e.target.id === 'flixtrol-close') return;
    
    isDragging = true;
    initialX = e.clientX - currentX;
    initialY = e.clientY - currentY;
    
    panel.style.cursor = 'grabbing';
    header.style.cursor = 'grabbing';
  }
  
  function drag(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;
    
    // Keep panel within viewport
    const maxX = window.innerWidth - panel.offsetWidth;
    const maxY = window.innerHeight - panel.offsetHeight;
    
    currentX = Math.max(0, Math.min(currentX, maxX));
    currentY = Math.max(0, Math.min(currentY, maxY));
    
    panel.style.left = currentX + 'px';
    panel.style.top = currentY + 'px';
    panel.style.right = 'auto';
    panel.style.bottom = 'auto';
  }
  
  function dragEnd() {
    if (!isDragging) return;
    
    isDragging = false;
    panel.style.cursor = 'default';
    header.style.cursor = 'grab';
    
    // Save position
    chrome.storage.local.set({
      panelPosition: { x: currentX, y: currentY }
    });
  }
  
  // Listen for toggle messages
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'togglePanel') {
      if (message.netflixTabId) {
        netflixTabId = message.netflixTabId;
      }
      updateStatus();
      
      if (panel.style.display === 'none') {
        panel.style.display = 'block';
      } else {
        panel.style.display = 'none';
      }
      
      sendResponse({ success: true });
    }
  });
  
})();

