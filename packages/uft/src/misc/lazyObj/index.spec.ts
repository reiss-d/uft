import { Counter } from '../../test.utils'
import { lazyObj } from './index'

describe('misc/lazyObj', () => {
   test('only calls the function once', () => {
      const c = new Counter()
      const proxy = lazyObj(() => {
         c.inc()
         return { a: 1 }
      })

      expect(proxy.a).toBe(1)
      expect(proxy.a).toBe(1)
      expect(proxy.a).toBe(1)
      expect(c.count).toBe(1)
   })
   test('returns the first value initialized', () => {
      let obj = { a: 1 }
      const proxy = lazyObj(() => obj)

      expect(proxy.a).toBe(1)
      obj = { a: 99 }
      expect(proxy.a).toBe(1)
   })
   test('expected equality checks work', () => {
      let nested = { c: 2 }
      let obj = { a: 1, b: nested }
      const proxy = lazyObj(() => obj)

      // The proxy is not the same object as the original object.
      expect(proxy).not.toBe(obj)
      // However, the proxy is equal to the original object.
      // Cannot use `toEqual` because the proxy is actually a function.
      expect(proxy).toContainAllEntries(Object.entries(obj))
      // Properties will be the same object as their original counterparts.
      expect(proxy.b).toBe(nested)
   })
})
