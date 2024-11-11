import { randomInt } from 'node:crypto'

export const randBool = () => randomInt(0, 1) === 0

export function randChoice<A, B>(a: A, b: B): A | B
export function randChoice<A, B, C>(a: A, b: B, c: C): A | B | C
export function randChoice<A, B, C, D>(a: A, b: B, c: C, d: D): A | B | C | D
export function randChoice(...choices: unknown[]): unknown {
   return choices[randomInt(0, choices.length - 1)]
}
