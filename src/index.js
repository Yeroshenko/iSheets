import { Router } from '@core/routes'
import { DashboardPage, SpreadsheetPage } from '@pages'
import './styles/index.sass'

new Router('#app', {
  dashboard: DashboardPage,
  spreadsheet: SpreadsheetPage
})
