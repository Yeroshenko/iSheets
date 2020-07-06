import { TABLE_RESIZE, CHANGE_TEXT } from './types'

// action creators
export const tableResize = data => ({ type: TABLE_RESIZE, data })

export const changeText = data => ({ type: CHANGE_TEXT, data })
