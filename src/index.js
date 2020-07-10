import { storage, debounce } from '@core/utils'
import { createStore } from '@core/createStore'
import { rootReducer } from '@store/rootReducer'
import { initailState } from '@store/initialState'
import { Spreadsheet, Header, Toolbar, Formula, Tabble } from '@components'

import './styles/index.sass'

const store = createStore(rootReducer, initailState)

const stateListener = debounce(state => {
  console.log('App state-->', state)
  storage('spreadsheet-state', state)
}, 300)

store.subscribe(stateListener)

const spreadsheet = new Spreadsheet('#app', {
  components: [Header, Toolbar, Formula, Tabble],
  store
})

spreadsheet.render()

window.store = store
