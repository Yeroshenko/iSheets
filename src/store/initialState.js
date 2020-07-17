import { defaultCellStyles, defaultTitle } from '@/constants'
import { clone } from '@core/utils'

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultCellStyles
}

const normalize = state => ({
  ...state,
  currentStyles: defaultState,
  currentText: ''
})

export const normalizeInitialState = state => {
  return state ? normalize(state) : clone(defaultState)
}
