import type { ToMutableArray, inferReversePredicate } from '../../types'

/**
 * Creates two arrays, the first containing the elements for which
 * the predicate returned true, and the second containing the elements
 * for which the predicate returned false.
 *
 * @param array The array to partition.
 * @param predicate The predicate to match the elements against.
 * @returns A tuple containing the two arrays.
 *
 * @example
 * #### Basic usage
 * ```ts
 * const [even, odd] = partition(
 *   [1, 2, 3, 4, 5],
 *   (n) => n % 2 === 0 // (true if n is even)
 * )
 * console.log(even) // [2, 4]
 * console.log(odd) // [1, 3, 5]
 * ```
 *
 * #### Type narrowing
 * ```ts
 * import { isString } from 'uft'
 *
 * const [strings, other] = partition(
 *   [1, 'foo', { bar: '' }],
 *   isString
 * )
 * strings // type: string[]
 * other // type: (number | { bar: string })[]
 * ```
 * @category Array
 */
export function partition<
   T extends readonly unknown[],
   S extends T[number],
>(
   array: T,
   predicate: (element: T[number], index: number) => element is S
): [
   trueElements: S[],
   falseElements: inferReversePredicate<typeof predicate>[],
]

export function partition<T extends readonly unknown[]>(
   array: T,
   predicate: (element: T[number], index: number) => boolean
): [trueElements: ToMutableArray<T>, falseElements: ToMutableArray<T>]

export function partition(
   array: unknown[],
   predicate: (element: unknown, index: number) => boolean
): [trueElements: unknown[], falseElements: unknown[]] {
   const trueElements: unknown[] = []
   const falseElements: unknown[] = []

   for (let idx = 0; idx < array.length; idx++) {
      const element = array[idx]!
      predicate(element, idx)
         ? trueElements.push(element)
         : falseElements.push(element)
   }
   return [trueElements, falseElements]
}
