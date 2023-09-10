import { removeLast } from '.'

describe('array/removeLast', () => {
   test('removeLast', () => {
      const a = [1, 2, 3, 4, 5]
      expect(removeLast(a, (v) => v > 2)).toBe(3)
      expect(a).toEqual([1, 2, 4, 5])

      const b = ['foo', 'bar', 'baz']
      expect(removeLast(b, (v) => v === 'foo')).toBe('foo')
      expect(b).toEqual(['bar', 'baz'])

      const c = [1, 2, 3, 4, 5]
      expect(removeLast(c, (v) => (v * 100) < 10)).toBeUndefined()
      expect(c).toEqual([1, 2, 3, 4, 5])

      const d = [{ foo: 1 }, { bar: 1 }]
      expect(
         removeLast(d, (v) => {
            return 'bar' in v
         })
      ).toEqual({ bar: 1 })
      expect(d).toEqual([{ foo: 1 }])
   })
})
