chrome.runtime.onInstalled.addListener(function() {
    console.log("Extension Installed");
  });
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "pasteImage") {
      chrome.tabs.sendMessage(sender.tab.id, { action: "pasteImage" });
    }
  });
  