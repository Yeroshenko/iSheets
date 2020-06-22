import { SpreadsheetComponent } from '@core/SpreadsheetComponent'

export class Toolbar extends SpreadsheetComponent {
  static className = 'spreadsheet__toolbar'
  toHTML() {
    return `
      <button class='spreadsheet__toolbar-button'>
        <i class='material-icons'>format_align_left</i>
      </button>
      <button class='spreadsheet__toolbar-button'>
        <i class='material-icons'>format_align_center</i>
      </button>
      <button class='spreadsheet__toolbar-button'>
        <i class='material-icons'>format_align_right</i>
      </button>
      <button class='spreadsheet__toolbar-button'>
        <i class='material-icons'>format_bold</i>
      </button>
      <button class='spreadsheet__toolbar-button'>
        <i class='material-icons'>format_italic</i>
      </button>
      <button class='spreadsheet__toolbar-button'>
        <i class='material-icons'>format_underline</i>
      </button>
    `
  }
}
