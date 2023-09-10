/**
 * Creates an array of values by running each index of the array
 * through a callback function to initialize its value.
 *
 * @param size The length of the array to create.
 * @param cb The function to initialize each element.
 * @returns The created array.
 *
 * @example
 * #### Basic usage
 * ```ts
 * forMap(3, (idx) => idx) // [0, 1, 2]
 *
 * forMap(3, (idx) => idx * 2) // [0, 2, 4]
 *
 * forMap(2, () => 'foo') // ['foo', 'foo']
 * ```
 * @category Array
 */
export const forMap = <T>(size: number, cb: (index: number) => T): T[] => {
   const array = new Array<T>(size)

   for (let i = 0; i < size; i++) {
      array[i] = cb(i)
   }
   return array
}
