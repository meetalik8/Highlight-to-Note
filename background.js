chrome.runtime.onInstalled.addListener(async () => {
    chrome.contextMenus.create({
      title: "Save Highlight",
      type: "normal",
      contexts: ["selection"],
    });
});
