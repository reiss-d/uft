/**
 * A fulfilled promise result.
 *
 * @category Misc
 */
export interface FulfilledResult<T> extends PromiseFulfilledResult<T> {
   /**
    * Whether the promise was fulfilled.
    */
   isFulfilled: true
   /**
    * Whether the promise was rejected.
    */
   isRejected: false
}

/**
 * A rejected promise result.
 *
 * @category Misc
 */
export interface RejectedResult extends PromiseRejectedResult {
   /**
    * Whether the promise was fulfilled.
    */
   isFulfilled: false
   /**
    * Whether the promise was rejected.
    */
   isRejected: true
   /**
    * The reason why the promise was rejected.
    * @remarks
    * This is an unknown value because the reason can be anything,
    * however, it's most likely an instance of {@link Error}.
    */
   reason: unknown
}

/**
 * A settled promise result.
 *
 * @category Misc
 */
export type SettledResult<T> = FulfilledResult<T> | RejectedResult

/**
 * Typed version of [Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled), which defines two additional
 * properties on the result: `isFulfilled` and `isRejected`.
 *
 * @param values An array of promises.
 * @returns A promise that resolves to an array of {@link SettledResult | settled results}.
 *
 * @example
 * #### Basic usage
 * ```ts
 * async function getUser(name: string): Promise<{ id: string }> {...}
 * const results = await allSettled([
 *   getUser('alice'),
 *   getUser('nonexistent'), // will be rejected
 * ])
 * // results[0].isFulfilled // true
 * // results[1].isRejected // true
 * ```
 *
 * #### Type narrowing
 * ```ts
 * results.forEach((result) => {
 *   if (result.isFulfilled) {
 *      result.value // type: { id: string }
 *   } else {
 *      result.reason // type: unknown (Error)
 *   }
 * })
 * ```
 *
 * #### Usage with partition
 * ```ts
 * import { isFulfilled, partition } from "uft";
 *
 * const [fulfilled, rejected] = partition(results, isFulfilled)
 * fulfilled.forEach((result) => {
 *    result.value // type: { id: string }
 * })
 * rejected.forEach((result) => {
 *    result.reason // type: unknown (Error)
 * })
 * ```
 * @category Misc
 */
export async function allSettled<T extends readonly unknown[] | []>(
   values: T
): Promise<{ -readonly [P in keyof T]: SettledResult<Awaited<T[P]>> }>
export async function allSettled<T>(
   values: Iterable<T | PromiseLike<T>>
): Promise<SettledResult<Awaited<T>>[]>
export async function allSettled(
   values: unknown[] | Iterable<unknown>
): Promise<SettledResult<unknown>[]> {
   const results = await Promise.allSettled(values) as SettledResult<unknown>[]

   for (const result of results) {
      result.isFulfilled = result.status === 'fulfilled'
      result.isRejected = !result.isFulfilled
   }
   return results
}

/**
 * Checks if a {@link SettledResult | settled result} is fulfilled.
 * Tailored to work alongside {@link allSettled}.
 *
 * @param result The settled result to check.
 * @returns `true` if the result is fulfilled, `false` if it's rejected.
 *
 * @category Misc
 * @category Is
 */
export const isFulfilled = <T>(
   result: SettledResult<T>
): result is FulfilledResult<T> => {
   return result.isFulfilled
}
