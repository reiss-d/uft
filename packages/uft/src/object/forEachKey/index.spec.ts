import { expectTypeOf as expectTy } from 'expect-type'
import { forEachKey } from './index'

class Counter {
   count = 0
   add() {
      this.count++
   }
}

describe('object/forEachKey', () => {
   test('object with literal string keys', () => {
      const a = { a: 1, b: 2, c: 3 }

      forEachKey(a, (key) => {
         expectTy(key).toEqualTypeOf<'a' | 'b' | 'c'>()
      })
   })

   test('object with literal numeric keys', () => {
      const a = { 0: 'first', 1: 'second', 2: 'third' }

      forEachKey(a, (key) => {
         expectTy(key).toEqualTypeOf<'0' | '1' | '2'>()
      })
   })

   test('object with literal mixed keys', () => {
      const a = { 0: 'first', foo: 'second' }

      forEachKey(a, (key) => {
         expectTy(key).toEqualTypeOf<'0' | 'foo'>()
      })
   })

   test(`only iterates the object's own enumerable properties`, () => {
      let c = new Counter()
      forEachKey({ a: 1, b: 2 }, () => {
         c.add()
      })
      expect(c.count).toBe(2)

      c = new Counter()

      forEachKey({ a: 1, b: 2, [Symbol('c')]: 3 }, () => {
         c.add()
      })
      expect(c.count).toBe(2)

      c = new Counter()

      const obj = {}
      Object.defineProperty(obj, 'a', { value: 1, enumerable: true })
      Object.defineProperty(obj, 'b', { value: 2, enumerable: false })

      forEachKey(obj, () => {
         c.add()
      })
      expect(c.count).toBe(1)
   })
})
