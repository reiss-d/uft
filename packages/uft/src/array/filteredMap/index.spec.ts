import { expectTypeOf } from 'expect-type'
import { freeze } from '../../internal/builtin'
import { isNumber } from '../../is/isNumber'
import { filteredMap } from './index'

describe('array/filteredMap', () => {
   test('filteredMap', () => {
      const a = filteredMap(
         freeze([1, 2, 3, 4, 5]),
         (n) => n % 2 === 0,
         (n) => n * 2
      )
      expect(a).toEqual([4, 8])
      expectTypeOf(a).toEqualTypeOf<number[]>()

      const b = filteredMap(
         freeze(['foo', 2, 3, 4, 'bar']),
         isNumber,
         (v) => v ** 2
      )
      expect(b).toEqual([4, 9, 16])
      expectTypeOf(b).toEqualTypeOf<number[]>()

      const c = filteredMap(
         freeze([1, 2, 3, 4, 5]),
         (n) => n > 10,
         () => {
            throw new Error('Should not be called.')
         }
      )
      expect(c).toEqual([])
      expectTypeOf(c).toEqualTypeOf<never[]>()
   })
})
