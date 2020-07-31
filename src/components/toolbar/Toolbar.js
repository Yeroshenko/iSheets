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
    const dataType = $target.data.type

    if (dataType === 'button') {
      const value = JSON.parse($target.data.value)
      this.$emit('toolbar:applyStyle', value)
    }

    //  select wrap because .spreadsheet__toolbar-button has margin-right: 4px
    if (dataType === 'select-button' || 'backdrop' || 'select-wrap') {
      $target.toggleClass('active')
      $($target.parent).toggleClass('is-open')
    }
  }
}
