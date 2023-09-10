import { boolToString } from '.'

describe('coerce/boolToString', () => {
   test('`boolToString` returns "true"', () => {
      expect(boolToString(true)).toBe('true')
   })

   test('`boolToString` returns "false"', () => {
      expect(boolToString(false)).toBe('false')
      expect(boolToString(null)).toBe('false')
      expect(boolToString(undefined)).toBe('false')
   })
})
