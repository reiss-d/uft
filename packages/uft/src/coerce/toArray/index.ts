import type { ToArray } from '../../types'

/**
 * Converts a value to an array it is not already one.
 *
 * @param maybeArray The value to convert.
 * @returns An array containing the value or the value itself if it was already an array.
 *
 * @example
 * #### Basic Usage
 * ```ts
 * const a = toArray(1) // type: number[]
 * console.log(a) // [1]
 *
 * const b = toArray([1, 2, 3]) // type: number[]
 * console.log(b) // [1, 2, 3]
 *
 * const itemOrItems: string | string[]
 * const c = toArray(itemOrItems) // type: string[]
 * ```
 * If the value is a union of different types, the return type is still a
 * single array.
 * ```ts
 * const strOrNum: string | number
 * const c = toArray(strOrNum) // type: (string | number)[]
 * c.push('hi')
 * c.push(1)
 * ```
 * @category Coerce
 * @category Array
 */
export function toArray<T>(maybeArray: T): ToArray<T> {
   if (Array.isArray(maybeArray)) {
      return maybeArray as unknown as ToArray<T>
   }
   return [maybeArray] as ToArray<T>
}
