import { expectTypeOf } from 'expect-type'
import { removeFirst } from '.'

describe('array/removeFirst', () => {
   test('where argument `returnIndex` is `undefined`', () => {
      const a = [1, 2, 3, 4, 5]
      const ar = removeFirst(a, (v) => v > 2)

      expectTypeOf(ar).toEqualTypeOf<number | undefined>()
      expect(ar).toBe(3)
      expect(a).toEqual([1, 2, 4, 5])

      const b = ['foo', 'bar', 'baz']
      const br = removeFirst(b, (v) => v === 'foo')

      expectTypeOf(br).toEqualTypeOf<string | undefined>()
      expect(br).toBe('foo')
      expect(b).toEqual(['bar', 'baz'])

      const c = [1, 2, 3, 4, 5]
      const cr = removeFirst(c, (v) => (v * 100) < 10)

      expectTypeOf(cr).toEqualTypeOf<number | undefined>()
      expect(cr).toBeUndefined()
      expect(c).toEqual([1, 2, 3, 4, 5])

      const d = [{ foo: 1 }, { bar: 1 }]
      const dr = removeFirst(d, (v) => {
         return 'bar' in v
      })

      expectTypeOf(dr).toEqualTypeOf<(typeof d)[number] | undefined>()
      expect(dr).toEqual({ bar: 1 })
      expect(d).toEqual([{ foo: 1 }])
   })

   test('where argument `returnIndex` is `true`', () => {
      const a = [1, 2, 3, 4, 5]
      const ar1 = removeFirst(a, (v) => v > 2, true)

      expectTypeOf(ar1).toEqualTypeOf<
         { item: number; index: number } | undefined
      >()
      expect(ar1).toEqual({ item: 3, index: 2 })
      expect(a).toEqual([1, 2, 4, 5])

      const ar2 = removeFirst(a, (v) => (v * 100) < 10, true)
      expectTypeOf(ar2).toEqualTypeOf<
         { item: number; index: number } | undefined
      >()
      expect(ar2).toBeUndefined()
      expect(a).toEqual([1, 2, 4, 5])

      const b = [{ foo: 1 }, { bar: 1 }]
      const br = removeFirst(b, (v) => {
         return 'bar' in v
      }, true)

      expectTypeOf(br).toEqualTypeOf<
         { item: (typeof b)[number]; index: number } | undefined
      >()
      expect(br).toEqual({ item: { bar: 1 }, index: 1 })
      expect(b).toEqual([{ foo: 1 }])
   })

   test('where argument `returnIndex` is `boolean`', () => {
      const a = [1, 2, 3, 4, 5]
      const ar = removeFirst(a, (v) => v > 2, true as boolean)

      expectTypeOf(ar).toEqualTypeOf<
         number | { item: number; index: number } | undefined
      >()

      const b = [{ foo: 1 }, { bar: 1 }]
      const br = removeFirst(b, (v) => {
         return 'bar' in v
      }, false as boolean)

      expectTypeOf(br).toEqualTypeOf<
         | (typeof b)[number]
         | { item: (typeof b)[number]; index: number }
         | undefined
      >()
   })
})
