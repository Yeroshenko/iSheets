import { Spreadsheet, Header, Toolbar, Formula, Tabble } from '@components'
import './styles/index.sass'

const spreadsheet = new Spreadsheet('#app', {
  components: [Header, Toolbar, Formula, Tabble]
})

spreadsheet.render()
