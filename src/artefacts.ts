import { getLocal, setLocal, exportCSV } from "./shared";

let artefactGoals: Record<string, number> = {};

export function initArtefactTracker() {
  artefactGoals = getLocal("artefactTracker_data", {});
  updateUI();
}

export function handleArtefactChat(_line: string) {
  // For future use — optional hooks for chat-based artifact triggers
}

function updateUI() {
  const container = document.getElementById("artefact-ui");
  if (!container) return;
  container.innerHTML = "<h5>Artefact Calculator</h5><ul>" +
    Object.entries(artefactGoals)
      .map(([k, v]) => `<li>${k}: ${v}</li>`)
      .join("") + "</ul>";
}

export function exportArtefactData() {
  exportCSV(artefactGoals, "artefacts.csv");
}

export function resetArtefactData() {
  artefactGoals = {};
  setLocal("artefactTracker_data", artefactGoals);
  updateUI();
}
