/**
 * Typed version of {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys | Object.keys()}.
 *
 * @param obj The object whose enumerable own property names are to be returned.
 * @returns An array of the given object's own enumerable property names.
 *
 * @example
 * #### Basic Usage
 * ```ts
 * const obj = { a: 1, b: 2, c: 3 }
 * const keys = typedKeys(obj) // type: ('a' | 'b' | 'c')[]
 * console.log(keys) // ['a', 'b', 'c']
 * ```
 * @category Object
 */
export const typedKeys = Object.keys as <T extends object>(
   obj: T
) => (keyof T)[]
