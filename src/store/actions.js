import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  APPLY_STYLE,
  CHANGE_STYLES,
  CHANGE_TITLE,
  UPDATE_LAST_OPENED
} from './types'

// action creators
export const tableResize = data => ({ type: TABLE_RESIZE, data })
export const changeText = data => ({ type: CHANGE_TEXT, data })
export const applyStyle = data => ({ type: APPLY_STYLE, data })
export const changeStyles = data => ({ type: CHANGE_STYLES, data })
export const changeTitle = data => ({ type: CHANGE_TITLE, data })
export const updateLastOpened = () => ({ type: UPDATE_LAST_OPENED })
