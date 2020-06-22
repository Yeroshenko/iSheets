import { SpreadsheetComponent } from '@core/SpreadsheetComponent'

export class Header extends SpreadsheetComponent {
  static className = 'spreadsheet__header' // wrapp className

  toHTML() {
    return `
      <input class='spreadsheet__header-input' type='text' value='Новая таблица' />
      <div class='spreadsheet__header-buttons'>
        <button class='spreadsheet__header-button'>Удалить</button>
        <button class='spreadsheet__header-button'>Выйти</button>
      </div>
    `
  }
}
