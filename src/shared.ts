export class ChatReader {
  private history: Set<string> = new Set();
  private lastLines: string[] = [];

  public read(): string[] {
    if (!window.alt1 || !alt1.permissionPixel) return [];
    const reader = new Chatbox.default();
    reader.readargs = { colors: [A1lib.mixColor(255, 255, 255)], backwards: true };
    reader.find();

    const lines = reader.read()?.map(x => x.text.trim()) || [];
    return lines;
  }

  public getNewLines(): string[] {
    const lines = this.read();
    const newLines = lines.filter(line => !this.history.has(line));
    newLines.forEach(line => this.history.add(line));
    return newLines;
  }
}

export function setupChatPolling(reader: ChatReader, callback: (line: string) => void) {
  setInterval(() => {
    const newLines = reader.getNewLines();
    newLines.forEach(callback);
  }, 300);
}

export function getLocal<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) || "") ?? fallback;
  } catch {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
}

export function setLocal<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function exportCSV(data: Record<string, number>, name = "tracker-export.csv") {
  let csv = "Item,Quantity\n";
  for (const key in data) {
    csv += `${key},${data[key]}\n`;
  }
  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = name;
  link.click();
}
