export class DesignLog {
  constructor() {
    this.logs = [];
    this.maxLogs = 10;
  }

  addEntry(originalText, summary) {
    const entry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      originalLength: originalText.length,
      summaryLength: summary.length,
      compressionRatio: ((summary.length / originalText.length) * 100).toFixed(1),
      summary
    };

    this.logs.unshift(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }

    return entry;
  }

  getFormattedTime(timestamp) {
    return new Date(timestamp).toLocaleTimeString();
  }

  generateLogHTML() {
    if (this.logs.length === 0) {
      return '<p class="text-gray-500 text-center py-4">No summaries generated yet</p>';
    }

    return this.logs.map(log => `
      <div class="border-b border-gray-200 last:border-0 py-4">
        <div class="flex justify-between items-start mb-2">
          <div class="text-sm text-gray-600">
            ${this.getFormattedTime(log.timestamp)}
          </div>
          <div class="flex gap-2 text-xs">
            <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded">
              ${log.originalLength} chars → ${log.summaryLength} chars
            </span>
            <span class="px-2 py-1 bg-green-100 text-green-800 rounded">
              ${log.compressionRatio}% of original
            </span>
          </div>
        </div>
        <p class="text-gray-800">${log.summary}</p>
      </div>
    `).join('');
  }
}