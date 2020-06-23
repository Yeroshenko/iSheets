const CODES = { A: 65, Z: 90 }

const createCell = () => {
  return `
    <div class='table__row-cell' contenteditable></div>
  `
}

const createCol = col => {
  return `
    <div class='table__row-column'>${col}</div>
  `
}

const createRow = (index, content) => {
  return `
    <div class='table__row'>
      <div class='table__row-info'>${index ? index : ''}</div>
      <div class='table__row-data'>${content}</div>
    </div>
  `
}

const tableWrap = (content, className) =>
  `<div class=${className}>${content}</div>`

const toChar = (_, index) => String.fromCharCode(CODES.A + index)

export const createTable = (rowsCount = 20) => {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  // create empty array -> put a letter in an array cell -> letter to column -> array to string
  const cols = new Array(colsCount).fill('').map(toChar).map(createCol).join('')

  rows.push(createRow(null, cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(createCell).join('')

    rows.push(createRow(i + 1, cells))
  }

  return tableWrap(rows.join(''), 'table')
}
