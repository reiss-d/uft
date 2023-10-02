import { expectTypeOf } from 'expect-type'
import { reduceKeys } from './index'

class Counter {
   count = 0
   add() {
      this.count++
   }
}

describe('object/reduceKeys', () => {
   test('works with object `initalValue`', () => {
      const result = reduceKeys(
         { a: 'hello', b: 'world' },
         {},
         (accum, key, _idx, obj) => {
            expectTypeOf(accum).toEqualTypeOf<{ a: string; b: string }>()
            expectTypeOf(obj).toEqualTypeOf<{ a: string; b: string }>()

            accum[key] = obj[key].toUpperCase()
            return accum
         }
      )
      expect(result).toEqual({ a: 'HELLO', b: 'WORLD' })
   })

   test('works with non-object `initalValue`', () => {
      const numberAccum = reduceKeys(
         { a: 1, b: 2, c: 3 },
         0,
         (accum, key, _idx, obj) => {
            expectTypeOf(accum).toEqualTypeOf<number>()
            return accum + obj[key]
         }
      )
      expect(numberAccum).toBe(6)

      const stringAccum = reduceKeys(
         { a: 1, b: 2, c: 3 },
         '',
         (accum, key, _idx, obj) => {
            expectTypeOf(accum).toEqualTypeOf<string>()
            return accum + String(obj[key])
         }
      )
      expect(stringAccum).toBe('123')

      const booleanAccum = reduceKeys(
         { a: 1, b: 2, c: 3 },
         false,
         (accum, key, _idx, obj) => {
            expectTypeOf(accum).toEqualTypeOf<boolean>()
            return accum || obj[key] === 2
         }
      )
      expect(booleanAccum).toBe(true)

      const arrayAccum = reduceKeys(
         { a: 1, b: 2, c: 3 },
         [] as number[],
         (accum, key, _idx, obj) => {
            expectTypeOf(accum).toEqualTypeOf<number[]>()
            accum.push(obj[key])
            return accum
         }
      )
      expect(arrayAccum).toEqual([1, 2, 3])
   })

   test('works for `initalValue` with different type from `obj`', () => {
      const strToNumAccum = reduceKeys(
         { a: '1', b: '2' },
         {} as { a: number; b: number },
         (accum, key, _idx, obj) => {
            expectTypeOf(accum).toEqualTypeOf<{ a: number; b: number }>()
            expectTypeOf(obj).toEqualTypeOf<{ a: string; b: string }>()

            const strValue = obj[key]
            accum[key] = parseInt(strValue) * 10
            return accum
         }
      )
      expect(strToNumAccum).toEqual({ a: 10, b: 20 })
      expectTypeOf(strToNumAccum).toEqualTypeOf<{ a: number; b: number }>()
   })

   test('return type is inferred when no `initalValue` is provided and the `previousValue` type is overriden', () => {
      const strToNumAccum = reduceKeys(
         { a: '1', b: '2' },
         (accum: { a: number; b: number }, key, _idx, obj) => {
            expectTypeOf(accum).toEqualTypeOf<{ a: number; b: number }>()
            expectTypeOf(obj).toEqualTypeOf<{ a: string; b: string }>()

            const strValue = obj[key]
            accum[key] = parseInt(strValue) * 10
            return accum
         }
      )
      expect(strToNumAccum).toEqual({ a: 10, b: 20 })
      expectTypeOf(strToNumAccum).toEqualTypeOf<{ a: number; b: number }>()
   })

   test(`only iterates the object's own enumerable properties`, () => {
      let c = new Counter()
      let index = 0

      const reset = () => {
         c = new Counter()
         index = 0
      }

      reduceKeys({ a: 1, b: 2, c: 3, d: 4 }, (accum, _, currentIndex) => {
         index = currentIndex
         c.add()
         return accum
      })
      expect(index).toBe(3)
      expect(c.count).toBe(4)
      reset()

      reduceKeys({ a: 1, b: 2, [Symbol('c')]: 3 }, (accum, _, currentIndex) => {
         index = currentIndex
         c.add()
         return accum
      })
      expect(index).toBe(1)
      expect(c.count).toBe(2)
      reset()

      const obj = {}
      Object.defineProperties(obj, {
         a: { value: 1, enumerable: true },
         b: { value: 2, enumerable: false },
         c: { value: 3, enumerable: false },
      })

      reduceKeys(obj, (accum, _, currentIndex) => {
         index = currentIndex
         c.add()
         return accum
      })
      expect(index).toBe(0)
      expect(c.count).toBe(1)
      reset()
   })
})
