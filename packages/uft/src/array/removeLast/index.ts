import type { Removed } from '../removeFirst'

/**
 * Finds the last element that matches a predicate and removes it
 * by **mutating** the array in-place.
 *
 * @param array The array to remove the element from.
 * @param predicate The predicate to match the element against.
 * @param returnIndex Whether to return the index the removed element was found at.
 * @returns `undefined` if no element was removed. Otherwise, returns the removed element or an object with the removed element and index if `returnIndex` is true.
 *
 * @example
 * #### Basic usage
 * ```ts
 * const array = [1, 2, 3, 4, 5]
 *
 * const r1 = removeLast(array, (v) => v === 3)
 * console.log(array, r1) // [1, 2, 4, 5] , 3
 *
 * const r2 = removeLast(array, (v) => v === 6)
 * console.log(array, r2) // [1, 2, 4, 5] , undefined
 *
 * const r3 = removeLast(array, (v) => v > 1)
 * console.log(array, r3) // [1, 2, 4] , 5
 * ```
 *
 * #### Return index
 * ```ts
 * const array = [1, 2, 3, 4, 5]
 *
 * // Pass `true` as the third argument.
 * const r1 = removeLast(array, (v) => v > 1, true)
 * console.log(array, r1) // [1, 2, 3, 4] , { item: 5, index: 4 }
 *
 * const r2 = removeLast(array, (v) => v > 4, true)
 * console.log(array, r2) // [1, 2, 3, 4] , undefined
 * ```
 * @category Array
 */
export function removeLast<
   T extends unknown[],
   R extends boolean | undefined = undefined,
>(
   array: T,
   predicate: (value: T[number], index: number) => boolean,
   returnIndex?: R
): Removed<T, R> {
   for (let index = array.length; --index > -1;) {
      if (predicate(array[index], index)) {
         const item = array.splice(index, 1)[0]
         return (returnIndex ? { item, index } : item) as Removed<T, R>
      }
   }
   return undefined as Removed<T, R>
}
