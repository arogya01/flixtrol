// Netflix Controller Content Script
// This script runs on Netflix pages and controls the video player

(function() {
  'use strict';
  
  console.log('Netflix controller loaded');
  
  // Get video element
  function getVideoElement() {
    return document.querySelector('video');
  }
  
  // Simulate keyboard event (Netflix responds to these)
  function simulateKeyPress(key, keyCode) {
    const events = ['keydown', 'keypress', 'keyup'];
    events.forEach(eventType => {
      const event = new KeyboardEvent(eventType, {
        key: key,
        keyCode: keyCode,
        code: key,
        which: keyCode,
        bubbles: true,
        cancelable: true
      });
      document.dispatchEvent(event);
    });
  }
  
  // Control functions
  const controls = {
    playPause: () => {
      const video = getVideoElement();
      if (!video) return { error: 'Video not found' };
      
      // Netflix responds well to spacebar/k key
      simulateKeyPress(' ', 32);
      
      // Backup method: direct control
      setTimeout(() => {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      }, 50);
      
      return { success: true, state: video.paused ? 'paused' : 'playing' };
    },
    
    volumeUp: () => {
      const video = getVideoElement();
      if (!video) return { error: 'Video not found' };
      
      // Netflix responds to up arrow key for volume
      simulateKeyPress('ArrowUp', 38);
      
      // Backup: direct volume control
      setTimeout(() => {
        video.volume = Math.min(1.0, video.volume + 0.1);
        video.dispatchEvent(new Event('volumechange'));
      }, 50);
      
      return { success: true, volume: video.volume };
    },
    
    volumeDown: () => {
      const video = getVideoElement();
      if (!video) return { error: 'Video not found' };
      
      // Netflix responds to down arrow key for volume
      simulateKeyPress('ArrowDown', 40);
      
      // Backup: direct volume control
      setTimeout(() => {
        video.volume = Math.max(0.0, video.volume - 0.1);
        video.dispatchEvent(new Event('volumechange'));
      }, 50);
      
      return { success: true, volume: video.volume };
    },
    
    forward: () => {
      const video = getVideoElement();
      if (!video) return { error: 'Video not found' };
      
      // Method 1: Simulate right arrow key (Netflix's native shortcut)
      simulateKeyPress('ArrowRight', 39);
      
      // Method 2: Direct time manipulation as backup
      setTimeout(() => {
        const newTime = video.currentTime + 10;
        if (newTime <= video.duration) {
          video.currentTime = newTime;
          video.dispatchEvent(new Event('seeking'));
          video.dispatchEvent(new Event('seeked'));
          video.dispatchEvent(new Event('timeupdate'));
        }
      }, 50);
      
      return { success: true, currentTime: video.currentTime };
    },
    
    backward: () => {
      const video = getVideoElement();
      if (!video) return { error: 'Video not found' };
      
      // Method 1: Simulate left arrow key (Netflix's native shortcut)
      simulateKeyPress('ArrowLeft', 37);
      
      // Method 2: Direct time manipulation as backup
      setTimeout(() => {
        const newTime = video.currentTime - 10;
        if (newTime >= 0) {
          video.currentTime = newTime;
          video.dispatchEvent(new Event('seeking'));
          video.dispatchEvent(new Event('seeked'));
          video.dispatchEvent(new Event('timeupdate'));
        }
      }, 50);
      
      return { success: true, currentTime: video.currentTime };
    },
    
    getState: () => {
      const video = getVideoElement();
      if (!video) return { error: 'Video not found' };
      
      return {
        success: true,
        paused: video.paused,
        volume: video.volume,
        currentTime: video.currentTime,
        duration: video.duration
      };
    }
  };
  
  // Listen for control messages
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'executeControl') {
      const command = message.command;
      if (controls[command]) {
        const result = controls[command]();
        sendResponse(result);
      } else {
        sendResponse({ error: 'Unknown command' });
      }
      return true;
    }
    
    if (message.action === 'getState') {
      const state = controls.getState();
      sendResponse(state);
      return true;
    }
  });
  
})();

