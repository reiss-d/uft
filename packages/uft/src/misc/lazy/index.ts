/**
 * Lazy initialization of a value.
 *
 * The given function is only called once and the result is stored, which is
 * returned on subsequent calls.
 *
 * @param fn A function initializing the value.
 * @returns A function returning the initialized value.
 *
 * @remarks
 * It is safe for the given function to return `undefined`, this will not cause
 * it to be called again.
 *
 * @example
 * #### Basic usage
 * ```ts
 * const value = lazy(() => {
 *    console.log('initializing')
 *    return 1
 * })
 *
 * value() // 1, logs 'initializing'
 * value() // 1, no log
 * value() // 1, no log
 * ```
 * @category Misc
 */
export const lazy = <T>(fn: () => T): () => T => {
   // We use a flag instead of checking for undefined because the function may
   // return undefined.
   let initialized = false
   let value: T | undefined

   return () => {
      if (!initialized) {
         initialized = true
         value = fn()
      }
      return value!
   }
}
