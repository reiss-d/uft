import { hasOwn } from '../../internal/builtin'

/**
 * Calls a function for each key in an object and stores the results in an array.
 *
 * @param obj The object to iterate over.
 * @param callback The function to call for each key where the first argument is the key and the second is `obj`.
 * @returns An array containing the results.
 *
 * @remarks
 * Keys are the object's own enumerable string-keyed property names,
 * the same as those returned by {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys | Object.keys()}.
 *
 * @example
 * #### Basic Usage
 * ```ts
 * const result = mapKeys({ a: 1, b: 2, c: 3 }, (key, obj) => {
 *   key // type: 'a', 'b', 'c'
 *   return obj[key]
 * }) // type: number[]
 * console.log(result) // [1, 2, 3]
 * ```
 * @category Object
 */
export const mapKeys = <T extends object, R>(
   obj: T,
   callback: <K extends keyof T>(key: K, obj: T) => R
): R[] => {
   const result: R[] = []

   for (const key in obj) {
      if (hasOwn(obj, key)) {
         result.push(callback(key, obj))
      }
   }
   return result
}
