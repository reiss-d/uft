/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { isPlainObject } from '.'

describe('is/isObject', () => {
   const objWithNullProto = Object.create(null)
   // eslint-disable-next-line @typescript-eslint/no-extraneous-class
   class Foo {}

   test('`isPlainObject` returns true', () => {
      expect(isPlainObject(objWithNullProto)).toBeTrue()

      expect(isPlainObject({})).toBeTrue()
      expect(isPlainObject({}, false)).toBeTrue()

      const objWithObjectProto = Object.create(Object.prototype)
      expect(isPlainObject(objWithObjectProto)).toBeTrue()
      expect(isPlainObject(objWithObjectProto, false)).toBeTrue()
   })

   test('`isPlainObject` returns false', () => {
      expect(isPlainObject(objWithNullProto, false)).toBeFalse()

      expect(isPlainObject([])).toBeFalse()
      expect(isPlainObject([], false)).toBeFalse()

      const objWithObjProto = Object.create({})
      expect(isPlainObject(objWithObjProto)).toBeFalse()
      expect(isPlainObject(objWithObjProto, false)).toBeFalse()

      const fooInstance = new Foo()
      expect(isPlainObject(fooInstance)).toBeFalse()
      expect(isPlainObject(fooInstance, false)).toBeFalse()

      const objWithFooProto = Object.create(Foo.prototype)
      expect(isPlainObject(objWithFooProto)).toBeFalse()
      expect(isPlainObject(objWithFooProto, false)).toBeFalse()
   })
})
