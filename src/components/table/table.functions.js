import { range } from '@core'

export const shouldResize = event => event.target.dataset.resize

export const isCell = event => event.target.dataset.type === 'cell'

export const matrix = ($target, $current) => {
  const target = $target.id(true)
  const current = $current.id(true)

  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  return cols.reduce((acc, col) => {
    rows.map(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}
