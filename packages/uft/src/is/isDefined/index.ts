/**
 * Checks if a value is not `undefined`.
 *
 * @param value The value to check.
 * @returns `true` if the check passes, `false` otherwise.
 *
 * @example
 * #### Basic usage
 * ```ts
 * isDefined({}) // true
 * isDefined(false) // true
 * isDefined(null) // true
 * isDefined(undefined) // false
 * ```
 *
 * #### Type narrowing
 * ```ts
 * const value: { foo: string } | undefined
 *
 * if (isDefined(value)) {
 *   value // type: { foo: string }
 * } else {
 *   value // type: undefined
 * }
 *
 * // or
 * if (!isDefined(value)) {
 *   value // type: undefined
 * } else {
 *   value // type: { foo: string }
 * }
 * ```
 *
 * #### Paired with assert
 * ```ts
 * import { assert } from 'uft'
 *
 * const token: string | undefined
 * assert(isDefined(token), 'token is not defined')
 * token // type: string
 * ```
 * @category Is
 */
export const isDefined = <T>(value: T | undefined): value is T => {
   return value !== undefined
}

/**
 * Checks if a value is `undefined`.
 * This is the inverse of {@link isDefined}.
 *
 * @category Is
 */
export const isUndefined = (value: unknown): value is undefined => {
   return value === undefined
}
