import { expectTypeOf } from 'expect-type'
import { omit } from './index'

describe('object/omit', () => {
   test('omits the specified keys', () => {
      const a = { a: 1, b: 2, c: 3 }
      const ar = omit(a, ['b', 'c'])

      expect(ar).toEqual({ a: 1 })
      expectTypeOf(ar).toEqualTypeOf<{ a: number }>()
   })

   test('object with literal string keys', () => {
      const a = { a: 1, b: 2, c: 3 }
      const ar = omit(a, ['b', 'c'])

      expect(ar).toEqual({ a: 1 })
      expectTypeOf(ar).toEqualTypeOf<{ a: number }>()
   })

   test('object with literal numeric keys', () => {
      const a = { 0: 'first', 1: 'second', 2: 'third' }
      const ar = omit(a, ['0', '2'])

      expect(ar).toEqual({ 1: 'second' })
      expectTypeOf(ar).toEqualTypeOf<{ 1: string }>()
   })

   test('object with literal mixed keys', () => {
      const a = { 0: 'first', foo: 'second', 1: 'third', bar: 'fourth' }

      const ar = omit(a, ['0', 'bar'])

      expect(ar).toEqual({ foo: 'second', 1: 'third' })
      expectTypeOf(ar).toEqualTypeOf<{ foo: string; 1: string }>()
   })

   test('fallback for non-literal keys', () => {
      const a = { a: 1, b: 2, c: 'third' }
      const ar = omit(a, ['a' as string])

      expect(ar).toEqual({ b: 2, c: 'third' })
      expectTypeOf(ar).toEqualTypeOf<Record<string, number | string>>()
   })
})
