/* eslint-disable prefer-rest-params */
import { isFunction } from '../isFunction'
import { isString } from '../isString'

export type ErrorCtor = new(...args: readonly any[]) => Error

const isErrorClass = (
   constructor: Function
): constructor is ErrorCtor => {
   return constructor.prototype instanceof Error
}

/**
 * Asserts that the given condition is true. If the condition is false,
 * an error is thrown.
 *
 * @param condition The condition to assert.
 * @param message An error message or a function that returns either a message or an Error object.
 * @throws {Error} If the condition is false.
 *
 * @example
 * #### Basic usage
 * ```ts
 * const value: number
 * // might throw new Error('value must be greater than 0')
 * assert(value > 0, 'value must be greater than 0')
 * // might throw new Error('assert condition not satisfied')
 * assert(value > 0)
 * ```
 *
 * #### Type narrowing
 * ```ts
 * import { isDefined } from 'uft'
 *
 * const value: string | undefined
 * // might throw new Error('value must be defined')
 * assert(isDefined(value), 'value must be defined')
 * value // type: string
 * ```
 * @category Is
 */
export function assert(
   condition: boolean,
   message?: string | (() => string | Error)
): asserts condition

/**
 * Asserts that the given condition is true. If the condition is false,
 * an error is thrown.
 *
 * @param condition The condition to assert.
 * @param ErrorConstructor The Error constructor to use.
 * @param args The arguments or a function that will return them, to pass to the Error constructor.
 * @throws {TError} If the condition is false.
 *
 * @example
 * #### Basic usage
 * ```ts
 * class CustomError extends Error {
 *    constructor(code: number, message: string) {
 *       super(`${code}: ${message}`)
 *    }
 * }
 * const isUser: boolean
 * // might throw new CustomError(401, 'Unauthorized')
 * assert(isUser, CustomError, 401, 'Unauthorized')
 * ```
 *
 * #### Type narrowing
 * ```ts
 * import { isDefined } from 'uft'
 *
 * class NotFound extends Error {
 *    constructor() {
 *       super('404 Not Found')
 *    }
 * }
 * const value: string | undefined
 * // might throw new NotFound()
 * assert(isDefined(value), NotFound)
 * value // type: string
 * ```
 * @category Is
 */
export function assert<
   TError extends ErrorCtor,
>(
   condition: boolean,
   ErrorConstructor: TError,
   ...args: ConstructorParameters<TError> | [
      (() => ConstructorParameters<TError>),
   ]
): asserts condition

export function assert() {
   // NOTE:
   // The choice of using the `arguments` object here is intentional.
   // Since it is likely that the `assert` will return early, we want to
   // avoid creating a new array for the `args` parameter everytime the
   // function is called.

   const condition = arguments[0] as boolean
   if (condition) { return }

   const msgOrCtor = arguments[1] as
      | string
      | undefined
      | (() => string | Error)
      | ErrorCtor

   if (!isFunction(msgOrCtor)) {
      const message = msgOrCtor
      throw new Error(message ?? 'assert condition not satisfied')
   }

   if (isErrorClass(msgOrCtor)) {
      const ErrorConstructor = msgOrCtor
      type CtorArgs = ConstructorParameters<typeof ErrorConstructor>

      const maybeArgsFn = arguments[2] as (() => CtorArgs) | undefined
      let constructorArgs: CtorArgs

      if (isFunction(maybeArgsFn)) {
         constructorArgs = maybeArgsFn()
      } else {
         const [, , ...args] = arguments
         constructorArgs = args as CtorArgs
      }
      throw new ErrorConstructor(...constructorArgs)
   }

   const messageOrError = (msgOrCtor as () => string | Error)()
   throw isString(messageOrError)
      ? new Error(messageOrError)
      : messageOrError
}
