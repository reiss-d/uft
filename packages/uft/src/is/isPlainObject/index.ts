import { getProto, proto } from '../../internal/builtin'

/**
 * Checks if a value has a prototype of `Object.prototype` or `null`.
 * To disallow a `null` prototype, pass `false` to `allowNullProto`.
 *
 * @param value The value to check.
 * @param allowNullProto Whether to allow a `null` prototype. Defaults to `true`.
 * @returns `true` if the check passes, `false` otherwise.
 *
 * @example
 * #### Basic usage
 * ```ts
 * isPlainObject({}) // true
 * isPlainObject(Object.create(Object.prototype)) // true
 * isPlainObject(Object.create(null)) // true
 *
 * isPlainObject([]) // false
 * isPlainObject(Object.create({})) // false
 *
 * class Foo {}
 * isPlainObject(new Foo()) // false
 * ```
 * When `allowNullProto` is `false`:
 * ```ts
 * // previously returned true
 * isPlainObject(Object.create(null), false) // false
 * ```
 * @category Is
 */
export const isPlainObject = <T>(
   value: T,
   allowNullProto = true
): value is T extends Function | readonly unknown[] ? never : (T & object) => {
   if (!value) { return false }

   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
   const prototype = getProto(value)
   return prototype === proto || (allowNullProto && prototype === null)
}
