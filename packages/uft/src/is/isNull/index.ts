/**
 * Checks if a value is `null`.
 *
 * @param value The value to check.
 * @returns `true` if the check passes, `false` otherwise.
 *
 * @example
 * #### Basic usage
 * ```ts
 * isNull(null) // true
 * isNull(undefined) // false
 * isNull(0) // false
 * ```
 *
 * #### Type narrowing
 * ```ts
 * const value: string | null
 *
 * if (isNull(value)) {
 *   value // type: null
 * } else {
 *   value // type: string
 * }
 *
 * // or
 * if (!isNull(value)) {
 *   value // type: string
 * } else {
 *   value // type: null
 * }
 * ```
 *
 * #### Paired with assert
 * ```ts
 * import { assert, isNull } from 'uft'
 *
 * const token: string | null
 * assert(!isNull(token), 'received null token')
 * token // type: string
 * ```
 * @category Is
 */
export const isNull = (value: unknown): value is null => {
   return value === null
}

/**
 * Checks if a value is not `null`.
 * This is the inverse of {@link isNull}.
 *
 * @category Is
 */
export const isNotNull = <T>(value: T | null): value is T => {
   return value !== null
}
