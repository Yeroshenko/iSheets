import { TABLE_RESIZE, CHANGE_TEXT, CHANGE_STYLES, APPLY_STYLE } from './types'

export const rootReducer = (state, action) => {
  let field
  let val

  console.log('ACTION:', action)
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

    default:
      return state
  }
}

const value = (state, field, action) => {
  const val = state[field] || {}
  val[action.data.id] = action.data.value
  return val
}
