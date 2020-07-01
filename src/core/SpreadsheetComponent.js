import { DomListener } from '@core/DomListener'

export class SpreadsheetComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
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
    const unsub = this.emitter.emit(event, ...args)

    this.unsubscribers.push(unsub)
  }

  // subscribe to events
  $on(event, fn) {
    this.emitter.subscribe(event, fn)
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
