import type { array, join } from "./arrays.ts"
import type { Fn } from "./functions.ts"
import type { conform } from "./generics.ts"

export type stringifyUnion<
	t extends string,
	delimiter extends string = ", "
> = join<unionToTuple<t>, delimiter>

export type unionToTuple<t> =
	_unionToTuple<t, []> extends infer result ? conform<result, t[]> : never

type _unionToTuple<t, result extends unknown[]> =
	getLastBranch<t> extends infer current ?
		[t] extends [never] ?
			result
		:	_unionToTuple<Exclude<t, current>, [current, ...result]>
	:	never

type getLastBranch<t> =
	intersectUnion<t extends unknown ? (x: t) => void : never> extends (
		(x: infer branch) => void
	) ?
		branch
	:	never

export type intersectUnion<t> =
	(t extends unknown ? (_: t) => void : never) extends (
		(_: infer intersection) => void
	) ?
		intersection
	:	never

export type intersectOverloadReturns<fn extends Fn> = intersectUnion<
	ReturnType<overloadOf<fn>>
>

// Based on: https://tsplay.dev/WvydBm
export type overloadOf<
	fn extends Fn,
	givenArgs extends array = array
> = Exclude<
	collectSignatures<
		// The "() => never" signature must be hoisted to the "front" of the
		// intersection, for two reasons: a) because recursion stops when it is
		// encountered, and b) it seems to prevent the collapse of subsequent
		// "compatible" signatures (eg. "() => void" into "(a?: 1) => void"),
		// which gives a direct conversion to a union.
		(() => never) & fn,
		givenArgs,
		unknown
	>,
	fn extends () => never ? never : () => never
>

type collectSignatures<fn, givenArgs extends array, result> =
	result & fn extends (...args: infer args) => infer returns ?
		result extends fn ?
			never
		:	| collectSignatures<
					fn,
					givenArgs,
					Pick<fn, keyof fn> & result & ((...args: args) => returns)
			  >
			| (args extends givenArgs ? (...args: args) => returns : never)
	:	never
