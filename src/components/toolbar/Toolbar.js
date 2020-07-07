import { SpreadsheetComponent } from '@core/SpreadsheetComponent'
import { createToolbar } from './toolbar.template'
import { $ } from '@core/Dom'

export class Toolbar extends SpreadsheetComponent {
  static className = 'spreadsheet__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options
    })
  }

  toHTML() {
    return createToolbar()
  }

  onClick(e) {
    const $target = $(e.target)
    if ($target.data.type === 'button') {
      console.log($target.data.value)
    }
  }
}
