import { expectTypeOf } from 'expect-type'
import { removeLast } from '.'

describe('array/removeLast', () => {
   test('where argument `returnIndex` is `undefined`', () => {
      const a = [1, 2, 3, 4, 5]
      const ar = removeLast(a, (v) => v > 2)

      expectTypeOf(ar).toEqualTypeOf<number | undefined>()
      expect(ar).toBe(5)
      expect(a).toEqual([1, 2, 3, 4])

      const b = ['foo', 'bar', 'baz']
      const br = removeLast(b, (v) => v === 'foo')

      expectTypeOf(br).toEqualTypeOf<string | undefined>()
      expect(br).toBe('foo')
      expect(b).toEqual(['bar', 'baz'])

      const c = [1, 2, 3, 4, 5]
      const cr = removeLast(c, (v) => (v * 100) < 10)

      expectTypeOf(cr).toEqualTypeOf<number | undefined>()
      expect(cr).toBeUndefined()
      expect(c).toEqual([1, 2, 3, 4, 5])

      const d = [{ foo: 1 }, { bar: 1 }]
      const dr = removeLast(d, (v) => {
         return 'bar' in v
      })

      expectTypeOf(dr).toEqualTypeOf<(typeof d)[number] | undefined>()
      expect(dr).toEqual({ bar: 1 })
      expect(d).toEqual([{ foo: 1 }])
   })

   test('where argument `returnIndex` is `true`', () => {
      const a = [1, 2, 3, 4, 5]
      const ar1 = removeLast(a, (v) => v < 3, true)

      expectTypeOf(ar1).toEqualTypeOf<
         { item: number; index: number } | undefined
      >()
      expect(ar1).toEqual({ item: 2, index: 1 })
      expect(a).toEqual([1, 3, 4, 5])

      const ar2 = removeLast(a, (v) => (v * 100) < 10, true)
      expectTypeOf(ar2).toEqualTypeOf<
         { item: number; index: number } | undefined
      >()
      expect(ar2).toBeUndefined()
      expect(a).toEqual([1, 3, 4, 5])

      const ar3 = removeLast(a, (v) => v > 0, true)
      expectTypeOf(ar3).toEqualTypeOf<
         { item: number; index: number } | undefined
      >()
      expect(ar3).toEqual({ item: 5, index: 3 })
      expect(a).toEqual([1, 3, 4])

      const ar4 = removeLast(a, (v) => v === 1, true)
      expectTypeOf(ar4).toEqualTypeOf<
         { item: number; index: number } | undefined
      >()
      expect(ar4).toEqual({ item: 1, index: 0 })
      expect(a).toEqual([3, 4])
   })
})
