import { capitalize } from './utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided from DomListener')
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.map(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(
          `Method ${method} is not implimented in ${this.name} Component`
        )
      }
      // fix for remove listeners
      this[method] = this[method].bind(this)

      // addEventListener 2.0
      this.$root.on(listener, this[method])
    })
  }

  removeDOMListeners() {
    this.listeners.map(listener => {
      const method = getMethodName(listener)

      // removeEventListener 2.0
      this.$root.off(listener, this[method])
    })
  }
}

// input => onInput
const getMethodName = eventName => {
  return 'on' + capitalize(eventName)
}
