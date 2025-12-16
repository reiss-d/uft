import { Counter } from '../../test.utils'
import { lazyFn } from './index'

describe('misc/lazyFn', () => {
   test('only calls the function once', () => {
      const c = new Counter()
      const proxy = lazyFn(() => {
         c.inc()
         return () => {
            return { a: 1 }
         }
      })

      expect(proxy().a).toBe(1)
      expect(proxy().a).toBe(1)
      expect(proxy().a).toBe(1)
      expect(c.count).toBe(1)
   })
   test('returns the first value initialized', () => {
      let fn = () => ({ a: 1 })
      const proxy = lazyFn(() => fn)

      expect(proxy().a).toBe(1)
      fn = () => ({ a: 99 })
      expect(proxy().a).toBe(1)
   })
   test('expected equality checks work', () => {
      let nested = { c: 2 }
      let fn = () => ({ a: 1, b: nested })
      const proxy = lazyFn(() => fn)

      // The proxy is not the same fn as the original fn.
      expect(proxy).not.toBe(fn)
   })
   test('can provide a constructor', () => {
      const proxy = lazyFn(() => {
         return class Foo {
            constructor(public a = 1) {}

            foo() {
               return this.a
            }
         }
      })

      expect(new proxy(1).foo()).toBe(1)
      expect(new proxy(2).foo()).toBe(2)
      expect(new proxy(3).foo()).toBe(3)
   })
   test('can provide a function', () => {
      const proxy = lazyFn(() => {
         return () => {
            return 'Hello!'
         }
      })

      expect(proxy()).toBe('Hello!')
      expect(proxy()).toBe('Hello!')
   })
})
