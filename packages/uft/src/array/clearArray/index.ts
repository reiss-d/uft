import { isEmpty } from '../isEmpty'

/**
 * Removes all elements from an array by **mutating** it in-place.
 *
 * @param array The array to clear.
 * @returns A new array containing the elements that were removed.
 *
 * @example
 * #### Basic Usage
 * ```ts
 * const array = [1, 2, 3, 4, 5]
 * const removed = clearArray(array)
 * console.log(array, removed) // [] , [1, 2, 3, 4, 5]
 * ```
 * If there are no elements to remove, an empty array is returned.
 * ```ts
 * const array = []
 * const removed = clearArray(array)
 * console.log(array, removed) // [] , []
 * console.log(array === removed) // false
 * ```
 * @category Array
 */
export const clearArray = <T extends unknown[]>(
   array: T | null | undefined
): T => {
   if (!array || isEmpty(array)) { return [] as unknown as T }
   return array.splice(0, array.length) as T
}
