/* eslint-disable @typescript-eslint/no-array-constructor */
import { isPlainArray } from '.'

describe('is/isPlainArray', () => {
   test('`isPlainArray` returns true', () => {
      expect(isPlainArray([])).toBeTrue()
      expect(isPlainArray(new Array())).toBeTrue()
   })

   test('`isPlainArray` returns false', () => {
      expect(isPlainArray(Object.create(Array.prototype))).toBeFalse()
      expect(isPlainArray(Object.create({}))).toBeFalse()
      expect(isPlainArray(Object.create(null))).toBeFalse()
      expect(isPlainArray(null)).toBeFalse()

      class MyArray extends Array {}
      expect(isPlainArray(new MyArray())).toBeFalse()
      expect(isPlainArray(Object.create(MyArray.prototype))).toBeFalse()
   })
})
