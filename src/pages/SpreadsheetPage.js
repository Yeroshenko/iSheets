import { Page } from '@core/page/Page'
import { createStore } from '@core/store/createStore'
import { rootReducer } from '@store/rootReducer'
import { normalizeInitialState } from '@store/initialState'
import { Spreadsheet, Header, Toolbar, Formula, Tabble } from '@components'
import { StateProcessor } from '@core/page/StateProcessor'
import { LocalStorageClient } from '@pages/common/LocalStorageClient'

export class SpreadsheetPage extends Page {
  constructor(param) {
    super(param)

    this.storeSub = null
    this.processor = new StateProcessor(new LocalStorageClient(this.params))
  }

  async getRoot() {
    const state = await this.processor.get()
    const store = createStore(rootReducer, normalizeInitialState(state))

    this.storeSub = store.subscribe(this.processor.listen)

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
    this.storeSub.unsubscribe()
  }
}
