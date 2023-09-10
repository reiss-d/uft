/* eslint-disable prefer-rest-params */
import type { EmptyArray } from '../../types'
import type { ErrorCtor } from '../assert'
import { isFunction } from '../isFunction'

/**
 * Used to explicitly type the `assert` function returned by {@link createAssert}.
 *
 * Make sure to use `typeof` before your custom error class, otherwise the type
 * passed will be an instance of the error class instead of the class itself.
 *
 * @example
 * ```ts
 * const assert: Assert<typeof MyError> = ...
 * //                    ^ don't forget this
 * ```
 * @category Is
 */
export type Assert<T extends ErrorCtor> = ConstructorParameters<T> extends
   EmptyArray ? ((condition: boolean) => asserts condition) :
   ((
      condition: boolean,
      ...args: ConstructorParameters<T> | [(() => ConstructorParameters<T>)]
   ) => asserts condition)

/**
 * Creates an assert function that throws a custom error if the given
 * condition is false.
 *
 * @param ErrorConstructor The custom Error constructor to use. Must extend the `Error` class.
 * @returns An assert function.
 *
 * @remarks
 * The returned assert function **must** be explicitly typed to work correctly,
 * otherwise you will see this error:
 *
 * `Assertions require every name in the call target to be declared with an explicit type annotation. ts(2775)`
 *
 * See examples below or check out {@link Assert} on how to implement this.
 *
 * @example
 * #### Basic usage
 * ```ts
 * import { type Assert, createAssert, isDefined } from 'uft'
 *
 * class MyError extends Error {
 *   constructor(code: number, message: string) {
 *    // ...
 *   }
 * }
 * // Incorrect, assert is not explicitly typed.
 * const assert = createAssert(MyError)
 * // Correct, assert is now explicitly typed.
 * const assert: Assert<typeof MyError> = createAssert(MyError)
 *
 * assert(true, 0, 'oops') // ok
 * assert(false, 0, 'oops') // throws new MyError(0, 'oops')
 *
 * // Error arguments can be returned from a function
 * // which is only called when the condition is false.
 * assert(false, () => [0, 'oops'])
 * ```
 *
 * #### Type narrowing
 * ```ts
 * const token: string | undefined
 * // might throw new MyError(401, 'missing token')
 * assert(token !== undefined, 401, 'missing token')
 * token // type: string
 * ```
 * @category Is
 */
export const createAssert = <T extends ErrorCtor>(
   ErrorConstructor: T
): Assert<T> => {
   type CtorArgs = ConstructorParameters<typeof ErrorConstructor>

   // NOTE:
   // The choice of using the `arguments` object here is intentional.
   // Since it is likely that the `assert` will return early, we want to
   // avoid creating a new array for the `args` parameter everytime the
   // function is called.

   // eslint-disable-next-line @typescript-eslint/no-shadow
   function assert() {
      const condition = arguments[0] as boolean
      if (condition) { return }

      const maybeArgsFn = arguments[1] as (() => CtorArgs) | undefined
      let constructorArgs: CtorArgs

      if (isFunction(maybeArgsFn)) {
         constructorArgs = maybeArgsFn()
      } else {
         const [, ...args] = arguments
         constructorArgs = args as CtorArgs
      }
      throw new ErrorConstructor(...constructorArgs)
   }
   return assert as unknown as Assert<T>
}
