### This is only relevant to contributors of this library.

Generic parameters which are arrays will always extend some variation
of `unknown[]` and are never inferred from `param: T[]` in this library.
Doing so allows array arguments which are union types.

```ts
declare const array: string[] | number[]
declare const bad: <T>(array: T[]) => void
declare const good: <T extends unknown[]>(array: T) => void

// generic `T` is inferred as `string`
// Argument of type 'string[] | number[]' is not assignable to
// parameter of type 'string[]'.
bad(array) // error

// generic `T` is inferred as `string[] | number[]`
good(array) // ok
```

The downside of this is that handling these generics internally can be
verbose. For example, empty array literals will need to be double cast.

```ts
const fn = <T extends unknown[]>(array: T) => {
   // 'never[]' is assignable to the constraint of type 'T',
   // but 'T' could be instantiated with a different subtype
   // of constraint 'unknown[]'.ts(2352)
   const _arr = [] as T // error

   const _arr = [] as unknown as T // ok
}
```

If a method takes an array, the writability of the generic type must be
considered:

1. The array is mutated - `T extends unknown[]`.
2. The array is only read - `T extends readonly unknown[]`.

```ts
const wArray: number[] = [1, 2]
const rArray: readonly number[] = [3, 4]

declare const mutating: <T extends unknown[]>(array: T) => void

mutating(wArray) // Ok
mutating(rArray) // Error

declare const nonMutating: <T extends readonly unknown[]>(array: T) => void

nonMutating(wArray) // Ok
nonMutating(rArray) // Ok
```
