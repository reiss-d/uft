/**
 * Converts a string to a boolean value.
 *
 * @param value The string to convert.
 * @returns The boolean value of the string, or `false` if the string cannot be converted.
 *
 * @example
 * #### Basic usage
 * ```ts
 * stringToBool('true') // true
 * stringToBool('TRUE') // true
 * stringToBool('TrUe') // true
 *
 * stringToBool('false') // false
 * stringToBool('trueee') // false
 * stringToBool('1') // false
 * stringToBool(null) // false
 * stringToBool(undefined) // false
 * ```
 * @category Coerce
 */
export const stringToBool = (value?: string | null): boolean => {
   return value?.toLowerCase() === 'true'
}
