import { storage } from '@core/utils'
import { createStore } from '@core/createStore'
import { rootReducer } from '@store/rootReducer'
import { Spreadsheet, Header, Toolbar, Formula, Tabble } from '@components'

import './styles/index.sass'

const store = createStore(rootReducer, storage('spreadsheet-state'))

store.subscribe(state => {
  console.log('App state-->', state)
  storage('spreadsheet-state', state)
})

const spreadsheet = new Spreadsheet('#app', {
  components: [Header, Toolbar, Formula, Tabble],
  store
})

spreadsheet.render()

window.store = store
