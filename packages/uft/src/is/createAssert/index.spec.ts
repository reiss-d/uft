import { expectTypeOf } from 'expect-type'
import { type Assert, createAssert } from '.'

describe('is/createAssert', () => {
   class ErrorWithoutArgs extends Error {
      constructor() {
         super('no arguments')
      }
   }
   class ErrorWithArgs extends Error {
      constructor(code: number, message?: string) {
         let error = `[code: ${code}]`
         if (message) { error += ` ${message}` }
         super(error)
      }
   }

   const assertWithoutArgs: Assert<typeof ErrorWithoutArgs> = createAssert(
      ErrorWithoutArgs
   )
   const assertWithArgs: Assert<typeof ErrorWithArgs> = createAssert(
      ErrorWithArgs
   )

   test('correctly throws custom error (without args)', () => {
      expect(() => assertWithoutArgs(false))
         .toThrow(ErrorWithoutArgs)
         .toThrow(new ErrorWithoutArgs())

      expect(() => assertWithoutArgs(true)).not.toThrow()
   })

   test('correctly throws custom error (with args)', () => {
      // A
      expect(() => assertWithArgs(false, 99))
         .toThrow(ErrorWithArgs)
         .toThrow(new ErrorWithArgs(99))

      expect(() => assertWithArgs(true, 99)).not.toThrow()

      // B
      expect(() => assertWithArgs(false, 0, 'uhoh...'))
         .toThrow(ErrorWithArgs)
         .toThrow(new ErrorWithArgs(0, 'uhoh...'))

      expect(() => assertWithArgs(true, 0, 'uhoh...')).not.toThrow()

      // C
      expect(() => assertWithArgs(false, () => [14, 'yikes']))
         .toThrow(ErrorWithArgs)
         .toThrow(new ErrorWithArgs(14, 'yikes'))

      expect(() => assertWithArgs(true, () => [14, 'yikes'])).not.toThrow()
   })

   test('assertion narrows type', () => {
      const a = 1 as number | undefined
      expectTypeOf(a).toEqualTypeOf<number | undefined>()
      assertWithoutArgs(typeof a === 'number')
      expectTypeOf(a).toEqualTypeOf<number>()

      const b = true as boolean | undefined
      expectTypeOf(b).toEqualTypeOf<boolean | undefined>()
      assertWithArgs(typeof b === 'boolean', 401, 'unauthorized')
      expectTypeOf(b).toEqualTypeOf<boolean>()
   })
})
