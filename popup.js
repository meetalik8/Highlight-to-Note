document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get({ notes: [] }, (result) => {
    const listContainer = document.getElementById("notes-list");

    result.notes.forEach((note, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "list-div";

      const newItem = document.createElement("li");
      newItem.className="list-text";
      newItem.textContent = note;
      itemDiv.appendChild(newItem);

      const copyBtn = document.createElement("button");
      copyBtn.className="cpy-btn";
      copyBtn.textContent = "Copy";
      copyBtn.addEventListener("click", () => {
        navigator.clipboard
          .writeText(note)
          .then(() => {
            console.log("Copy worked! Text added to clipboard.");
            copyBtn.textContent = "Copied!";
          })
          .catch((e) => {
            console.log("Error: ", e);
          });
      });
      itemDiv.appendChild(copyBtn);

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        chrome.storage.sync.get({ notes: [] }, (result) => {
          const beforeNotes = result.notes.slice(0, index);
          const afterNotes = result.notes.slice(index + 1);
          const updatedNotes = [...beforeNotes, ...afterNotes];

          chrome.storage.sync.set({ notes: updatedNotes }, () => {
            if (chrome.runtime.lastError) {
              console.log("Error occurred: ", chrome.runtime.lastError);
            } else {
              console.log("Note deleted!");
              itemDiv.remove();
            }
          });
        });
      });
      itemDiv.appendChild(deleteBtn);

      listContainer.appendChild(itemDiv);
    });
  });
});
