import { parse } from './parse'

describe('parse', () => {
  test('should return string values', () => {
    expect(parse('')).toBeDefined()
    expect(parse('test value')).toBeDefined()
    expect(typeof parse('test value')).toBe('string')
  })

  test('should return the result of the operation if it starts with "="', () => {
    expect(parse('= 1 + 2')).toBeDefined()
    expect(parse('=')).toBe('=')
    expect(parse('= 2 + 2')).toBe(4)
    expect(parse('= 3 + 3 * 3')).toBe(12)
    expect(parse('= 9 / 3')).toBe(3)
    expect(parse('= 4**4')).toBe(256)
    expect(parse('= -2 + -4')).toBe(-6)
  })
})
