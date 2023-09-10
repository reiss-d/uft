// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { isObject } from '../isObject'

/**
 * Checks if a value is `typeof object` and not `null`.
 *
 * @param value The value to check.
 * @returns `true` if the check passes, `false` otherwise.
 *
 * @remarks
 * This function will return `true` for an `array`. If you
 * do not want this behavior, use {@link isObject} instead.
 *
 * @example
 * #### Basic usage
 * ```ts
 * isObjectLoose({}) // true
 * isObjectLoose([]) // true
 * isPlainObject(null) // false
 * ```
 *
 * #### Type narrowing
 * ```ts
 * const value: string | { foo: string }
 *
 * if (isObjectLoose(value)) {
 *   value // type: { foo: string }
 * } else {
 *   value // type: string
 * }
 *
 * // warning: arrays will pass
 * const value: { bar: string } | string[] | null
 *
 * if (isObjectLoose(value)) {
 *   value // type: { bar: string } | string[]
 * } else {
 *   value // type: null
 * }
 * ```
 * @category Is
 */
export const isObjectLoose = <T>(
   value: T
): value is T extends Function ? never : (T & object) => {
   return !!value && typeof value === 'object'
}
