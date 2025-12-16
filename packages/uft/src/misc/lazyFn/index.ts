import { lazy, type LazyOptions } from '../lazy'
import { createHandler } from '../lazyObj'

// Referenced in JSDoc.
import type { lazyObj } from '../lazyObj'

/**
 * Lazy initialization of a function or constructor.
 *
 * The given function is only called once and the result is cached, which is
 * returned on subsequent accesses.
 *
 * The given function is called the first time the returned proxy is accessed.
 * On subsequent accesses, the cached function/ctor is returned unless the
 * optional `shouldReinitialize` callback returns `true`, in which case the
 * cached function/ctor is discarded and reinitialized.
 *
 * @param fn A function initializing the function/ctor.
 * @param options Optional behavior overrides. See {@link lazy `lazy`} for examples.
 * @returns A proxy that only initializes the function/ctor when it is accessed.
 *
 * @remarks
 * The given function must return a function or constructor. To return an object,
 * use {@link lazyObj `lazyObj`} instead.
 *
 * # Warning
 * There is a lot of unexpected behaviour when using the proxy returned by this
 * function. If you need to perform equality checks with the lazy value, don't
 * use this function. If you are only calling/constructing the lazy value, before
 * performing any other operations, you can use this function safely.
 *
 * @example
 * ### Basic usage
 * ```ts
 * const sayHello = lazyFn(() => {
 *    console.log('initializing')
 *    return () => {
 *       return 'Hello!'
 *    }
 * })
 *
 * // First access to the proxy will initialize the function.
 * sayHello() // 'Hello!', logs 'initializing'
 * sayHello() // 'Hello!', no log
 * sayHello() // 'Hello!', no log
 * ```
 * ### Using with a constructor
 * ```ts
 * const Person = lazyFn(() => {
 *    console.log('initializing')
 *    return class Person {
 *       constructor(name: string) {
 *          this.name = name
 *       }
 *
 *       sayHello() {
 *          return `Hello, ${this.name}!`
 *       }
 *    }
 * })
 *
 * // First access to the proxy will initialize the ctor.
 * (new Person('John')).sayHello() // 'Hello, John!', logs 'initializing'
 * (new Person('Jane')).sayHello() // 'Hello, Jane!', no log
 * (new Person('Jim')).sayHello() // 'Hello, Jim!', no log
 * ```
 * @category Misc
 */
export function lazyFn<T extends Function | (new(...args: any[]) => any)>(
   fn: () => T,
   options?: LazyOptions<T>
): T {
   const get = lazy(fn, options)
   const handler: ProxyHandler<T> = {
      ...createHandler(get),
      apply(_, thisArgument, argumentsList) {
         return Reflect.apply(
            get(),
            thisArgument,
            argumentsList
         )
      },

      construct(_, argumentsList, newTarget) {
         return Reflect.construct(
            get(),
            argumentsList,
            newTarget
         )
      },
   }

   // Dummy so the proxy can be called/constructed when `T` is a function/ctor.
   // Cannot use an arrow function since it is not constructable.
   function dummy() {
      // No-op.
   }

   return new Proxy(dummy as any, handler) as T
}

/**
 * Alias for {@link lazyFn `lazyFn`}.
 */
export const lazyCtor = lazyFn
