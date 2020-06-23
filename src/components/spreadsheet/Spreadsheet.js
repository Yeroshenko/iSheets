import { $ } from '@core'

export class Spreadsheet {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
  }

  getRoot() {
    const $root = $.create('div', 'spreadsheet')

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      // DEBUGG
      if (component.name) {
        window['c' + component.name] = component
      }

      $el.html(component.toHTML())
      $root.append($el)

      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())

    this.components.forEach(component => component.init())
    console.log(this.components)
  }
}
