/**
 * Gets only the unique elements of an array.
 *
 * @param array The array to search.
 * @returns A new array containing only the unique elements.
 *
 * @remarks
 * This method filters duplicates by inserting all elements into a Set.
 * Therefore, each element is compared using {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#same-value-zero_equality | same-value-zero} equality,
 * which has the same behavior as {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is | Object.is},
 * except `+0` and `-0` are considered equal.
 *
 * @example
 * #### Basic Usage
 * ```ts
 * unique([1, 2, 3, 2, 1]) // [1, 2, 3]
 * unique([0, -0, 1]) // [0, 1]
 * unique([NaN, Number.NaN, NaN]) // [NaN]
 * ```
 *
 * Objects are compared by reference.
 * ```ts
 * const foo = { a: 1 }
 * unique([foo, foo]) // [foo]
 * const bar = { a: 1 }
 * unique([foo, bar]) // [foo, bar]
 * ```
 * @category Array
 */
export const unique = <T extends readonly unknown[]>(array: T): T => {
   return [...new Set(array)] as unknown as T
}
