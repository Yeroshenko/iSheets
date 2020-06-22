import { $ } from '@core'

export class Spreadsheet {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.components = options.components || []
  }

  getRoot() {
    const $root = $.create('div', 'spreadsheet')

    this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el)

      $el.innerHTML = component.toHTML()
      $root.append($el)
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())
  }
}
