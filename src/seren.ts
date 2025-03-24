import { getLocal, setLocal, exportCSV } from "./shared";

let serenData: Record<string, number> = {};

export function initSerenTracker() {
  serenData = getLocal("serenTracker_data", {});
  updateUI();
}

export function handleSerenChat(line: string) {
  const match = line.match(/You (?:find|receive) (\d+) x (.+?) from the Seren Spirit/i);
  if (!match) return;

  const [, qtyStr, item] = match;
  const qty = parseInt(qtyStr);
  if (!item || isNaN(qty)) return;

  serenData[item] = (serenData[item] || 0) + qty;
  setLocal("serenTracker_data", serenData);
  updateUI();
}

function updateUI() {
  const container = document.getElementById("seren-ui");
  if (!container) return;
  container.innerHTML = "<h5>Seren Spirit Logger</h5><ul>" +
    Object.entries(serenData)
      .map(([k, v]) => `<li>${k}: ${v}</li>`)
      .join("") + "</ul>";
}

export function exportSerenData() {
  exportCSV(serenData, "seren_spirits.csv");
}

export function resetSerenData() {
  serenData = {};
  setLocal("serenTracker_data", serenData);
  updateUI();
}
