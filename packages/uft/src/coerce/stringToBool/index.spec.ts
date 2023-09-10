import { stringToBool } from '.'

describe('coerce/stringToBool', () => {
   test('`stringToBool` returns true', () => {
      expect(stringToBool('true')).toBeTrue()
      expect(stringToBool('TRUE')).toBeTrue()
      expect(stringToBool('TrUe')).toBeTrue()
      expect(stringToBool('TRUe')).toBeTrue()
   })

   test('`stringToBool` returns false', () => {
      expect(stringToBool('false')).toBeFalse()
      expect(stringToBool('trueee')).toBeFalse()
      expect(stringToBool('1')).toBeFalse()
      expect(stringToBool(null)).toBeFalse()
      expect(stringToBool(undefined)).toBeFalse()
   })
})
