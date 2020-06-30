import { $, Emitter } from '@core'

export class Spreadsheet {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
    this.emitter = new Emitter()
  }

  getRoot() {
    const $root = $.create('div', 'spreadsheet')

    const componentOptions = {
      emitter: this.emitter
    }

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions)

      $el.html(component.toHTML())
      $root.append($el)

      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())

    this.components.forEach(component => component.init())
  }
}
