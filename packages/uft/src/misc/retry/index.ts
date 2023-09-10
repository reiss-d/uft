import { timeout } from '../timeout'

/**
 * Continuously retries a given function until it succeeds or the number of
 * retries is exceeded.
 *
 * @param fn The function to retry.
 * @param retries The number of times to retry the function.
 * @param interval The time to wait between retries. (ms)
 * @returns A promise that resolves to a {@link RetryResult}.
 *
 * @remarks
 * The function will be called `retries + 1` times.
 * The result can can also be checked with the helper {@link isRetryOK}.
 *
 * @example
 * #### Basic usage
 * ```ts
 * // if the fetch fails, retry 3 times with a 1 second interval
 * const result = await retry(
 *   () => fetch('https://example.com'),
 *   3,
 *   1000
 * )
 * if ('ok' in result) {
 *   console.log(result.ok)
 * } else {
 *   console.error(result.err)
 * }
 *
 * // or
 * import { isRetryOK } from 'uft'
 *
 * if (isRetryOK(result)) {
 *   console.log(result.ok)
 * } else {
 *   console.error(result.err)
 * }
 * ```
 * @category Misc
 */
export const retry = async <R>(
   fn: () => Promise<R>,
   retries: number,
   interval: number
): Promise<RetryResult<R>> => {
   try {
      const res = await fn()
      return { ok: res }
   } catch (err) {
      if (retries === 0) {
         return { err }
      }
      await timeout(interval)
      return retry(fn, retries - 1, interval)
   }
}

/**
 * Represents the result of a {@link retry} operation.
 *
 * The object will have one of two properties: `ok` or `err`, but never both.
 *
 * If the operation was:
 * - successful, `ok` will be defined with the result of the function call.
 * - unsuccessful, `err` will be defined with the last error thrown.
 */
export type RetryResult<R> = { ok: R } | { err: unknown }

/**
 * Checks if a {@link RetryResult} was successful, i.e. if the `ok` property is
 * defined.
 *
 * @param result The result to check.
 * @returns `true` if the result was successful, `false` otherwise.
 *
 * @example
 * #### Basic usage
 * ```ts
 * const result: RetryResult<string>
 * if (isRetryOK(result)) {
 *   console.log(result.ok)
 * } else {
 *   console.error(result.err)
 * }
 * ```
 *
 * #### Type narrowing
 * ```ts
 * const result: RetryResult<number>
 * if (isRetryOK(result)) {
 *   result.ok // type: number
 * } else {
 *   result.err // type: unknown (probably Error)
 * }
 *
 * // or
 * if (!isRetryOK(result)) {
 *   result.err // type: unknown (probably Error)
 * } else {
 *   result.ok // type: number
 * }
 * ```
 * @category Misc
 * @category Is
 */
export const isRetryOK = (
   result: RetryResult<unknown>
): result is { ok: unknown } => {
   return 'ok' in result
}
