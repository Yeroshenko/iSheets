export const createStore = (rootReducer, initialState = {}) => {
  let state = rootReducer({ ...initialState }, { type: '__INIT__' })
  let listeners = []

  return {
    subscribe(fn) {
      listeners.push(fn)

      return () => {
        listeners = listeners.filter(listener => listener !== fn)
      }
    },

    dispatch(action) {
      state = rootReducer(state, action)
      listeners.map(listener => listener(state))
    },

    getState() {
      return state
    }
  }
}
// переписать на класс
