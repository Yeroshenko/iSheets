import { storage } from '@core/utils'

const defaultState = {
  rowState: {},
  colState: {}
}

export const initailState = storage('spreadsheet-state')
  ? storage('spreadsheet-state')
  : defaultState
