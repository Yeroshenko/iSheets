import { SpreadsheetComponent } from '@core/SpreadsheetComponent'
import { $ } from '@core'

export class Formula extends SpreadsheetComponent {
  static className = 'spreadsheet__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }

  toHTML() {
    return `
      <div class='spreadsheet__formula-label'>fx</div>
      <div class='spreadsheet__formula-input' contenteditable spellcheck='false'></div>
    `
  }

  init() {
    super.init()
    this.$formula = this.$root.find('div[contenteditable]')

    this.$on('table:select', $cell => this.$formula.text($cell.text()))
    this.$on('table:input', $cell => this.$formula.text($cell.text()))
  }

  onInput(e) {
    this.$emit('formula:input', $(e.target).text())
  }

  onKeydown(e) {
    const keys = ['Enter', 'Tab']

    if (keys.includes(e.key)) {
      e.preventDefault()
      this.$emit('formula:pressEnter')
    }
  }
}
