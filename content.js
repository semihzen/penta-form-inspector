let lastForm = null;

document.addEventListener('submit', function (event) {
  const form = event.target;

  if (form.tagName.toLowerCase() !== 'form') return;

  event.preventDefault();
  lastForm = form;

  const action = form.action || window.location.href;
  const method = form.method.toUpperCase() || 'GET';

  const formData = new FormData(form);
  const dataObject = {};
  for (let [key, value] of formData.entries()) {
    dataObject[key] = value;
  }

  const popupUrl = chrome.runtime.getURL(
    `popup.html?action=${encodeURIComponent(action)}&method=${method}&data=${encodeURIComponent(JSON.stringify(dataObject))}`
  );

  chrome.runtime.sendMessage({ type: 'formOpened', url: popupUrl });
}, true);

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'submitForm' && lastForm) {
    console.log("✅ Form is sending...");
    lastForm.submit();
    sendResponse({ status: "submitted" }); // ✅ now it works
  }

  if (msg.type === 'cancelForm') {
    console.log("⚠️ Form submission cancelled.");
    sendResponse({ status: "cancelled" }); // ✅ now it works
  }

  return true; // ✅ to keep the message port open
});

