/* eslint-disable @typescript-eslint/unbound-method */

export const proto = Object.prototype
export const fnProto = Function.prototype

// TODO(fix): investigate swc stripping out the pure comments

const uncurryThis = /*#__PURE__*/ fnProto.bind.bind(fnProto.call, fnProto.call)
const callable = <T>(fn: Function): T => uncurryThis(fn) as T

export const hasOwn = /*#__PURE__*/ callable<
   (obj: object, v: PropertyKey) => boolean
>(proto.hasOwnProperty)

// export const toString = callable<
//    (obj: object) => string
// >(proto.toString)

export const isArray = Array.isArray
export const getProto = Object.getPrototypeOf
export const freeze = Object.freeze
