import { $ } from '@core/Dom'
import { Page } from '@core/Page'

export class DashboardPage extends Page {
  getRoot() {
    return $.create('div', 'dashboard').html(`
      <h1>Dashboard page</h1>
    `)
  }
}
