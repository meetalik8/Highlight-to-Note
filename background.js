chrome.runtime.onInstalled.addListener(async () => {
  chrome.action.setBadgeText({
    text: "ON",
  });

  // Context Menu is basically all that you see when you right click on a webpage
  // here adding a selection context to make it visible on selecting something
  chrome.contextMenus.create({
    id: "save-highlight",
    title: "Save Highlight",
    type: "normal",
    contexts: ["selection"],
  });
});


chrome.contextMenus.onClicked.addListener((info) => {
  const text_to_save = info.selectionText;
  console.log(`Debugging: ${text_to_save}`);

  chrome.storage.sync.get({ notes: [] }, (result) => {
    const updatedNotes = [...result.notes, text_to_save];
    chrome.storage.sync.set({ notes: updatedNotes }, () => {
      console.log("Note saved!");
      console.log("All notes", updatedNotes);
    });
  });
});
