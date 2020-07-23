export const parse = (value = '') => {
  if (value.startsWith('=')) {
    if (value === '=') {
      return value
    }

    try {
      const res = eval(value.slice(1))
      return res
    } catch (e) {
      console.warn('Parse error', e.message)
    }
  }
  return value
}
