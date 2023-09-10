/**
 * Converts a boolean to a string value.
 *
 * @param value The string to convert.
 * @returns The string `"true"` if the boolean strict equals `true`, otherwise the string `"false"`.
 *
 * @example
 * #### Basic usage
 * ```ts
 * boolToString(true) // "true"
 * boolToString(false) // "false"
 * boolToString(null) // "false"
 * boolToString(undefined) // "false"
 * ```
 * @category Coerce
 */
export const boolToString = (value?: boolean | null): 'true' | 'false' => {
   return value === true ? 'true' : 'false'
}
