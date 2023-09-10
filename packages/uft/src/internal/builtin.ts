/* eslint-disable @typescript-eslint/unbound-method */

export const proto = Object.prototype
export const fnProto = Function.prototype

const uncurryThis = fnProto.bind.bind(fnProto.call, fnProto.call)
const callable = <T>(fn: Function): T => uncurryThis(fn.call) as T

export const hasOwn = callable<
   (obj: object, v: PropertyKey) => boolean
>(proto.hasOwnProperty)

// export const toString = callable<
//    (obj: object) => string
// >(proto.toString)

export const isArray = Array.isArray
export const getProto = Object.getPrototypeOf
export const freeze = Object.freeze
