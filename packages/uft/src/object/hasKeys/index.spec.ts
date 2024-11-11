import { expectTypeOf as expectTy } from 'expect-type'
import { randChoice } from '../../test.utils'
import { hasKeys } from './index'

describe('object/hasKeys', () => {
   test('object with literal string keys', () => {
      const a = { a: 1, b: 2, c: 3 }
      const ar = hasKeys(a, ['a', 'b'])

      expect(ar).toBeTrue()

      if (ar) {
         expectTy(a).toEqualTypeOf<typeof a>()
      } else {
         expectTy(a).toEqualTypeOf<never>()
      }
   })

   test('object with literal numeric keys', () => {
      const a = { 0: 'first', 1: 'second', 2: 'third' }
      const ar = hasKeys(a, [0, 1, 2])

      expect(ar).toBeTrue()

      if (ar) {
         expectTy(a).toEqualTypeOf<typeof a>()
      } else {
         expectTy(a).toEqualTypeOf<never>()
      }
   })

   test('object with literal mixed keys', () => {
      const a = { 0: 'first', foo: 'second' }
      const ar1 = hasKeys(a, [0])
      const ar2 = hasKeys(a, ['foo'])
      const ar3 = hasKeys(a, [0, 'foo'])

      expect(ar1).toBeTrue()
      expect(ar2).toBeTrue()
      expect(ar3).toBeTrue()

      if (ar1 && ar2 && ar3) {
         expectTy(a).toEqualTypeOf<typeof a>()
      } else {
         expectTy(a).toEqualTypeOf<never>()
      }
   })

   test('object with index signature', () => {
      const a = { a: 1, b: 2, c: 3 } as Record<string, number>

      const ar = hasKeys(a, ['a', 'b'])
      expect(ar).toBeTrue()

      if (ar) {
         expectTy(a).toEqualTypeOf<typeof a & { a: number; b: number }>()
      } else {
         expectTy(a).toEqualTypeOf<Record<string, number>>()
      }
   })

   test('union of objects with literal keys', () => {
      const a = randChoice({ a: '1', b: '2' }, { c: 1, d: 2 })
      const ar = hasKeys(a, ['a'])

      if ('a' in a) {
         expect(ar).toBeTrue()
      } else {
         expect(ar).toBeFalse()
      }

      if (ar) {
         expectTy(a).toEqualTypeOf<{ a: string; b: string }>()
      } else {
         expectTy(a).toEqualTypeOf<{ c: number; d: number }>()
      }
   })

   test('union of objects with overlapping keys', () => {
      const a = randChoice({ a: '1', b: '2', foo: '3' }, { a: 1, b: 2, bar: 3 })

      // Both objects have the keys `a` & `b`.
      const ar1 = hasKeys(a, ['a', 'b'])
      expect(ar1).toBeTrue()

      if (ar1) {
         expectTy(a).toEqualTypeOf<typeof a>()
      } else {
         expectTy(a).toEqualTypeOf<never>()
      }

      // Only the first object has the key `foo`.
      const ar2 = hasKeys(a, ['a', 'foo'])

      if ('foo' in a) {
         expect(ar2).toBeTrue()
      } else {
         expect(ar2).toBeFalse()
      }

      if (ar2) {
         expectTy(a).toEqualTypeOf<{ a: string; b: string; foo: string }>()
      } else {
         expectTy(a).toEqualTypeOf<{ a: number; b: number; bar: number }>()
      }

      // Only the second object has the key `bar`.
      const ar3 = hasKeys(a, ['b', 'bar'])

      if ('bar' in a) {
         expect(ar3).toBeTrue()
      } else {
         expect(ar3).toBeFalse()
      }

      if (ar3) {
         expectTy(a).toEqualTypeOf<{ a: number; b: number; bar: number }>()
      } else {
         expectTy(a).toEqualTypeOf<{ a: string; b: string; foo: string }>()
      }
   })

   test('union of objects with literal keys and index signature', () => {
      type Shared = { shared: string } & Record<string, boolean>
      type Foo = Shared & { foo: number }
      type Bar = Shared & { bar: number }

      const foo = { shared: '', foo: 1 } as unknown as Foo
      const bar = { shared: '', maybe: true, bar: 2 } as unknown as Bar

      const a = randChoice(foo, bar)

      // Both objects have the key `shared` and possibly `maybe`.
      const ar1 = hasKeys(a, ['shared', 'maybe'])
      // We know that `maybe` doesn't exist.
      expect(ar1).toBeFalse()

      if (ar1) {
         // Since both objects can have these keys, this should be the union of the two types with the addition of the new key `maybe`.
         type Expected = (Foo | Bar) & { maybe: boolean }

         expectTy<Expected>().toMatchTypeOf(a)
         expectTy(a).toMatchTypeOf<Expected>()
      } else {
         // Since `maybe` doesn't exist, the type can't be narrowed further.
         expectTy(a).toEqualTypeOf<Foo | Bar>()
      }

      // Both objects may have the key `foo` but the first has it typed as a number
      // ({ foo: number }) and the second as a boolean (Record<string, boolean>).
      const ar2 = hasKeys(a, ['shared', 'foo'])

      if ('foo' in a) {
         expect(ar2).toBeTrue()
      } else {
         expect(ar2).toBeFalse()
      }

      if (ar2) {
         // Since both objects can have these keys, this should be the union of
         // the two types but with the key `foo` typed differently.
         type Expected = Foo | (Bar & { foo: boolean })

         expectTy<Expected>().toMatchTypeOf(a)
         expectTy(a).toMatchTypeOf<Expected>()
      } else {
         // Since the key `foo` will always be defined for type `Foo` its absence
         // means this type must be `Bar`.
         expectTy(a).toEqualTypeOf<Bar>()
      }
   })

   test('fails when given invalid keys', () => {
      const a = { foo: 1, bar: 2 }

      /* @ts-expect-error: The keys are known to be `foo` & `bar`. */
      const ar1 = hasKeys(a, ['a', 'b'])
      expect(ar1).toBeFalse()

      /* @ts-expect-error: The keys are known to be `foo` & `bar`. */
      const ar2 = hasKeys(a, ['foo', 'buzz'])
      expect(ar2).toBeFalse()
   })
})
