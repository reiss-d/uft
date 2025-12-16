// Referenced in JSDoc.
import type { lazyObj } from '../lazyObj'

export type LazyOptions<T> = {
   /**
    * A function returning a boolean that determines whether the value should be
    * cached and returned on subsequent calls. Returning `true` keeps the default
    * behaviour while returning `false` disables the default lazy behaviour.
    * This function is called only once - when the value is first initialized.
    *
    * To decide whether to cache the value on subsequent calls, use
    * {@link LazyOptions.shouldReinitialize} instead.
    *
    * # Warning
    * If this function returns `false`, `shouldReinitialize` will be ignored.
    */
   shouldCache?: (initial: T) => boolean
   /**
    * A function returning a boolean that determines whether the cached value
    * should be discarded and reinitialized. This function is called every time
    * the lazy function is called to get the value.
    *
    * If you want to reinitialize on every call, use
    * {@link LazyOptions.shouldCache} instead.
    */
   shouldReinitialize?: (current: T) => boolean
}

/**
 * Lazy initialization of a value.
 *
 * The given function is only called once and the result is cached, which is
 * returned on subsequent calls.
 *
 * The given function is called the first time the returned lazy function
 * executes. On subsequent calls, the cached value is returned unless the
 * optional `shouldReinitialize` callback returns `true`, in which case the
 * cached value is discarded and reinitialized.
 *
 * @param fn A function initializing the value.
 * @param options Optional behavior overrides.
 * @returns A function returning the initialized value.
 *
 * @remarks
 * It is safe for the given function to return `undefined`, this will not cause
 * it to be called again. If you don't want to call a function every time you
 * need the value, try using {@link lazyObj `lazyObj`} instead.
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
 *
 * #### With `shouldCache` function
 * ```ts
 * // On the client, the query client will only be created once.
 * // On the server, every call to `getQueryClient` will create a new query client.
 * const isBrowser = () => typeof window !== 'undefined'
 * const getQueryClient = lazy(
 *    () => createQueryClient(),
 *    { shouldCache: isBrowser }
 * )
 * ```
 *
 * #### With `shouldReinitialize` function
 * ```ts
 * const getCounter = lazy(
 *    () => new Counter(),
 *    { shouldReinitialize: (counter) => counter.count >= 3 }
 * )
 * getCounter().inc() // 1
 * getCounter().inc() // 2
 * getCounter().inc() // 3
 * // The count is 3, so this call to `getCounter()` will reinitialize the counter.
 * getCounter().inc() // 1
 * ```
 * @category Misc
 */
export const lazy = <T>(fn: () => T, options?: LazyOptions<T>): () => T => {
   const shouldCache = options?.shouldCache
   const shouldReinitialize = options?.shouldReinitialize

   // We use a flag instead of checking for undefined because the function may
   // return undefined.
   let initialized = false
   let value: T | undefined
   let cacheValue = true

   // Fast path for the default behavior.
   if (!shouldCache && !shouldReinitialize) {
      return (): T => {
         if (initialized) {
            return value!
         }
         initialized = true
         return (value = fn())
      }
   }

   const initializeValue = (): T => {
      initialized = true
      value = fn()
      cacheValue = (shouldCache?.(value)) ?? true
      return value!
   }

   if (!shouldReinitialize) {
      return (): T => {
         if (initialized) {
            return cacheValue ? value! : fn()
         }
         return initializeValue()
      }
   }

   return (): T => {
      if (initialized) {
         if (!cacheValue || shouldReinitialize(value!)) {
            value = fn()
         }
         return value!
      }
      return initializeValue()
   }
}
