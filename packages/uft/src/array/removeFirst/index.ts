/**
 * Finds the first element that matches a predicate and removes it
 * by **mutating** the array in-place.
 *
 * @param array The array to remove the element from.
 * @param predicate The predicate to match the element against.
 * @returns The removed element or `undefined`.
 *
 * @example
 * #### Basic usage
 * ```ts
 * const array = [1, 2, 3, 4, 5]
 *
 * const r1 = removeFirst(array, (v) => v === 3)
 * console.log(array, r1) // [1, 2, 4, 5] , 3
 *
 * const r2 = removeFirst(array, (v) => v === 6)
 * console.log(array, r2) // [1, 2, 4, 5] , undefined
 *
 * const r3 = removeFirst(array, (v) => v > 1)
 * console.log(array, r3) // [1, 4, 5] , 2
 * ```
 * @category Array
 */
export function removeFirst<T extends unknown[]>(
   array: T,
   predicate: (value: T[number], index: number) => boolean
): T[number] | undefined {
   const idx = array.findIndex(predicate)
   if (idx !== -1) { return array.splice(idx, 1)[0] }
   return undefined
}
