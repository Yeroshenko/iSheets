export const parse = (value = '') => {
  if (value.startsWith('=')) {
    if (value === '=') {
      return value
    }

    try {
      return eval(value.slice(1))
    } catch (e) {
      console.warn('Parse error', e.message)
    }
  }
  return value
}
