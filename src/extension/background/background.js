chrome.runtime.onMessageExternal
.addListener((request: object, sender: object, sendResponse:Function) => {
  if (request.type === 'reload') {
    chrome.runtime.reload();
    sendResponse({ reloaded: true });
  }
});
