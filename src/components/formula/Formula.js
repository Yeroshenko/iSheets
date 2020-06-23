import { SpreadsheetComponent } from '@core/SpreadsheetComponent'

export class Formula extends SpreadsheetComponent {
  static className = 'spreadsheet__formula'

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input']
    })
  }

  toHTML() {
    return `
      <div class='spreadsheet__formula-label'>fx</div>
      <div class='spreadsheet__formula-input' contenteditable spellcheck='false'></div>
    `
  }

  onInput(e) {
    console.log('this.$root', '-->', this.$root)
    console.log('Formula onInput', '-->', e.target.textContent.trim())
  }
}
