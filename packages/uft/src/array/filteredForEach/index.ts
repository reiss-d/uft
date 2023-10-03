import type { AssignableTo } from '../../types'

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

// Requires that the type predicate of `filter` extends
// one of the elements of the array.
export function filteredForEach<
   T extends readonly unknown[],
   S extends T[number],
>(
   array: T,
   filter: (element: T[number], index: number) => element is S,
   forEach: (element: S, index: number) => void
): void

// Requires that an element of the array extends the
// type predicate of `filter`.
// This allows using a type guard that accepts an unknown
// value (a common use case) and returns a looser predicate
// which can be intersected with the element type.
// For example:
// ```ts
// const isObject = (value: unknown): value is object => {
//    return typeof value === 'object' && value !== null
// }
// filteredForEach(
//    [{ a: 1 }, { a: "hi" }, 99],
//    isObject,
//    (value) => {
//       value // type: { a: number} | { a: string }
//    }
// )
// ```
export function filteredForEach<
   T extends readonly unknown[],
   S,
>(
   array: T,
   filter: (element: T[number], index: number) => element is S,
   forEach: (element: AssignableTo<T[number], S>, index: number) => void
): void

// Does not require the use of a type predicate.
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
