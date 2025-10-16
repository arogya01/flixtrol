// Background service worker for Netflix Remote Control Extension

let netflixTabId = null;
let panelStates = {}; // Track panel visibility per tab

// Find Netflix tab
async function findNetflixTab() {
  const tabs = await chrome.tabs.query({});
  for (const tab of tabs) {
    if (tab.url && tab.url.includes('netflix.com/watch')) {
      netflixTabId = tab.id;
      return tab.id;
    }
  }
  return null;
}

// Handle extension icon click
chrome.action.onClicked.addListener(async (tab) => {
  await toggleControlPanel(tab.id);
});

// Handle keyboard shortcut
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'toggle-panel') {
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (activeTab) {
      await toggleControlPanel(activeTab.id);
    }
  }
});

// Toggle control panel on current tab
async function toggleControlPanel(tabId) {
  try {
    // Find Netflix tab
    await findNetflixTab();
    
    if (!netflixTabId) {
      console.warn('No Netflix tab found');
      // Still allow panel to show with a warning
    }
    
    // Try to send toggle message first (if script already injected)
    try {
      await chrome.tabs.sendMessage(tabId, { 
        action: 'togglePanel',
        netflixTabId: netflixTabId
      });
      console.log('Panel toggled via message');
    } catch (messageError) {
      // Script not injected yet, inject it now
      console.log('Injecting control panel for the first time');
      
      // Inject CSS first
      await chrome.scripting.insertCSS({
        target: { tabId: tabId },
        files: ['styles/panel.css']
      });
      
      // Then inject script (which will create and show the panel)
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['scripts/control-panel.js']
      });
      
      // Send initial Netflix tab info
      await chrome.tabs.sendMessage(tabId, { 
        action: 'togglePanel',
        netflixTabId: netflixTabId
      });
    }
    
  } catch (error) {
    console.error('Error toggling panel:', error);
  }
}

// Message routing between control panel and Netflix tab
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getNetflixTab') {
    // Return Netflix tab ID
    findNetflixTab().then(tabId => {
      sendResponse({ netflixTabId: tabId });
    });
    return true; // Keep channel open for async response
  }
  
  if (message.action === 'controlNetflix') {
    // Forward control command to Netflix tab
    if (!netflixTabId) {
      findNetflixTab().then(tabId => {
        if (tabId) {
          chrome.tabs.sendMessage(tabId, {
            action: 'executeControl',
            command: message.command
          }).catch(err => console.error('Error sending to Netflix:', err));
        }
      });
    } else {
      chrome.tabs.sendMessage(netflixTabId, {
        action: 'executeControl',
        command: message.command
      }).catch(err => {
        console.error('Error sending to Netflix:', err);
        // Netflix tab might have closed, try to find it again
        netflixTabId = null;
        findNetflixTab();
      });
    }
    sendResponse({ success: true });
    return true;
  }
  
  if (message.action === 'getPlayerState') {
    // Request player state from Netflix tab
    if (netflixTabId) {
      chrome.tabs.sendMessage(netflixTabId, {
        action: 'getState'
      }).then(response => {
        sendResponse(response);
      }).catch(err => {
        console.error('Error getting state:', err);
        sendResponse({ error: 'Netflix tab not found' });
      });
      return true;
    } else {
      sendResponse({ error: 'Netflix tab not found' });
    }
  }
});

// Monitor tab changes
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url && changeInfo.url.includes('netflix.com/watch')) {
    netflixTabId = tabId;
  }
});

// Handle tab closure
chrome.tabs.onRemoved.addListener((tabId) => {
  if (tabId === netflixTabId) {
    netflixTabId = null;
  }
  delete panelStates[tabId];
});

// Initialize on install
chrome.runtime.onInstalled.addListener(() => {
  console.log('Flixtrol extension installed');
  findNetflixTab();
});

