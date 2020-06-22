import { SpreadsheetComponent } from '@core/SpreadsheetComponent'

export class Tabble extends SpreadsheetComponent {
  static className = 'spreadsheet__table'
  toHTML() {
    return `
      <div class='spreadsheet__table table'>
          <div class='table__row'>
            <div class='table__row-info'></div>
            <div class='table__row-data'>
              <div class='table__row-column'>A</div>
              <div class='table__row-column'>B</div>
              <div class='table__row-column'>C</div>
              <div class='table__row-column'>D</div>
              <div class='table__row-column'>E</div>
              <div class='table__row-column'>F</div>
            </div>
          </div>
          <div class='table__row'>
            <div class='table__row-info'>1</div>
            <div class='table__row-data'>
              <div class='table__row-cell selected' contenteditable>A1</div>
              <div class='table__row-cell' contenteditable>B1</div>
              <div class='table__row-cell' contenteditable>C1</div>
            </div>
          </div>
          <div class='table__row'>
            <div class='table__row-info'>2</div>
            <div class='table__row-data'>
              <div class='table__row-cell' contenteditable>A2</div>
              <div class='table__row-cell' contenteditable>B2</div>
              <div class='table__row-cell' contenteditable>C2</div>
            </div>
          </div>
        </div>
      `
  }
}
