/**
 * Removes all elements from the target array and inserts new elements in
 * their place. The target array will be **mutated** in-place.
 *
 * @param target The array to replace.
 * @param replaceWith The elements to insert.
 * @returns An array containing the elements that were removed.
 *
 * @example
 * #### Basic usage
 * ```ts
 * const array = [1, 2]
 * const replaceWith = [3, 4]
 * const removed = replaceArray(array, replaceWith)
 * console.log(array, removed) // [3, 4] , [1, 2]
 * // replaceWith is not mutated
 * console.log(replaceWith) // [3, 4]
 * ```
 *
 * The `replaceWith` array can be a different size from the `target` array.
 * ```ts
 * // replaceWith is smaller than target
 * const array = [1, 2]
 * const removed = replaceArray(array, [3])
 * console.log(array, removed) // [3] , [1, 2]
 * // replaceWith is larger than target
 * const array = [1]
 * const removed = replaceArray(array, [2, 3])
 * console.log(array, removed) // [2, 3] , [1]
 * ```
 * @category Array
 */
export const replaceArray = <T extends unknown[]>(
   target: T,
   replaceWith: T
): T => {
   return target.splice(0, target.length, ...replaceWith) as T
}
