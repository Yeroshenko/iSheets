import { debounce } from '@core/utils'

export class StateProcessor {
  constructor(client, delay = 300) {
    this.listen = debounce(this.listen.bind(this), delay)
    this.client = client
  }

  listen(state) {
    this.client.save(state)
  }

  get() {
    return this.client.get()
  }
}
