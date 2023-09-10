import { hasOwn } from '../../internal/builtin'
import type { keyofUnion } from '../../types'

/**
 * Checks if an object has all of the provided own properties.
 *
 * @param obj The object to check.
 * @param keys The properties to check for.
 * @returns `true` if the check passes, `false` otherwise.
 *
 * @example
 * #### Basic Usage
 * ```ts
 * hasKeys({ a: 1, b: 2, c: 3 }, ['a', 'b']) // true
 * hasKeys({ foo: 1, bar: 2 }, ['buzz']) // false
 * ```
 *
 * #### Type narrowing
 * ```ts
 * const obj: { a: string; b: string } | { c: number; d: number }
 *
 * if (hasKeys(obj, ['a'])) {
 *   obj // type: { a: string; b: string; }
 *   obj.c // error
 * } else {
 *   obj // type: { c: number; d: number; }
 *   obj.a // error
 * }
 * ```
 *
 * #### Paired with assert
 * ```ts
 * import { assert } from 'uft'
 *
 * const obj: { a: string; b: string } | { c: number; d: number }
 * assert(hasKeys(obj, ['d']), 'expected object to have key "d"')
 * obj // type: { c: number; d: number }
 * ```
 * @category Object
 */
export function hasKeys<
   T extends object,
   K extends keyofUnion<T>,
   U extends readonly K[],
>(
   obj: T,
   keys: U
): obj is T extends { [P in U[number]]: unknown } ? T : never

export function hasKeys<T extends object>(
   obj: T,
   keys: PropertyKey[]
): boolean

export function hasKeys<T extends object>(
   obj: T,
   keys: PropertyKey[]
): boolean {
   for (const k of keys) {
      if (!hasOwn(obj, k)) {
         // object does not have provided key
         return false
      }
   }
   // object has all provided keys
   return true
}
