import { SpreadsheetComponent, $ } from '@core'

import { TableSelection } from './TableSelection'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { shouldResize, isCell } from './table.functions'

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

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root)
    }

    if (isCell(event)) {
      console.log(event.shiftKey)

      const $cell = $(event.target)
      this.selection.select($cell)
    }
  }
}
