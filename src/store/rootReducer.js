import { TABLE_RESIZE } from './types'

export const rootReducer = (state, action) => {
  let prevState

  switch (action.type) {
    case TABLE_RESIZE:
      prevState = state.colState || {}
      prevState[action.data.id] = action.data.value

      return { ...state, colState: prevState }

    default:
      return state
  }
}
