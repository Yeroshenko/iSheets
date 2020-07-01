import { SpreadsheetComponent } from '@core/SpreadsheetComponent'

export class Formula extends SpreadsheetComponent {
  static className = 'spreadsheet__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
      ...options
    })
  }

  toHTML() {
    return `
      <div class='spreadsheet__formula-label'>fx</div>
      <div class='spreadsheet__formula-input' contenteditable spellcheck='false'></div>
    `
  }

  onInput(e) {
    const text = e.target.textContent.trim()
    this.$emit('formula:input', text)
  }
}
