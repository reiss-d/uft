import { freeze } from '../../internal/builtin'
import { at } from './index'

describe('array/at', () => {
   test('nullish array argument returns `undefined`', () => {
      expect(at(null, -9)).toEqual(undefined)
      expect(at(undefined, -9)).toEqual(undefined)
   })

   test('positive index returns correct item from array-like', () => {
      expect(at(freeze([1, 2, 3]), 0)).toEqual(1)
      expect(at(freeze([1, 2, 3]), 1)).toEqual(2)
      expect(at(freeze([1, 2, 3]), 2)).toEqual(3)
      expect(at(freeze([1, 2, 3]), 9)).toEqual(undefined)

      expect(at('123', 0)).toEqual('1')
      expect(at('123', 1)).toEqual('2')
      expect(at('123', 2)).toEqual('3')
      expect(at('123', 9)).toEqual(undefined)
   })

   test('negative index returns correct item from array-like', () => {
      expect(at(freeze([1, 2, 3]), -1)).toEqual(3)
      expect(at(freeze([1, 2, 3]), -2)).toEqual(2)
      expect(at(freeze([1, 2, 3]), -3)).toEqual(1)
      expect(at(freeze([1, 2, 3]), -9)).toEqual(undefined)

      expect(at('123', -1)).toEqual('3')
      expect(at('123', -2)).toEqual('2')
      expect(at('123', -3)).toEqual('1')
      expect(at('123', -9)).toEqual(undefined)
   })
})
