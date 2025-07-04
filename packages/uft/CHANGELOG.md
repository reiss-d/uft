# uft

## 0.5.0

### Minor Changes

- feat: new method `lazy`
- feat: new method `omit`

### Patch Changes

- fix: only return string key types in `forEachKey`

## 0.4.0

### Minor Changes

- fix: support index signatures in `hasKeys`

## 0.3.1

### Patch Changes

- feat: new methods `noop` and `isError`

## 0.3.0

### Minor Changes

- feat: option to return index from `removeFirst` & `removeLast`

## 0.2.2

### Patch Changes

- deps: updated `@swc/helpers` to `v0.5.3`

## 0.2.1

### Patch Changes

- feat: new methods `at` & `isNotEmpty`

## 0.2.0

### Minor Changes

- feat: improved type predicates in several methods
  BREAKING CHANGE: In rare cases the type returned by the methods `filteredForEach`, `filteredMap` and `partition` will have changed.

## 0.1.6

### Patch Changes

- feat: new method `reduceKeys`

## 0.1.5

### Patch Changes

- fix: improper binding of `hasOwn`

## 0.1.4

### Patch Changes

- fix: `isPlainArray` not re-exported in main

## 0.1.3

### Patch Changes

- fix: intellisense auto imports
- perf: added pure comments to builtins

## 0.1.2

### Patch Changes

- fix: resolving type declarations with `moduleResolution: Node10`

## 0.1.1

### Patch Changes

- updated documentation links
