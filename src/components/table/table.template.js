const CODES = { A: 65, Z: 90 }
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

const getWidth = (state, index) => (state[index] || DEFAULT_WIDTH) + 'px'
const getHeight = (state, index) => (state[index] || DEFAULT_HEIGHT) + 'px'

const createCell = (row, state) => {
  return (_, col) => {
    const id = `${row}:${col}`
    const text = state.dataState[id]
    const width = getWidth(state.colState, col)

    return `
      <div
        class='table__row-cell'
        contenteditable
        spellcheck='false'
        data-type='cell'
        data-col='${col}'
        data-id='${id}'
        style='width: ${width}'
      >${text || ''}</div>
    `
  }
}

const createCol = ({ col, index, width }) => {
  return `
    <div
      class='table__row-column column'
      data-type='resizable'
      data-col='${index}'
      style='width: ${width}'
    >
      ${col}
      <div class='column__resize' data-resize='col'></div>
    </div>
  `
}

const createRow = (index, content, state) => {
  const resize = index
    ? `<div class='row__resize' data-resize='row'></div>`
    : ''

  const height = getHeight(state, index)

  return `
    <div
      class='table__row row'
      data-type='resizable'
      data-row='${index}'
      style='height: ${height}'
    >
      <div class='table__row-info'>
        ${index ? index : ''}
        ${resize}
      </div>
      <div class='table__row-data'>${content}</div>
    </div>
  `
}

const tableWrap = (content, className) =>
  `<div class=${className}>${content}</div>`

const toChar = (_, index) => String.fromCharCode(CODES.A + index)

const withWidthFrom = state => {
  return (col, index) => {
    return { col, index, width: getWidth(state.colState, index) }
  }
}

export const createTable = (rowsCount = 20, state = {}) => {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  // create empty array -> put a letter in an array cell -> letter to column -> array to string
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state))
    .map(createCol)
    .join('')

  rows.push(createRow(null, cols, {}))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(createCell(row, state))
      .join('')

    rows.push(createRow(row + 1, cells, state.rowState))
  }

  return tableWrap(rows.join(''), 'table')
}
