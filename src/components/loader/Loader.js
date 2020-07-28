import { $ } from '@core/Dom'

export function Loader() {
  return $.create('div', 'loader').html(
    `
      <div class='loading'>
        <p>Loading</p>
        <span></span>
      </div>
    `
  )
}
