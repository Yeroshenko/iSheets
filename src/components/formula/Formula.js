import { SpreadsheetComponent } from '@core/SpreadsheetComponent'

export class Formula extends SpreadsheetComponent {
  static className = 'spreadsheet__formula'

  toHTML() {
    return `
      <div class='spreadsheet__formula-label'>fx</div>
      <div class='spreadsheet__formula-input' contenteditable spellcheck='false'></div>
    `
  }
}
