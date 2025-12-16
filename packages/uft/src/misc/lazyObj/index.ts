import { isFunction } from '../../is/isFunction'
import { lazy, type LazyOptions } from '../lazy'

// Referenced in JSDoc.
import type { lazyFn } from '../lazyFn'

export type OnlyObject<T extends object> = T extends
   Function | (new(...args: any[]) => any)
   ? 'Only objects can be returned by the given function. To return a function/ctor, use `lazyFn` instead.'
   : T

/**
 * Lazy initialization of an object.
 *
 * The given function is only called once and the result is cached, which is
 * returned on subsequent accesses.
 *
 * The given function is called the first time the returned proxy is accessed.
 * On subsequent accesses, the cached object is returned unless the optional
 * `shouldReinitialize` callback returns `true`, in which case the cached object
 * is discarded and reinitialized.
 *
 * @param fn A function initializing the object.
 * @param options Optional behavior overrides. See {@link lazy `lazy`} for examples.
 * @returns A proxy that only initializes the object when it is accessed.
 *
 * @remarks
 * The given function must return an object. To return a function or constructor,
 * use {@link lazyFn `lazyFn`} instead.
 *
 * # Warning
 * There is a lot of unexpected behaviour when using the proxy returned by this
 * function. If you need to perform equality checks with the lazy value, don't
 * use this function. If you are only accessing properties of the lazy value,
 * before performing any other operations, you can use this function safely.
 *
 * @example
 * #### Basic usage
 * ```ts
 * const person = lazyObj(() => {
 *    console.log('initializing')
 *    return {
 *       name: 'Bob',
 *       age: 30,
 *       sayHello: () => {
 *          return 'Hello!'
 *       },
 *    }
 * })
 *
 * // First access to the proxy will initialize the object.
 * person.name // 'Bob', logs 'initializing'
 * person.age // 30, no log
 * person.sayHello() // 'Hello!', no log
 * ```
 * @category Misc
 */
export function lazyObj<T extends object>(
   fn: () => OnlyObject<T>,
   options?: LazyOptions<T>
): T {
   const get = lazy(fn as () => T, options)
   const handler = createHandler(get)

   return new Proxy(Object.create(null) as any, handler) as T
}

/** @internal */
export function createHandler<
   T extends object | Function | (new(...args: any[]) => any),
>(
   get: () => T
): ProxyHandler<T> {
   const handler: ProxyHandler<T> = {
      get(_, prop, receiver) {
         const target = get()
         const value = Reflect.get(target, prop, receiver)
         // If it's a method, bind `target` to the `value`.
         return isFunction(value) ? value.bind(target) : value
      },

      set(_, prop, value, receiver) {
         return Reflect.set(get(), prop, value, receiver)
      },

      has(_, prop) {
         return Reflect.has(get(), prop)
      },

      ownKeys() {
         return Reflect.ownKeys(get())
      },

      getOwnPropertyDescriptor(_, prop) {
         return Reflect.getOwnPropertyDescriptor(get(), prop)
      },
   }

   return handler
}
