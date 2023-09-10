import { expectTypeOf } from 'expect-type'
import { freeze } from '../../internal/builtin'
import { isNumber } from '../../is/isNumber'
import { isString } from '../../is/isString'
import { partition } from '.'

describe('array/partition', () => {
   test('partition', () => {
      const a = partition(
         freeze([1, 2, 3, 4, 5]),
         (n) => n % 2 === 0
      )
      expect(a).toEqual([[2, 4], [1, 3, 5]])
      expectTypeOf(a).toEqualTypeOf<[number[], number[]]>()

      const b = partition(
         freeze(['foo', 1, 'bar', 2]),
         isString
      )
      expect(b).toEqual([['foo', 'bar'], [1, 2]])
      expectTypeOf(b).toEqualTypeOf<[string[], number[]]>()

      const c = partition(
         freeze([1, 2, 3, 4, 5]),
         isString
      )
      expect(c).toEqual([[], [1, 2, 3, 4, 5]])
      expectTypeOf(c).toEqualTypeOf<[number[], number[]]>()

      const d = partition(
         freeze(['foo', 'bar', 'baz'] as (string | number)[]),
         isNumber
      )
      expect(d).toEqual([[], ['foo', 'bar', 'baz']])
      expectTypeOf(d).toEqualTypeOf<[number[], string[]]>()

      const e = partition(
         freeze(['foo', 'bar', 'baz']),
         isString
      )
      expect(e).toEqual([['foo', 'bar', 'baz'], []])
      expectTypeOf(e).toEqualTypeOf<[string[], never[]]>()
   })
})
