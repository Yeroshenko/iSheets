import { Page } from '@core/Page'
import { storage, debounce } from '@core/utils'
import { createStore } from '@core/createStore'
import { rootReducer } from '@store/rootReducer'
import { normalizeInitialState } from '@store/initialState'
import { Spreadsheet, Header, Toolbar, Formula, Tabble } from '@components'
import { storageName } from './spreadsheet.functions'

export class SpreadsheetPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString()
    const state = storage(storageName(params))
    const store = createStore(rootReducer, normalizeInitialState(state))

    const stateListener = debounce(state => {
      storage(storageName(params), state)
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
