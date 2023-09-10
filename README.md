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

For those who prefer a web-based reference, a documentation site generated with [TypeDoc](https://github.com/TypeStrong/typedoc) is available [here](https://reiss-d.github.io/uft/modules.html).

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

#### Array

- [clearArray](https://reiss-d.github.io/uft/functions/clearArray)
- [filteredForEach](https://reiss-d.github.io/uft/functions/filteredForEach)
- [filteredMap](https://reiss-d.github.io/uft/functions/filteredMap)
- [forMap](https://reiss-d.github.io/uft/functions/forMap)
- [isEmpty](https://reiss-d.github.io/uft/functions/isEmpty)
- [partition](https://reiss-d.github.io/uft/functions/partition)
- [removeFirst](https://reiss-d.github.io/uft/functions/removeFirst)
- [removeLast](https://reiss-d.github.io/uft/functions/removeLast)
- [replaceArray](https://reiss-d.github.io/uft/functions/replaceArray)
- [sortedInsert](https://reiss-d.github.io/uft/functions/sortedInsert)
- [unique](https://reiss-d.github.io/uft/functions/unique)

#### Coerce

- [boolToString](https://reiss-d.github.io/uft/functions/boolToString)
- [maybe](https://reiss-d.github.io/uft/functions/maybe)
- [stringToBool](https://reiss-d.github.io/uft/functions/stringToBool)
- [toArray](https://reiss-d.github.io/uft/functions/toArray)

#### Is

- [assert](https://reiss-d.github.io/uft/functions/assert-1)
- [createAssert](https://reiss-d.github.io/uft/functions/createAssert)
- [isDefined](https://reiss-d.github.io/uft/functions/isDefined)
- [isUndefined](https://reiss-d.github.io/uft/functions/isUndefined)
- [isFunction](https://reiss-d.github.io/uft/functions/isFunction)
- [isNull](https://reiss-d.github.io/uft/functions/isNull)
- [isNotNull](https://reiss-d.github.io/uft/functions/isNotNull)
- [isNullish](https://reiss-d.github.io/uft/functions/isNullish)
- [isNotNullish](https://reiss-d.github.io/uft/functions/isNotNullish)
- [isNumber](https://reiss-d.github.io/uft/functions/isNumber)
- [isObject](https://reiss-d.github.io/uft/functions/isObject)
- [isObjectLoose](https://reiss-d.github.io/uft/functions/isObjectLoose)
- [isPlainArray](https://reiss-d.github.io/uft/functions/isPlainArray)
- [isPlainObject](https://reiss-d.github.io/uft/functions/isPlainObject)
- [isSafeInteger](https://reiss-d.github.io/uft/functions/isSafeInteger)
- [isSafeNumber](https://reiss-d.github.io/uft/functions/isSafeNumber)
- [isString](https://reiss-d.github.io/uft/functions/isString)

#### Object

- [forEachKey](https://reiss-d.github.io/uft/functions/forEachKey)
- [hasKeys](https://reiss-d.github.io/uft/functions/hasKeys)
- [mapKeys](https://reiss-d.github.io/uft/functions/mapKeys)
- [typedKeys](https://reiss-d.github.io/uft/functions/typedKeys)

#### Misc

- [allSettled](https://reiss-d.github.io/uft/functions/allSettled)
- [isFulfilled](https://reiss-d.github.io/uft/functions/isFulfilled)
- [createEq](https://reiss-d.github.io/uft/functions/createEq)
- [retry](https://reiss-d.github.io/uft/functions/retry)
- [isRetryOK](https://reiss-d.github.io/uft/functions/isRetryOK)
- [timeout](https://reiss-d.github.io/uft/functions/timeout)

## License

See [license](./LICENSE).
