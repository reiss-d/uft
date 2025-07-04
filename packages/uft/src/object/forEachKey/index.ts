import { hasOwn } from '../../internal/builtin'
import type { CoerceString } from '../../types'

/**
 * Calls a function for each key in an object.
 *
 * @param obj The object to iterate over.
 * @param callback The function to call for each key where the first argument is the key and the second is `obj`.
 *
 * @remarks
 * Keys are the object's own enumerable string-keyed property names,
 * the same as those returned by {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys | Object.keys()}.
 *
 * @example
 * #### Basic Usage
 * ```ts
 * forEachKey({ a: 1, b: 2, c: 3 }, (key, obj) => {
 *   key // type: 'a', 'b', 'c'
 *   console.log(obj[key])
 * }) // Prints: 1, 2, 3
 * ```
 * @category Object
 */
export const forEachKey = <T extends object>(
   obj: T,
   callback: (key: CoerceString<keyof T>, obj: T) => void
): void => {
   for (const key in obj) {
      if (hasOwn(obj, key)) {
         callback(key, obj)
      }
   }
}
