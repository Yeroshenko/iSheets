import { SpreadsheetState } from '@core/SpreadsheetState'
import { $ } from '@core/Dom'

import { createToolbar } from './toolbar.template'
import { defaultCellStyles } from '@/constants'

export class Toolbar extends SpreadsheetState {
  static className = 'spreadsheet__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    })
  }

  prepare() {
    this.initState(defaultCellStyles)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  storeChanged({ currentStyles }) {
    this.setState(currentStyles)
  }

  onClick(e) {
    const $target = $(e.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      this.$emit('toolbar:applyStyle', value)

      // const key = Object.keys(value)[0]
      // this.setState({ [key]: value[key] })
    }
  }
}
