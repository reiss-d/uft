import { forEachKey } from './index'

class Counter {
   count = 0
   add() {
      this.count++
   }
}

describe('object/forEachKey', () => {
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
