export class Emitter {
  // https://refactoring.guru/ru/design-patterns/observer

  constructor() {
    this.listeners = {}
  }

  // notifies subscribers
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }

    this.listeners[event].forEach(listener => {
      listener(...args)
    })

    return true
  }

  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)

    return () => {
      this.listeners[event] = this.listeners[event].filter(
        listener => listener !== fn
      )
    }
  }
}
