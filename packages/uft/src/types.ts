/* Base */

export type AnyArray<T = any> = T[] | readonly T[]

export type EmptyArray = [] | readonly []

export type EmptyObject = Record<PropertyKey, never>

/* Is */

export type Is<TType, TIs> = TType extends TIs ? TIs : never
export type IsNot<TType, TNot> = TType extends TNot ? never : TType

/* Utility */

export type ValueOf<T> = T extends AnyArray ? T[number] : T[keyof T]

export type ToMutableArray<T> = T extends AnyArray ? inferArrayType<T>[]
   : never

/**
 * Distributes over `T` and returns those that extend `U`.
 *
 * @example
 * ```ts
 * // 'b' | 'c'
 * type A = AssignableTo<1 | 'b' | 'c', string>
 * // never
 * type B = AssignableTo<{ a: string }, string[]>
 * ```
 * @internal
 */
export type AssignableTo<T, U> = T extends U ? T : never

/**
 * Use of brackets is important here to avoid distributing `T`
 * into separate arrays, for example:
 *
 * `number | string` should become `(number | string)[]`, not `number[] | string[]`.
 *
 * However, this causes intellisense to show the full type name. Therefore we
 * require an extra type to display the array in its simplified form.
 *
 * @internal
 */
export type ToArray<T> = inferArray<
   (T extends readonly (infer U)[] ? U : T)[]
>

/**
 * Get the keys of a union type.
 *
 * @example
 * ```ts
 * type Union = { a: 1 } | { b: 2 }
 * type Bad = keyof Union // never
 * type Good = keyofUnion<Union> // 'a' | 'b'
 * ```
 * @internal
 */
export type keyofUnion<T> = T extends any ? keyof T : never

/* Type Guard */

export type Guard<TParam = any, TIs extends TParam = TParam> = (
   p: TParam,
   ..._: any[]
) => p is TIs

export type ReverseGuard<TGuard extends Guard> = (
   p: Parameters<TGuard>[0],
   ..._: any[]
) => p is IsNot<Parameters<TGuard>[0], inferPredicate<TGuard>>

export type inferPredicate<TGuard extends Guard> = TGuard extends
   (p: any, ..._: any[]) => p is infer TIs ? TIs : never

export type inferReversePredicate<TGuard extends Guard> = inferPredicate<
   ReverseGuard<TGuard>
>

/* infer */

/** @internal */
export type NoInfer<T> = [T][T extends any ? 0 : never]

// /** @internal */
// export type Expand<T> = T extends infer U ? U : never

/** @internal */
export type inferArrayType<T> = T extends readonly (infer U)[] ? U : never

/**
 * Simplifys a named array type down to its simplified form for a better
 * developer experience when using intellisense.
 * @internal
 */
export type inferArray<T> = T extends AnyArray ? T[number][] : never
