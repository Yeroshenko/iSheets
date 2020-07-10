export const parse = (value = '') => {
  if (value.startsWith('=')) {
    try {
      return eval(value.slice(1))
    } catch (e) {
      console.warn('Parse error', e.message)
    }
  }
  return value
}
