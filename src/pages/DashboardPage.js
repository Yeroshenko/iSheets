import { $ } from '@core/Dom'
import { Page } from '@core/Page'
import plusIcon from '@/assets/icons/plus.svg'
import { getAllRecords } from './dashboard.functions'

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString()

    return $.create('div', 'dashboard').html(`
      <div class='dashboard__header'>
        <h1>iSheets</h1>
      </div>
      <div class='dashboard__wrapper'>
        <div class='dashboard__tables'>
          <a href='#spreadsheet/${now}' class='dashboard__table-creator'>
            <img src='${plusIcon}' alt='plus icon'>
          </a>
          ${getAllRecords()}
        </div>
      </div>
    `)
  }
}
