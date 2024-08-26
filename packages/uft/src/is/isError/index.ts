/**
 * Checks if a value is an instance of `Error`.
 *
 * @param value The value to check.
 * @returns `true` if the check passes, `false` otherwise.
 *
 * @example
 * #### Basic usage
 * ```ts
 * isError(new Error('foo')) // true
 * class CustomError extends Error {}
 * isError(new CustomError('foo')) // true
 *
 * isError({ message: 'foo' }) // false
 * isError('foo') // false
 * ```
 *
 * #### Type narrowing
 * ```ts
 * const value: string | Error
 *
 * if (isError(value)) {
 *   value // type: Error
 * } else {
 *   value // type: string
 * }
 *
 * class CustomError extends Error {}
 * const custom: string | CustomError
 *
 * if (isError(custom)) {
 *   custom // type: CustomError
 * } else {
 *   custom // type: string
 * }
 * ```
 *
 * #### Paired with assert
 * ```ts
 * import { assert, isError } from 'uft'
 *
 * const token: string | Error
 * assert(!isError(token), 'expected non-error')
 * token // type: string
 * ```
 * @category Is
 */
export const isError = (value: unknown): value is Error => {
   return value instanceof Error
}
