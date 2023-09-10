/**
 * Insert an element into a sorted array using a binary search.
 * The array **must** already be sorted and will be **mutated** in-place.
 *
 * @param sortedArray The sorted array to insert into.
 * @param toInsert The element to insert.
 * @param compare Function used to determine where to insert, see {@link CompareFn}.
 * @param insertAfterEqual Whether to insert after equal elements. Defaults to `true`.
 * @returns The reference to the same sorted array.
 *
 * @remarks
 * The last parameter `insertAfterEqual` will determine where to insert when
 * there are equal elements:
 * - `true(default)` e.g `[equal, equal, toInsert]`
 * - `false` e.g `[toInsert, equal, equal]`
 * Note that setting this to false will be slower since more elements need to
 * be shifted to the right.
 *
 * @example
 * #### Basic usage
 * ```ts
 * sortedInsert(
 *   [1, 2, 4, 5],
 *   3,
 *   (item, toInsert) => item - toInsert
 * ) // [1, 2, 3, 4, 5]
 * ```
 *
 * By default an element is inserted after existing equal elements:
 * ```ts
 * // 'insert' element will come AFTER existing 'foo'
 * sortedInsert(
 *   [{ n: 0, v: 'foo' }, { n: 9, v: 'bar' }],
 *   { n: 0, v: 'insert' },
 *   (item, toInsert) => item.n - toInsert.n
 * ) // [{ n: 0, v: 'foo' }, { n: 0, v: 'insert' }, { n: 9, v: 'bar' }]
 *
 * ```
 *
 * Change this by setting `insertAfterEqual` to `false`:
 * ```ts
 * // now 'insert' element will come BEFORE existing 'foo'
 * sortedInsert(
 *   ..., // same as above
 *   false
 * ) // [{ n: 0, v: 'insert' }, { n: 0, v: 'foo' }, { n: 9, v: 'bar' }]
 * ```
 * @category Array
 */
export function sortedInsert<T extends unknown[]>(
   sortedArray: T,
   toInsert: T[number],
   compare: CompareFn<T>,
   insertAfterEqual = true
) {
   const insertBeforeEqual = !insertAfterEqual
   let l = 0
   let m = 0
   let h = sortedArray.length

   while (l < h) {
      m = (l + h) >>> 1

      const result = compare(sortedArray[m], toInsert)

      if (result > 0 || (result === 0 && insertBeforeEqual)) {
         // insert at/before
         h = m
      } else {
         // insert after
         l = m + 1
      }
      // if (result > 0) {
      //    // insert at/before
      //    h = m
      // } else if (result < 0 || insertAfterEqual) {
      //    // insert after
      //    l = m + 1
      // } else {
      //    // insert at/before
      //    h = m
      // }
   }
   sortedArray.splice(l, 0, toInsert)
   return sortedArray
}

/**
 * Function used to determine where to insert. Follows the same logic as the
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#parameters | Array.prototype.sort()} `compareFn` parameter.
 *
 * @param item An item currently in the array.
 * @param toInsert The item to be inserted.
 * @returns
 * - `< 0` to insert before `item`, i.e `[toInsert, item]`
 * - `> 0` to insert after  `item`, i.e `[item, toInsert]`
 * - `= 0` for equal elements
 *
 * @category Array
 */
export type CompareFn<T extends unknown[]> = (
   item: T[number],
   toInsert: T[number]
) => number
