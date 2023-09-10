# uft

A collection of performant, strongly typed utilities to aid your Typescript application.

## Table of contents

- [Installation](#installation)
- [Documentation](#documentation)
- [Tree Shaking](#tree-shaking)
- [API](#api)
  - [Array](#array)
  - [Coerce](#coerce)
  - [Is](#is)
  - [Object](#object)
  - [Misc](#misc)
- [License](#license)

## Installation

```bash
# using npm
npm install uft
# using pnpm
pnpm add uft
```

## Documentation

For an optimal development experience, this library is fully documented with JSDoc comments, including usage examples. If you're using VSCode, simply hover over any method to see its documentation inline, within your editor.

<!-- TODO: add docs link -->

For those who prefer a web-based reference, a documentation site generated with [TypeDoc](https://github.com/TypeStrong/typedoc) is available [here](./README.md).

## Tree Shaking

If you are using this library in a project that has a build step featuring tree shaking (e.g. webpack, rollup, etc.), you can freely import methods from the default entry point:

```ts
import { filteredMap, isDefined } from 'uft'
```

Otherwise, make use of the different export paths to ensure that only the code for used methods is bundled:

```ts
import { filteredMap } from 'uft/filteredMap'
import { isDefined } from 'uft/isDefined'
```

## API

### Categories

- [Array](#array)
- [Coerce](#coerce)
- [Is](#is)
- [Object](#object)
- [Misc](#misc)

<!-- TODO: add doc links for each method -->

#### Array

- [clearArray](src/array/clearArray)
- [filteredForEach](src/array/filteredForEach)
- [filteredMap](src/array/filteredMap)
- [forMap](src/array/forMap)
- [isEmpty](src/array/isEmpty)
- [partition](src/array/partition)
- [removeFirst](src/array/removeFirst)
- [removeLast](src/array/removeLast)
- [replaceArray](src/array/replaceArray)
- [sortedInsert](src/array/sortedInsert)
- [unique](src/array/unique)

#### Coerce

- [boolToString](src/coerce/boolToString)
- [maybe](src/coerce/maybe)
- [stringToBool](src/coerce/stringToBool)
- [toArray](src/coerce/toArray)

#### Is

- [assert](src/is/assert)
- [createAssert](src/is/createAssert)
- [isDefined](src/is/isDefined)
- [isUndefined](src/is/isDefined)
- [isFunction](src/is/isFunction)
- [isNull](src/is/isNull)
- [isNotNull](src/is/isNull)
- [isNullish](src/is/isNullish)
- [isNotNullish](src/is/isNullish)
- [isNumber](src/is/isNumber)
- [isObject](src/is/isObject)
- [isObjectLoose](src/is/isObjectLoose)
- [isPlainArray](src/is/isPlainArray)
- [isPlainObject](src/is/isPlainObject)
- [isSafeInteger](src/is/isSafeInteger)
- [isSafeNumber](src/is/isSafeNumber)
- [isString](src/is/isString)

#### Object

- [forEachKey](src/object/forEachKey)
- [hasKeys](src/object/hasKeys)
- [mapKeys](src/object/mapKeys)
- [typedKeys](src/object/typedKeys)

#### Misc

- [allSettled](src/misc/allSettled)
- [isFulfilled](src/misc/allSettled)
- [createEq](src/misc/createEq)
- [retry](src/misc/retry)
- [isRetryOK](src/misc/retry)
- [timeout](src/misc/timeout)

## License

See [license](./LICENSE).
