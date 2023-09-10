import { isArray } from '../../internal/builtin'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { isObjectLoose } from '../isObjectLoose'

/**
 * Checks if a value is `typeof object` and not `null` or
 * an `array`.
 *
 * @param value The value to check.
 * @returns `true` if the check passes, `false` otherwise.
 *
 * @remarks
 * This function will return `false` for an `array`. If you
 * do not want this behavior, use {@link isObjectLoose} instead.
 *
 * @example
 * #### Basic usage
 * ```ts
 * isObject({}) // true
 * isObject([]) // false
 * isObject(null) // false
 * ```
 *
 * #### Type narrowing
 * ```ts
 * const value: { foo: string } | string[]
 *
 * if (isObject(value)) {
 *   value // type: { foo: string }
 * } else {
 *   value // type: string[]
 * }
 *
 * // works with function too
 * const value: { foo: string } | (() => string)
 *
 * if (isObject(value)) {
 *   value // type: { foo: string }
 *   value.foo // ok
 * } else {
 *   value // (() => string)
 *   value() // ok
 * }
 * ```
 *
 * #### Paired with assert
 * ```ts
 * import { assert } from 'uft'
 *
 * const options: { opt: string } | string[]
 * assert(isObject(options), 'expected options object')
 * options // type: { opt: string }
 * ```
 * @category Is
 */
export const isObject = <T>(
   value: T
): value is T extends Function | unknown[] ? never : (T & object) => {
   return !!value && typeof value === 'object' && !isArray(value)
}
