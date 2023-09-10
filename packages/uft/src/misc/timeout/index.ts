/**
 * Stop execution for a specified amount of time.
 *
 * @param ms The time in milliseconds to wait before resolving the Promise.
 * @param cb An optional callback function to execute before resolving the Promise.
 * @returns A Promise that resolves after the specified time has elapsed.
 *
 * @example
 * #### Basic usage
 * ```ts
 * // using async/await
 * async function main() {
 *   console.log('Before timeout.')
 *   await timeout(1000, () => console.log('A second has passed!'))
 *   console.log('After timeout.')
 * }
 * main()
 * // Before timeout.
 * // A second has passed!
 * // After timeout.
 *
 * // using Promise.then()
 * console.log('Before timeout.')
 * timeout(
 *   1000,
 *   () => console.log('A second has passed!')
 * ).then(
 *   () => console.log('Then...')
 * )
 * console.log('After timeout.')
 * // Before timeout.
 * // After timeout.
 * // A second has passed!
 * // Then...
 * ```
 * @category Misc
 */
export const timeout = <R = void>(ms: number, cb?: () => R) => {
   return new Promise<R>((resolve) =>
      setTimeout(() => resolve(cb?.() as R), ms)
   )
}
