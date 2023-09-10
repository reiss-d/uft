import { assert } from '.'

describe('is/assert', () => {
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

   test('correctly throws custom message', () => {
      expect(() => assert(false)).toThrow('assert condition not satisfied')
      expect(() => assert(false, 'oops')).toThrow('oops')
      expect(() => assert(false, () => 'oops')).toThrow('oops')

      expect(() => assert(true)).not.toThrow()
      expect(() => assert(true, 'oops')).not.toThrow()
      expect(() => assert(true, () => 'oops')).not.toThrow()
   })

   test('correctly throws custom error (without args)', () => {
      expect(() => assert(false, ErrorWithoutArgs))
         .toThrow('no arguments')
         .toThrow(ErrorWithoutArgs)
         .toThrow(new ErrorWithoutArgs())

      expect(() => assert(true, ErrorWithoutArgs)).not.toThrow()
   })

   test('correctly throws custom error (with args)', () => {
      // A
      expect(() => assert(false, ErrorWithArgs, 99))
         .toThrow('[code: 99]')
         .toThrow(ErrorWithArgs)
         .toThrow(new ErrorWithArgs(99))

      expect(() => assert(true, ErrorWithArgs, 99)).not.toThrow()

      // B
      expect(() => assert(false, ErrorWithArgs, 0, 'uhoh...'))
         .toThrow('[code: 0] uhoh...')
         .toThrow(ErrorWithArgs)
         .toThrow(new ErrorWithArgs(0, 'uhoh...'))

      expect(() => assert(true, ErrorWithArgs, 0, 'uhoh...')).not.toThrow()

      // C
      expect(() => assert(false, ErrorWithArgs, () => [14, 'yikes']))
         .toThrow('[code: 14] yikes')
         .toThrow(ErrorWithArgs)
         .toThrow(new ErrorWithArgs(14, 'yikes'))

      expect(() => assert(true, ErrorWithArgs, () => [14, 'yikes']))
         .not.toThrow()

      // D
      expect(() => assert(false, () => new ErrorWithArgs(404, 'not found')))
         .toThrow('[code: 404] not found')
         .toThrow(ErrorWithArgs)
         .toThrow(new ErrorWithArgs(404, 'not found'))

      expect(() => assert(true, () => new ErrorWithArgs(404, 'not found')))
         .not.toThrow()
   })
})
