/**
 * Checks if a value is `null` or `undefined`.
 *
 * @param value The value to check.
 * @returns `true` if the check passes, `false` otherwise.
 *
 * @example
 * #### Basic usage
 * ```ts
 * isNullish(null) // true
 * isNullish(undefined) // true
 * isNullish(0) // false
 * ```
 *
 * #### Type narrowing
 * ```ts
 * const value: string | null | undefined
 *
 * if (isNullish(value)) {
 *   value // type: null | undefined
 * } else {
 *   value // type: string
 * }
 *
 * // or
 * if (!isNullish(value)) {
 *   value // type: string
 * } else {
 *   value // type: null | undefined
 * }
 * ```
 *
 * #### Paired with assert
 * ```ts
 * import { assert } from 'uft'
 *
 * const token: string | null | undefined
 * assert(!isNullish(token), 'received nullish token')
 * token // string
 * ```
 * @category Is
 */
export const isNullish = (value: unknown): value is null | undefined => {
   return value == null
}

/**
 * Checks if a value is not `null` or `undefined`.
 * This is the inverse of {@link isNullish}.
 *
 * @category Is
 */
export const isNotNullish = <T>(value: T | null | undefined): value is T => {
   return value != null
}
