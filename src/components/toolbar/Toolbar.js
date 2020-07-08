import { SpreadsheetState } from '@core/SpreadsheetState'
import { $ } from '@core/Dom'

import { createToolbar } from './toolbar.template'

export class Toolbar extends SpreadsheetState {
  static className = 'spreadsheet__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options
    })
  }

  prepare() {
    const initialState = {
      textAlign: 'left',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none'
    }
    this.initState(initialState)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  onClick(e) {
    const $target = $(e.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)

      const key = Object.keys(value)[0]

      this.setState({ [key]: value[key] })
      console.log(this.state)
    }
  }
}
