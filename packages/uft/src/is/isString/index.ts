/**
 * Checks if a value is `typeof string`.
 *
 * @param value The value to check.
 * @returns `true` if the check passes, `false` otherwise.
 *
 * @example
 * #### Basic usage
 * ```ts
 * isString('') // true
 * isString('foo') // true
 * isString(0) // false
 * isString(null) // false
 * ```
 *
 * #### Type narrowing
 * ```ts
 * const value: string | number
 *
 * if (isString(value)) {
 *   value // type: string
 * } else {
 *   value // type: number
 * }
 *
 * // or
 * if (!isString(value)) {
 *   value // type: number
 * } else {
 *   value // type: string
 * }
 * ```
 *
 * #### Paired with assert
 * ```ts
 * import { assert } from 'uft'
 *
 * const token: string | undefined
 * assert(isString(token), 'received undefined token')
 * token // type: string
 * ```
 * @category Is
 */
export const isString = (value: unknown): value is string => {
   return typeof value === 'string'
}
