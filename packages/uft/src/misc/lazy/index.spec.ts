import { expectTypeOf as expectTy } from 'expect-type'
import { lazy } from './index'

class Counter {
   count = 0
   add() {
      this.count++
   }
}

describe('misc/lazy', () => {
   test('only calls the function once', () => {
      const c = new Counter()
      const a = lazy(() => {
         c.add()
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
})
