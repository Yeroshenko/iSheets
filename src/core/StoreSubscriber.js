import { isEqual } from './utils'

export class StoreSubscriber {
  constructor(store) {
    this.store = store
    this.sub = null
    this.prevState = {}
  }

  subscribeComponents(components) {
    this.prevState = this.store.getState()

    this.sub = this.store.subscribe(state => {
      Object.keys(state).map(key => {
        if (!isEqual(this.prevState[key], state[key])) {
          components.map(component => {
            if (component.isWatching(key)) {
              const changes = { [key]: state[key] }
              component.storeChanged(changes)
            }
          })
        }
      })

      this.prevState = this.store.getState()
    })
  }

  unsubscribeFromStore(components) {
    this.sub.unsubscribe()
  }
}
