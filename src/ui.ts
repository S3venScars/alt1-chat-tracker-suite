import { exportComponentData, resetComponentData } from "./component";
import { exportArtefactData, resetArtefactData } from "./artefacts";
import { exportSerenData, resetSerenData } from "./seren";

export function initUI() {
  const exportBtn = document.createElement("button");
  exportBtn.textContent = "📤 Export All";
  exportBtn.className = "nisbutton m-1";
  exportBtn.onclick = () => {
    exportComponentData();
    exportArtefactData();
    exportSerenData();
  };

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "🔁 Reset All";
  resetBtn.className = "nisbutton m-1";
  resetBtn.onclick = () => {
    if (confirm("Reset all trackers and clear all data?")) {
      resetComponentData();
      resetArtefactData();
      resetSerenData();
      location.reload();
    }
  };

  const controlBar = document.createElement("div");
  controlBar.className = "d-flex justify-content-end gap-2 p-2";
  controlBar.appendChild(exportBtn);
  controlBar.appendChild(resetBtn);

  document.body.appendChild(controlBar);
}
