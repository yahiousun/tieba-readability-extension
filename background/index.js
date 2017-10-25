chrome.runtime.onInstalled.addListener(function (details) {
  chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, { method: 'toggle', params: { id: tab.id } }, (response) => {
      console.log(response);
    });
  })
});
