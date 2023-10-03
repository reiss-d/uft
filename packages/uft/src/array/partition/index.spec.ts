import { expectTypeOf } from 'expect-type'
import { freeze } from '../../internal/builtin'
import { isFunction } from '../../is/isFunction'
import { isNumber } from '../../is/isNumber'
import { isObject } from '../../is/isObject'
import { isString } from '../../is/isString'
import { partition } from '.'

describe('array/partition', () => {
   test('works with non-primitive elements', () => {
      const a = partition(
         freeze([{ a: 1 }, { a: 'hi' }, 99]),
         isObject
      )
      expect(a).toEqual([[{ a: 1 }, { a: 'hi' }], [99]])
      expectTypeOf(a).toEqualTypeOf<
         [(({ a: number } | { a: string }) & object)[], number[]]
      >()

      const fn1 = () => {}
      const fn2 = (arg: string) => arg
      const fn3 = (arg: Record<string, string>) => arg

      const b = partition(
         freeze([fn1, fn2, fn3, { a: 1 }]),
         isFunction
      )
      expect(b).toEqual([[fn1, fn2, fn3], [{ a: 1 }]])
      expectTypeOf(b).toEqualTypeOf<
         [(typeof fn1 | typeof fn2 | typeof fn3)[], { a: number }[]]
      >()
   })

   test('works with primitive elements', () => {
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
      expectTypeOf(c).toEqualTypeOf<[never[], number[]]>()

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
