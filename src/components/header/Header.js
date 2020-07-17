import autosizeInput from 'autosize-input'

import { SpreadsheetComponent } from '@core/SpreadsheetComponent'
import { $ } from '@core/Dom'
import { changeTitle } from '@store/actions'
import { defaultTitle } from '@/constants'
import { debounce } from '@core/utils'
import { ActiveRoute } from '@core/routes'

export class Header extends SpreadsheetComponent {
  static className = 'spreadsheet__header' // wrapp className

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return `
      <input
        class='spreadsheet__header-input'
        id='title'
        type='text'
        value='${title}'
        placeholder='${defaultTitle}'
      />
      <div class='spreadsheet__header-buttons'>
        <button
          class='spreadsheet__header-button'
          data-btn='remove'
        >
          Удалить
        </button>
        <button
          class='spreadsheet__header-button'
          data-btn='exit'
        >
          Выйти
        </button>
      </div>
    `
  }

  init() {
    super.init()
    const input = this.$root.find('#title')

    autosizeInput(input.$el)
  }

  onInput(e) {
    const $target = $(e.target)

    this.$dispatch(changeTitle($target.text()))
  }

  onClick(e) {
    const $target = $(e.target)

    if ($target.data.btn === 'remove') {
      const decision = confirm('Реально хотите удалить?')

      if (decision) {
        localStorage.removeItem('spreadsheet:' + ActiveRoute.param)
        ActiveRoute.navigate('/')
      }
    }

    if ($target.data.btn === 'exit') {
      ActiveRoute.navigate('/')
    }
  }
}
