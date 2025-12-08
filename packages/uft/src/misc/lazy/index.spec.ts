import { lazy } from './index'

class Counter {
   constructor(public count = 0) {}
   inc(): number {
      this.count++
      return this.count
   }
}

describe('misc/lazy', () => {
   test('only calls the function once', () => {
      const c = new Counter()
      const a = lazy(() => {
         c.inc()
         return undefined
      })

      a()
      a()
      a()

      expect(c.count).toBe(1)
   })

   test('returns the first value initialized', () => {
      let primitive = 10
      const a = lazy(() => {
         return primitive
      })

      expect(a()).toBe(10)
      primitive = 20
      expect(a()).toBe(10)

      let object = { a: 10 }
      const b = lazy(() => {
         return object
      })

      expect(b()).toEqual({ a: 10 })
      object = { a: 20 }
      expect(b()).toEqual({ a: 10 })
   })

   test('option `shouldCache` enables caching (default behavior)', () => {
      const fn = () => ({ a: 1 })
      const a = lazy(fn, { shouldCache: () => true })

      expect(a()).toEqual({ a: 1 })

      expect(a()).toBe(a())
      expect(a()).toBe(a())

      expect(a()).not.toBe({ a: 1 })
      expect({ a: 1 }).not.toBe(a())

      const value = a()
      expect(value).toBe(a())
      expect(value).not.toBe({ a: 1 })
      expect({ a: 1 }).not.toBe(value)
   })

   test('option `shouldCache` disables caching', () => {
      const fn = () => ({ a: 1 })
      const a = lazy(fn, { shouldCache: () => false })

      expect(a()).toEqual({ a: 1 })

      expect(a()).not.toBe(a())
      expect(a()).not.toBe(a())

      expect(a()).not.toBe({ a: 1 })
      expect({ a: 1 }).not.toBe(a())

      const value = a()
      expect(value).not.toBe(a())
      expect(value).not.toBe({ a: 1 })
      expect({ a: 1 }).not.toBe(value)
   })

   test('option `shouldReinitialize` reinitializes the value', () => {
      const fnA = () => ({ a: 1 })
      const a = lazy(fnA, { shouldReinitialize: () => true })

      expect(a()).toEqual({ a: 1 })

      expect(a()).not.toBe(a())
      expect(a()).not.toBe(a())

      expect(a()).not.toBe({ a: 1 })
      expect({ a: 1 }).not.toBe(a())

      const value = a()
      expect(value).not.toBe(a())
      expect(value).not.toBe({ a: 1 })
      expect({ a: 1 }).not.toBe(value)

      const fnB = () => (new Counter())
      const b = lazy(fnB, {
         shouldReinitialize: (current) => current.count === 2,
      })

      const firstB = b()

      expect(b()).toBe(b())
      expect(b()).toBe(firstB)
      expect(b().count).toBe(0)

      // Increment the count.
      expect(b().inc()).toBe(1)
      expect(b()).toBe(firstB)
      expect(b().count).toBe(1)

      // Increment the count.
      expect(b().inc()).toBe(2)
      // This should reinitialize the value since we are calling when the count is 2.
      const secondB = b()

      expect(secondB).not.toBe(firstB)

      expect(b()).toBe(b())
      expect(b()).toBe(secondB)
      expect(b().count).toBe(0)

      // Increment the count.
      expect(b().inc()).toBe(1)
      expect(b()).toBe(secondB)
      expect(b().count).toBe(1)

      // Increment the count.
      expect(b().inc()).toBe(2)
      // This should reinitialize the value since we are calling when the count is 2.
      const thirdB = b()

      expect(thirdB).not.toBe(firstB)
      expect(thirdB).not.toBe(secondB)

      expect(b()).toBe(b())
      expect(b()).toBe(thirdB)
      expect(b().count).toBe(0)
   })
})
