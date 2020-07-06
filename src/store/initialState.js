import { storage } from '@core/utils'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: ''
}

export const initailState = storage('spreadsheet-state')
  ? storage('spreadsheet-state')
  : defaultState
