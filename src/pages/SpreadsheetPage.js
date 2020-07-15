import { Page } from '@core/Page'
import { storage, debounce } from '@core/utils'
import { createStore } from '@core/createStore'
import { rootReducer } from '@store/rootReducer'
import { initailState } from '@store/initialState'
import { Spreadsheet, Header, Toolbar, Formula, Tabble } from '@components'

export class SpreadsheetPage extends Page {
  getRoot() {
    const store = createStore(rootReducer, initailState)

    const stateListener = debounce(state => {
      storage('spreadsheet-state', state)
    }, 300)

    store.subscribe(stateListener)

    this.spreadsheet = new Spreadsheet({
      components: [Header, Toolbar, Formula, Tabble],
      store
    })

    return this.spreadsheet.getRoot()
  }

  afterRender() {
    this.spreadsheet.init()
  }

  destroy() {
    this.spreadsheet.destroy()
  }
}
