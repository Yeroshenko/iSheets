import { TABLE_RESIZE, CHANGE_TEXT } from './types'

export const rootReducer = (state, action) => {
  let prevState
  let field

  console.log('ACTION:', action)
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'

      prevState = state[field] || {}
      prevState[action.data.id] = action.data.value

      return { ...state, [field]: prevState }

    case CHANGE_TEXT:
      prevState = state['dataState'] || {}
      prevState[action.data.id] = action.data.text

      return { ...state, currentText: action.data.text, dataState: prevState }

    default:
      return state
  }
}
