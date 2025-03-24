import { getLocal, setLocal, exportCSV } from "./shared";

let componentData: Record<string, number> = {};

export function initComponentTracker() {
  componentData = getLocal("componentTracker_data", {});
  updateUI();
}

export function handleComponentChat(line: string) {
  const match = line.match(/You (disassemble|scavenge).*?(\d+) x (.+?)\./i);
  if (!match) return;

  const [, , qtyStr, item] = match;
  const qty = parseInt(qtyStr);
  if (!item || isNaN(qty)) return;

  componentData[item] = (componentData[item] || 0) + qty;
  setLocal("componentTracker_data", componentData);
  updateUI();
}

function updateUI() {
  const container = document.getElementById("component-ui");
  if (!container) return;
  container.innerHTML = "<h5>Component Tracker</h5><ul>" +
    Object.entries(componentData)
      .map(([k, v]) => `<li>${k}: ${v}</li>`)
      .join("") + "</ul>";
}

export function exportComponentData() {
  exportCSV(componentData, "components.csv");
}

export function resetComponentData() {
  componentData = {};
  setLocal("componentTracker_data", componentData);
  updateUI();
}
