/**
 * Accepts a value and returns a function that will compare against it.
 *
 * @param toCompare The value to compare against.
 * @returns A function that takes a value and returns the result of a strict equal with `toCompare`.
 *
 * @remarks
 * This function is useful within React components to keep your code looking
 * clean when a value must be compared against multiple times.
 *
 * @example
 * #### Basic Usage
 * ```ts
 * type Props = { status?: 'stale' | 'pending' | 'fulfilled' }
 *
 * const Component = (props: React.PropsWithChildren<Props>) => {
 *    const { status } = props
 *    const isStatus = createEq(status)
 *
 *    // no longer need to write `status === '...'` multiple times
 *    if (isStatus('stale')) {
 *       return <div>Stale</div>
 *    }
 *    if (isStatus('pending')) {
 *       return <div>Pending</div>
 *    }
 *    if (isStatus('fulfilled')) {
 *       return <div>Fulfilled</div>
 *    }
 *    return null
 * }
 * ```
 * @category Misc
 */
export const createEq = <T>(toCompare: T) => (value: T): boolean => {
   return value === toCompare
}
