/**
 * Coerces nullish values to `undefined`.
 *
 * @param value The value to coerce.
 * @returns `undefined` if the value is `null` or `undefined`, else the value itself.
 *
 * @example
 * #### Basic Usage
 * ```ts
 * maybe(1) // 1
 * maybe(null) // undefined
 * maybe(undefined) // undefined
 * ```
 * The returned value will have `null` removed from its type.
 * ```ts
 * const maybeStr: string | null
 * maybe(maybeStr) // type: string | undefined
 *
 * const maybeNum: number | null | undefined
 * maybe(maybeNum) // type: number | undefined
 * ```
 * @category Coerce
 */
export function maybe<T>(value: T): (T & {}) | undefined {
   if (value == null) { return undefined }
   return value
}
