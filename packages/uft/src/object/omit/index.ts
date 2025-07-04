import { hasOwn } from '../../internal/builtin'
import type { CoerceNumber, CoerceString } from '../../types'
import { forEachKey } from '../forEachKey'

/**
 * Creates a new object by copying all the keys from the given object, excluding
 * those specified.
 *
 * @param obj The object to copy.
 * @param keys The keys that should not be copied.
 * @returns A new object without the given keys.
 *
 * @example
 * #### Basic usage
 * ```ts
 * const obj = { a: 1, b: 2, c: 3 }
 * const newObj = omit(obj, ['b', 'c']) // type: { a: number }
 *
 * console.log(newObj) // prints: { a: 1 }
 * ```
 * @category Object
 */

export function omit<
   T extends object,
   K extends CoerceString<keyof T>,
>(
   obj: T,
   keys: K[]
   // TODO: Is there a better way to work around this problem?
   // `CoerceNumber<K>` is required because the string type of a numeric key
   // will not cause it to be omitted.
): Omit<T, K | CoerceNumber<K>>

// TODO: Improve this.
// Fallback for non-literal keys.
export function omit<T extends object>(
   obj: T,
   keys: string[]
): Record<string, T[keyof T]>

export function omit<T extends object, K extends CoerceString<keyof T>>(
   obj: T,
   keys: K[]
): Omit<T, K | CoerceNumber<K>> {
   const copied = {} as Omit<T, K | CoerceNumber<K>>

   for (const key in obj) {
      if (hasOwn(obj, key) && !keys.includes(key as unknown as K)) {
         // @ts-expect-error - Headache.
         copied[key] = obj[key]
      }
   }
   return copied
}
