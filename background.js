let popupWindowId = null;
let lastFormTabId = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'formOpened' && sender.tab?.id) {
    lastFormTabId = sender.tab.id;
    chrome.windows.create({
      url: message.url,
      type: "popup",
      width: 420,
      height: 650
    }, (popupWindow) => {
      popupWindowId = popupWindow.id;
    });
  }

  if (message.type === 'submitForm' || message.type === 'cancelForm') {
    if (lastFormTabId != null) {
      chrome.tabs.sendMessage(lastFormTabId, { type: message.type }, () => {
        if (chrome.runtime.lastError) {
          console.warn("⚠️ Content script not reachable:", chrome.runtime.lastError.message);
        } else {
          console.log("Message sent to content.js.");
        }
      });
    } else {
      console.warn(" submitForm was called but tabId is unknown.");
    }

    popupWindowId = null;
  }
});
