/**
 * Checks if an array-like value is empty.
 *
 * @param value The value to check.
 * @returns `true` if the value is nullish or empty, `false` otherwise.
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
