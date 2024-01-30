/**
 * Takes an integer value and returns the item at that index, allowing for
 * positive and negative integers. Negative integers count back from the last
 * item in the array-like.
 *
 * @param array The array-like to search.
 * @param index The index of the item to return.
 * @returns The item at the given index.
 *
 * @example
 * #### Basic usage
 * ```ts
 * at(["a", "b"], 0) // "a"
 * at(["a", "b"], 1) // "b"
 * at(["a", "b"], 9) // undefined
 * at(["a", "b"], -1) // "b"
 * at(["a", "b"], -2) // "a"
 * at(["a", "b"], -9) // undefined
 *
 * at("bar", 2) // "r"
 * at("bar", -1) // "r"
 *
 * at(null, 0) // undefined
 * at(undefined, 1) // undefined
 * ```
 * @category Array
 */
export const at = <T extends ArrayLike<unknown>>(
   array: T | null | undefined,
   index: number
): T[number] | undefined => {
   if (!array) { return undefined }
   if (index < 0) { index += array.length }
   return (index < 0 || index >= array.length) ? undefined : array[index]
}
