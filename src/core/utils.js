export const capitalize = str => {
  if (typeof str !== 'string') return ''

  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const range = (start, end) => {
  if (start > end) [end, start] = [start, end]

  return new Array(end - start + 1).fill('').map((_, index) => start + index)
}

export const storage = (key, data = null) => {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }

  localStorage.setItem(key, JSON.stringify(data))
}

export const isEqual = (a, b) => {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }

  return a === b
}
