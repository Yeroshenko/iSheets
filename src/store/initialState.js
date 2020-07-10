import { storage } from '@core/utils'
import { defaultCellStyles, defaultTitle } from '@/constants'

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

export const initailState = storage('spreadsheet-state')
  ? normalize(storage('spreadsheet-state'))
  : defaultState
