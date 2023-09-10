import { getProto, isArray } from '../../internal/builtin'

/**
 * Checks if a value passes `Array.isArray` and has prototype `Array.prototype`.
 *
 * @param value The value to check.
 * @returns `true` if the check passes, `false` otherwise.
 *
 * @remarks
 * This is useful for checking that the prototype of an array has not been
 * modified. However, this will return `false` for arrays created in other
 * realms since they will have a different prototype.
 *
 * @example
 * #### Basic usage
 * ```ts
 * isPlainArray([]) // true
 * isPlainArray(new Array()) // true
 *
 * isPlainArray(new Uint16Array()) // false
 * isPlainArray(Object.create(Array.prototype)) // false
 * isPlainArray(Object.create(null)) // false
 * isPlainArray(null) // false
 * ```
 *
 * Comparison with `Array.isArray`:
 * ```ts
 * class MyArray extends Array {}
 * Array.isArray(new MyArray()) // true
 * isPlainArray(new MyArray()) // false
 * ```
 * @category Is
 */
export const isPlainArray = (value: unknown): value is unknown[] => {
   return isArray(value) && getProto(value) === Array.prototype
}
