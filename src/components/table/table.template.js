const CODES = { A: 65, Z: 90 }

const createCell = (_, col) => {
  return `
    <div class='table__row-cell' contenteditable data-col='${col}'></div>
  `
}

const createCol = (col, index) => {
  return `
    <div class='table__row-column column' data-type='resizable' data-col='${index}'>
      ${col}
      <div class='column__resize' data-resize='col'></div>
    </div>
  `
}

const createRow = (index, content) => {
  const resize = index
    ? `<div class='row__resize' data-resize='row'></div>`
    : ''

  return `
    <div class='table__row row' data-type='resizable'>
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
