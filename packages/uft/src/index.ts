/**
 * # uft
 *
 * A collection of performant, strongly typed utilities to aid your Typescript application.
 *
 * ## Tree Shaking
 *
 * If you are using this library in a project that has a build step featuring
 * tree shaking (e.g. webpack, rollup, etc.), you can freely import methods
 * from the default entry point:
 * ```ts
 * import { filteredMap, isDefined } from 'uft'
 * ```
 * Otherwise, make use of the different export paths to ensure that only the code
 * for used methods is bundled:
 * ```ts
 * import { filteredMap } from 'uft/filteredMap'
 * import { isDefined } from 'uft/isDefined'
 * ```
 * @packageDocumentation
 */

// Is
export { assert } from './is/assert'
export { createAssert, type Assert } from './is/createAssert'
export { isDefined, isUndefined } from './is/isDefined'
export { isError } from './is/isError'
export { isFunction } from './is/isFunction'
export { isNotNull, isNull } from './is/isNull'
export { isNotNullish, isNullish } from './is/isNullish'
export { isNumber, isSafeInteger, isSafeNumber } from './is/isNumber'
export type { SafeInteger, SafeNumber } from './is/isNumber'
export { isObject } from './is/isObject'
export { isObjectLoose } from './is/isObjectLoose'
export { isPlainArray } from './is/isPlainArray'
export { isPlainObject } from './is/isPlainObject'
export { isString } from './is/isString'

// Array
export { at } from './array/at'
export { clearArray } from './array/clearArray'
export { filteredForEach } from './array/filteredForEach'
export { filteredMap } from './array/filteredMap'
export { forMap } from './array/forMap'
export { isEmpty, isNotEmpty } from './array/isEmpty'
export { partition } from './array/partition'
export { removeFirst } from './array/removeFirst'
export { removeLast } from './array/removeLast'
export { replaceArray } from './array/replaceArray'
export { sortedInsert } from './array/sortedInsert'
export { unique } from './array/unique'

// Coerce
export { boolToString } from './coerce/boolToString'
export { maybe } from './coerce/maybe'
export { stringToBool } from './coerce/stringToBool'
export { toArray } from './coerce/toArray'

// Object
export { forEachKey } from './object/forEachKey'
export { hasKeys } from './object/hasKeys'
export { mapKeys } from './object/mapKeys'
export { reduceKeys } from './object/reduceKeys'
export { typedKeys } from './object/typedKeys'

// Misc
export { allSettled, isFulfilled } from './misc/allSettled'
export type {
   FulfilledResult,
   RejectedResult,
   SettledResult,
} from './misc/allSettled'
export { createEq } from './misc/createEq'
export { noop } from './misc/noop'
export { isRetryOK, retry, type RetryResult } from './misc/retry'
export { timeout } from './misc/timeout'
