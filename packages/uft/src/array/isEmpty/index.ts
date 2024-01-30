/**
 * Checks if an array-like value is empty.
 *
 * @param value The value to check.
 * @returns `true` if the value is nullish or empty, `false` otherwise.
 *
 * @see {@link isNotEmpty} for the inverse of this.
 *
 * @example
 * #### Basic usage
 * ```ts
 * isEmpty([]) // true
 * isEmpty([1, 2]) // false
 *
 * isEmpty('') // true
 * isEmpty('foo') // false
 *
 * isEmpty(null) // true
 * isEmpty(undefined) // true
 * ```
 * @category Array
 */
export const isEmpty = (
   value: ArrayLike<unknown> | null | undefined
): boolean => {
   return !(value?.length)
}

/**
 * Checks if an array-like value is not empty.
 *
 * @param value The value to check.
 * @returns `true` if the value is neither nullish nor empty, `false` otherwise.
 *
 * @see {@link isEmpty} for the inverse of this.
 *
 * @example
 * #### Basic usage
 * ```ts
 * isNotEmpty([]) // false
 * isNotEmpty([1, 2]) // true
 *
 * isNotEmpty('') // false
 * isNotEmpty('foo') // true
 *
 * isNotEmpty(null) // false
 * isNotEmpty(undefined) // false
 * ```
 * @category Array
 */
export const isNotEmpty = (
   value: ArrayLike<unknown> | null | undefined
): boolean => {
   return !!(value?.length)
}
