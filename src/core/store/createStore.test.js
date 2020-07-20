import { createStore } from './createStore'

describe('TEST', () => {
  const store = createStore()
  test('temp', () => {
    expect(store).toBeDefined()
  })
})
