import { $ } from '@core/Dom'

export function Loader() {
  return $.create('div', 'loader').html(
    `
      <div class='loading'>
        <p>Загрузка</p>
        <span></span>
      </div>
    `
  )
}
