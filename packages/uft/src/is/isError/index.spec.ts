import { expectTypeOf } from 'expect-type'
import { isError } from './index'

describe('is/isError', () => {
   class CustomError extends Error {
      code: number

      constructor(message: string, code: number) {
         super(message)
         this.code = code
      }
   }

   test('`isError` returns true', () => {
      const a = isError(new Error('foo'))
      expect(a).toBe(true)

      const b = isError(new CustomError('foo', 100))
      expect(b).toBe(true)
   })

   test('`isError` returns false', () => {
      const a = isError('foo')
      expect(a).toBe(false)

      const b = isError({ message: 'foo' })
      expect(b).toBe(false)
   })

   test('`isError` narrows type', () => {
      const a = new Error('foo') as Error | string
      const ar = isError(a)
      expect(ar).toBeTrue()

      if (ar) {
         expectTypeOf(a).toEqualTypeOf<Error>()
         expect(a.message).toBe('foo')
      } else {
         expectTypeOf(a).toEqualTypeOf<string>()
      }

      const b = new CustomError('foo', 200) as CustomError | string
      const br = isError(b)
      expect(br).toBeTrue()

      if (br) {
         expectTypeOf(b).toEqualTypeOf<CustomError>()
         expect(b.message).toBe('foo')
         expect(b.code).toBe(200)
      } else {
         expectTypeOf(b).toEqualTypeOf<string>()
      }
   })
})
