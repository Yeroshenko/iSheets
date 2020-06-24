import { SpreadsheetComponent } from '@core'
import { createTable } from './table.template'

export class Tabble extends SpreadsheetComponent {
  static className = 'spreadsheet__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['click', 'mousedown', 'mouseup', 'mousemove']
    })
  }

  toHTML() {
    return createTable(128)
  }

  onClick(e) {
    console.log('--> click <--', e.target)
  }

  onMouseup() {
    console.log('--> up <--')
  }

  onMousedown() {
    console.log('--> down <--')
  }

  onMousemove() {
    console.log('--> move <--')
  }
}
