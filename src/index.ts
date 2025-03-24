import { initUI } from "./ui";
import { initComponentTracker, handleComponentChat } from "./component";
import { initArtefactTracker, handleArtefactChat } from "./artefacts";
import { initSerenTracker, handleSerenChat } from "./seren";
import { ChatReader, setupChatPolling } from "./shared";

window.onload = () => {
  // Initialize all tabs and UI
  initUI();

  // Initialize all trackers
  initComponentTracker();
  initArtefactTracker();
  initSerenTracker();

  // Set up shared chat polling
  const reader = new ChatReader();
  setupChatPolling(reader, (chatLine) => {
    handleComponentChat(chatLine);
    handleArtefactChat(chatLine);
    handleSerenChat(chatLine);
  });
};
