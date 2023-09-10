/**
 * Applies a `filter` function to the elements of the given array, and then
 * creates a new array using the return values from calling a `map` function
 * with each of the filtered elements.
 *
 * @param array The array to iterate over.
 * @param filter A function that determines whether an element should be included.
 * @param map A function to call for each included element, which returns a value.
 * @returns An array containing the results of the `map` function.
 *
 * @example
 * #### Basic Usage
 * ```ts
 * const result = filteredMap(
 *   [1, 2, 3, 4, 5],
 *   (value) => value > 3,
 *   (value) => value * 10
 * ) // type: number[]
 * console.log(result) // [40, 50]
 * ```
 *
 * #### Type narrowing
 * ```ts
 * import { isNumber } from 'uft'
 *
 * const result = filteredMap(
 *   ['foo', 2, 3, null],
 *   isNumber,
 *   (value) => {
 *     value // type: number
 *     return value ** 2
 *   }
 * ) // type: number[]
 * console.log(result) // [4, 9]
 * ```
 * @category Array
 */
export function filteredMap<
   T extends readonly unknown[],
   S extends T[number],
   R,
>(
   array: T,
   filter: (element: T[number], index: number) => element is S,
   map: (element: S, index: number) => R
): R[]

export function filteredMap<
   T extends readonly unknown[],
   R,
>(
   array: T,
   filter: (element: T[number], index: number) => boolean,
   map: (element: T[number], index: number) => R
): R[]

export function filteredMap(
   array: unknown[],
   filter: (value: unknown, index: number) => boolean,
   map: (value: unknown, index: number) => unknown
): unknown[] {
   const result: unknown[] = []

   for (let index = 0, rIndex = 0; index < array.length; index++) {
      if (filter(array[index], index)) {
         result[rIndex] = map(array[index], rIndex++)
      }
   }
   return result
}
