import { APPLY_STYLE, CHANGE_STYLES, CHANGE_TEXT, CHANGE_TITLE, TABLE_RESIZE, UPDATE_LAST_OPENED } from './types'

export const rootReducer = (state, action) => {
  let field
  let val

  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'

      return { ...state, [field]: value(state, field, action) }

    case CHANGE_TEXT:
      field = 'dataState'

      return {
        ...state,
        currentText: action.data.value,
        [field]: value(state, field, action)
      }

    case CHANGE_STYLES:
      return { ...state, currentStyles: action.data }

    case APPLY_STYLE:
      field = 'stylesState'
      val = state[field] || {}

      action.data.ids.forEach(id => {
        val[id] = { ...val[id], ...action.data.value }
      })

      return {
        ...state,
        [field]: val,
        currentStyles: { ...state.currentStyles, ...action.data.value }
      }

    case CHANGE_TITLE:
      return { ...state, title: action.data }

    case UPDATE_LAST_OPENED:
      return { ...state, lastOpened: new Date().toJSON() }

    default:
      return state
  }
}

const value = (state, field, action) => {
  const val = state[field] || {}

  action.data.value
    ? val[action.data.id] = action.data.value
    : delete val[action.data.id]

  return val
}
