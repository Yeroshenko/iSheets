import { SpreadsheetComponent } from '@core'
import { createTable } from './table.template'

export class Tabble extends SpreadsheetComponent {
  static className = 'spreadsheet__table'

  toHTML() {
    return createTable(128)
  }
}
