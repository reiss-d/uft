/**
 * Checks if a value is `typeof number`.
 *
 * @param value The value to check.
 * @returns `true` if the check passes, `false` otherwise.
 *
 * @remarks For a stricter check, see {@link isSafeNumber} and {@link isSafeInteger}.
 *
 * @example
 * #### Basic usage
 * ```ts
 * isNumber(0) // true
 * isNumber(1) // true
 * isNumber(2.2) // true
 * isNumber(NaN) // true
 * isNumber(Infinity) // true
 *
 * isNumber('3') // false
 * isNumber(null) // false
 * ```
 *
 * #### Type narrowing
 * ```ts
 * const value: number | string
 *
 * if (isNumber(value)) {
 *   value // type: number
 * } else {
 *   value // type: string
 * }
 *
 * // or
 * if (!isNumber(value)) {
 *   value // type: string
 * } else {
 *   value // type: number
 * }
 * ```
 *
 * #### Paired with assert
 * ```ts
 * import { assert } from 'uft'
 *
 * const paid: number | null
 * assert(isNumber(paid), 'missing payment')
 * paid // type: number
 * ```
 * @category Is
 */
export const isNumber = (value: unknown): value is number => {
   return typeof value === 'number'
}

/**
 * Number type which represents a number value within the range of
 * `Number.MIN_SAFE_INTEGER` and `Number.MAX_SAFE_INTEGER`.
 *
 * @category Is
 */
export type SafeNumber = number & { __SafeNumber__: never }

/**
 * Typed version of {@link Number.isSafeInteger} which allows decimal values.
 *
 * @param value The value to check.
 * @returns `true` if the check passes, `false` otherwise.
 *
 * @remarks If you want to only allow integers, use {@link isSafeInteger}.
 *
 * @example
 * #### Basic usage
 * ```ts
 * isSafeNumber(1) // true
 * isSafeNumber(-1) // true
 * isSafeNumber(2.5) // true
 * isSafeNumber(Number.MAX_SAFE_INTEGER) // true
 * isSafeNumber(Number.MIN_SAFE_INTEGER) // true
 *
 * isSafeNumber("2") // false
 * isSafeNumber(Number.MAX_SAFE_INTEGER + 1) // false
 * isSafeNumber(Number.MIN_SAFE_INTEGER - 1) // false
 * isSafeNumber(NaN) // false
 * isSafeNumber(Infinity) // false
 * isSafeNumber(null) // false
 * ```
 * @category Is
 */
// TODO: document `SafeNumber` and its use cases
export const isSafeNumber = (value: unknown): value is SafeNumber => {
   return Number.isFinite(value) &&
      Math.abs(value as number) <= Number.MAX_SAFE_INTEGER
}

/**
 * Number type which represents an integer value within the range of
 * `Number.MIN_SAFE_INTEGER` and `Number.MAX_SAFE_INTEGER`.
 *
 * @category Is
 */
export type SafeInteger = SafeNumber & { __SafeInteger__: never }

/**
 * Typed version of {@link Number.isSafeInteger}.
 *
 * @param value The value to check.
 * @returns `true` if the check passes, `false` otherwise.
 *
 * @remarks If you want to allow decimal values, use {@link isSafeNumber}.
 *
 * @example
 * #### Basic usage
 * ```ts
 * isSafeInteger(1) // true
 * isSafeInteger(-1) // true
 * isSafeInteger(Number.MAX_SAFE_INTEGER) // true
 * isSafeInteger(Number.MIN_SAFE_INTEGER) // true
 *
 * isSafeInteger("2") // false
 * isSafeInteger(2.5) // false
 * isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false
 * isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
 * isSafeInteger(NaN) // false
 * isSafeInteger(Infinity) // false
 * isSafeInteger(null) // false
 * ```
 * @category Is
 */
// TODO: document `SafeInteger` and its use cases
export const isSafeInteger = Number.isSafeInteger as (
   value: unknown
) => value is SafeInteger
