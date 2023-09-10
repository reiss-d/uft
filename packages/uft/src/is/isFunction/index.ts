/**
 * Checks if a value is `typeof function`.
 *
 * @param value The value to check.
 * @returns `true` if the check passes, `false` otherwise.
 *
 * @example
 * #### Basic usage
 * ```ts
 * isFunction(() => {}) // true
 * isFunction(function() {}) // true
 * isFunction(async function() {}) // true
 * isFunction({}) // false
 * ```
 *
 * #### Type narrowing
 * ```ts
 * const value: { foo: string } | (() => string)
 *
 * if (isFunction(value)) {
 *   value // type: (() => string)
 *   value() // ok
 *   value.foo // error
 * } else {
 *   value // type: { foo: string }
 *   value.foo // ok
 *   value() // error
 * }
 *
 * // or
 * if (!isFunction(value)) {
 *   value // type: { foo: string }
 * } else {
 *   value // type: (() => string)
 * }
 * ```
 * @category Is
 */
export const isFunction = (
   value: unknown
): value is Function => {
   return !!value && typeof value === 'function'
}
