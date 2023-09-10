/**
 * Applies a `filter` function to the elements of the given array, and then
 * calls a `forEach` function with each of the filtered elements.
 *
 * @param array The array to iterate over.
 * @param filter A function that determines whether an element should be included.
 * @param forEach A function to call for each included element.
 *
 * @example
 * #### Basic Usage
 * ```ts
 * filteredForEach(
 *   [1, 2, 3, 4, 5],
 *   (value) => value > 3,
 *   (value) => console.log(value ** 2)
 * ) // Prints: 16, 25
 * ```
 *
 * #### Type narrowing
 * ```ts
 * import { isString } from 'uft'
 *
 * filteredForEach(
 *   ['foo', { a: 1 }, [], 'bar'],
 *   isString,
 *   (value) => {
 *     value // type: string
 *     console.log(value.toUpperCase())
 *   }
 * ) // Prints: FOO, BAR
 * ```
 * @category Array
 */
export function filteredForEach<
   T extends readonly unknown[],
   S extends T[number],
>(
   array: T,
   filter: (element: T[number], index: number) => element is S,
   forEach: (element: S, index: number) => void
): void

export function filteredForEach<
   T extends readonly unknown[],
>(
   array: T,
   filter: (element: T[number], index: number) => boolean,
   forEach: (element: T[number], index: number) => void
): void

export function filteredForEach(
   array: unknown[],
   filter: (element: unknown, index: number) => boolean,
   forEach: (element: unknown, index: number) => void
) {
   for (let index = 0, rIndex = 0; index < array.length; index++) {
      if (filter(array[index], index)) {
         forEach(array[index], rIndex++)
      }
   }
}
