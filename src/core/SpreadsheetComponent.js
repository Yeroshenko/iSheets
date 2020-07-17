import { DomListener } from '@core/DomListener'

export class SpreadsheetComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribers = []

    this.prepare()
  }

  // setup component before init
  prepare() {}

  // retur tamplates
  toHTML() {
    return ''
  }

  // notify listeners about the event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // subscribe to events
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  // init component, add DOM listeners
  init() {
    this.initDOMListeners()
  }

  // remove component, remove DOM listeners
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
