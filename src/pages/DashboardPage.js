import { $ } from '@core/Dom'
import { Page } from '@core/Page'
import plusIcon from '@/assets/icons/plus.svg'

export class DashboardPage extends Page {
  getRoot() {
    return $.create('div', 'dashboard').html(`
      <div class="dashboard__header">
        <h1>iSheets</h1>
      </div>
      <div class="dashboard__wrapper">
        <div class="dashboard__tables">
          <div class="dashboard__table-creator">
            <img src="${plusIcon}" alt="plus icon">
          </div>
          <div class="dashboard__table">
            <div class="dashboard__table-name">
              Новая таблица
            </div>
            <div class="dashboard__table-date">
              Дата открытия: <span>17.07.2020</span>
            </div>
          </div>
        </div>
      </div>
    `)
  }
}
