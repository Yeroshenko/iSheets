import { SpreadsheetComponent } from '@core'

import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { shouldResize } from './table.functions'

export class Tabble extends SpreadsheetComponent {
  static className = 'spreadsheet__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(64)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root)
    }
  }
}
