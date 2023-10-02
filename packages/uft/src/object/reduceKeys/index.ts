import { hasOwn } from '../../internal/builtin'
import { isFunction } from '../../is/isFunction'
import type { EmptyObject, NoInfer } from '../../types'

/**
 * Calls a function for each key in an object and returns the accumulated result.
 *
 * @param obj The object to iterate over.
 * @param initialValue If provided, it is used as the initial value to start the accumulation. Otherwise, an empty object `{}` will be used.
 * @param callbackfn The function to call for each key where the first argument is the previous value of the accumulated result.
 * @returns The final accumulated result.
 *
 * @remarks
 * Keys are the object's own enumerable string-keyed property names,
 * the same as those returned by {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys | Object.keys()}.
 *
 * @example
 * #### Basic Usage
 * ```ts
 * // An empty object as the inital value:
 * const objectAccum = reduceKeys(
 *    { a: 'hello', b: 'world' },
 *    {},
 *    (accum, key, index, obj) => {
 *       accum // type: { a: string, b: string }
 *       accum[key] = obj[key].toUpperCase()
 *       return accum
 *    }
 * )
 * console.log(objectAccum) // { a: 'HELLO', b: 'WORLD' }
 *
 * // The inital value does not need to be an object.
 * // It can be any kind, for example a number:
 * const numberAccum = reduceKeys(
 *    { a: 1, b: 2, c: 3 },
 *    0,
 *    (accum, key, index, obj) => {
 *       accum // type: number
 *       return accum + obj[key]
 *    }
 * )
 * console.log(numberAccum) // 6
 * ```
 *
 * #### Custom return type
 * ```ts
 * // A custom return type can be specified in two ways.
 * // The second method will only work with an object type
 * // where the inital value is an empty object ({}).
 *
 * // 1. Specify a custom type using `as` on the inital value:
 * const strToNumAccum = reduceKeys(
 *    { a: '1', b: '2' },
 *    {} as { a: number; b: number },
 *    (accum, key, index, obj) => {
 *       accum // type: { a: number; b: number }
 *       obj // type: { a: string; b: string }
 *
 *       const strValue = obj[key]
 *       accum[key] = parseInt(strValue) * 10
 *       return accum
 *    }
 * )
 * console.log(strToNumAccum) // { a: 10, b: 20 }
 *
 * // 2. If the inital value is an empty object as shown above,
 * // you can omit it and specify the return type by overriding
 * // `previousValue` (accum) in the callback:
 * const strToNumAccum = reduceKeys(
 *    { a: '1', b: '2' },
 *    (accum: { a: number; b: number }, key, index, obj) => {
 *       obj // type: { a: string; b: string }
 *       // ... same as above
 *    }
 * )
 * ```
 * @category Object
 */

// Where the returned object is the same type as `obj`
// and `initialValue` is the same type as `obj` or `{}`.
export function reduceKeys<T extends object>(
   obj: T,
   initialValue: NoInfer<T> | EmptyObject,
   callbackfn: <K extends keyof T>(
      previousValue: T,
      key: K,
      currentIndex: number,
      obj: T
   ) => T
): T

// Where the returned object differs from the type of `obj`
// and is inferred from `initialValue`.
export function reduceKeys<T extends object, U>(
   obj: T,
   initialValue: U,
   callbackfn: <K extends keyof T>(
      previousValue: NoInfer<U>,
      key: K,
      currentIndex: number,
      obj: T
   ) => NoInfer<U>
): NoInfer<U>

// Where the returned object differs from the type of `obj`
// and is inferred from `previousValue` via overriding its type.
// Example:
//   reduce({ a: 1 }, (previousValue: Record<string, string>) => {
//     // ...
//     return previousValue
//   }) // type: Record<string, string>
export function reduceKeys<T extends object, U extends object>(
   obj: T,
   callbackfn: <K extends keyof T>(
      previousValue: U,
      key: K,
      currentIndex: number,
      obj: T
   ) => NoInfer<U>
): NoInfer<U>

export function reduceKeys(
   obj: object,
   initialValue: object | CallbackFn,
   callbackfn?: CallbackFn
): object {
   if (isFunction(initialValue)) {
      callbackfn = initialValue as CallbackFn
      initialValue = {}
   }
   let result = initialValue
   let idx = 0

   for (const key in obj) {
      if (hasOwn(obj, key)) {
         result = callbackfn!(result, key, idx++, obj)
      }
   }
   return result
}

type CallbackFn = (
   previousValue: object,
   key: PropertyKey,
   currentIndex: number,
   obj: object
) => object
