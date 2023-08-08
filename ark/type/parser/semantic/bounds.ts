import type { Comparator, NumericallyBoundableData } from "@arktype/schema"
import type { error } from "@arktype/util"
import type { DateLiteral } from "../string/shift/operand/date.js"
import type {
	BoundKind,
	InvertedComparators,
	LimitLiteral,
	writeInvalidLimitMessage
} from "../string/shift/operator/bounds.js"
import type { inferAst } from "./semantic.js"
import type { astToString } from "./utils.js"
import type { validateAst } from "./validate.js"

export type validateRange<
	l,
	comparator extends Comparator,
	r,
	$,
	args
> = l extends LimitLiteral
	? validateBound<r, InvertedComparators[comparator], l, "left", $, args>
	: l extends [infer leftAst, Comparator, unknown]
	? error<writeDoubleRightBoundMessage<astToString<leftAst>>>
	: validateBound<l, comparator, r & LimitLiteral, "right", $, args>

export type validateBound<
	boundedAst,
	comparator extends Comparator,
	limit extends LimitLiteral,
	boundKind extends BoundKind,
	$,
	args
> = inferAst<boundedAst, $, args> extends infer bounded
	? [bounded] extends [NumericallyBoundableData]
		? limit extends number
			? validateAst<boundedAst, $, args>
			: error<writeInvalidLimitMessage<comparator, limit, boundKind>>
		: bounded extends Date
		? limit extends DateLiteral
			? validateAst<boundedAst, $, args>
			: error<writeInvalidLimitMessage<comparator, limit, boundKind>>
		: error<
				writeUnboundableMessage<
					astToString<
						boundKind extends "left"
							? boundedAst[0 & keyof boundedAst]
							: boundedAst
					>
				>
		  >
	: never

export const writeDoubleRightBoundMessage = <root extends string>(
	root: root
): writeDoubleRightBoundMessage<root> =>
	`Expression ${root} must have at most one right bound`

type writeDoubleRightBoundMessage<root extends string> =
	`Expression ${root} must have at most one right bound`

export const writeUnboundableMessage = <root extends string>(
	root: root
): writeUnboundableMessage<root> =>
	`Bounded expression ${root} must be a number, string, Array, or Date`

type writeUnboundableMessage<root extends string> =
	`Bounded expression ${root} must be a number, string, Array, or Date`