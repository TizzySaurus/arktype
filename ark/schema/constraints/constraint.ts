import { type extend } from "@arktype/util"
import type { Disjoint } from "../disjoint.js"
import type { PredicateNode } from "../predicate.js"
import { BaseNode } from "../type.js"
import type { UnionNode } from "../union.js"
import type { ConstructorConstraint } from "./constructor.js"
import type { DivisibilityConstraint } from "./divisibility.js"
import type { DomainConstraint } from "./domain.js"
import type { IdentityConstraint } from "./identity.js"
import type { NarrowConstraint } from "./narrow.js"
import type { PropConstraint } from "./prop/prop.js"
import type { RangeConstraint } from "./range.js"
import type { RegexConstraint } from "./regex.js"

export abstract class ConstraintNode<rule = unknown> extends BaseNode<rule> {
	assertAllowedBy?(basis: BasisConstraint): void
}

export type BasisConstraint = DomainConstraint | ConstructorConstraint

export type ConstraintsByKind = {
	constructor: ConstructorConstraint
	domain: DomainConstraint
	range: RangeConstraint
	divisibility: DivisibilityConstraint
	identity: IdentityConstraint
	narrow: NarrowConstraint
	regex: RegexConstraint
	prop: PropConstraint
}

export type ConstraintKind = keyof ConstraintsByKind

export type Constraint = ConstraintsByKind[ConstraintKind]

export type ConstraintSet = readonly ConstraintNode[]

// export const assertAllowsConstraint = (
// 	basis: Node<BasisKind> | null,
// 	node: Node<RefinementKind>
// ) => {
// 	if (basis?.hasKind("unit")) {
// 		return throwInvalidConstraintError(
// 			node.kind,
// 			"a non-literal type",
// 			basis.toString()
// 		)
// 	}
// 	const domain = basis?.domain ?? "unknown"
// 	switch (node.kind) {
// 		case "divisor":
// 			if (domain !== "number") {
// 				throwParseError(writeIndivisibleMessage(domain))
// 			}
// 			return
// 		case "bound":
// 			if (domain !== "string" && domain !== "number") {
// 				const isDateClassBasis =
// 					basis?.hasKind("class") && basis.extendsOneOf(Date)
// 				if (isDateClassBasis) {
// 					if (!isDateLiteral(node.rule.limit)) {
// 						throwParseError(
// 							writeInvalidLimitMessage(
// 								node.rule.comparator,
// 								node.rule.limit,
// 								// TODO: we don't know if this is true, validate range together
// 								"right"
// 							)
// 						)
// 					}
// 					return
// 				}
// 				const hasSizedClassBasis =
// 					basis?.hasKind("class") && basis.extendsOneOf(Array)
// 				if (!hasSizedClassBasis) {
// 					throwParseError(writeUnboundableMessage(domain))
// 				}
// 			}
// 			if (typeof node.rule.limit !== "number") {
// 				throwParseError(
// 					writeInvalidLimitMessage(
// 						node.rule.comparator,
// 						node.rule.limit,
// 						// TODO: we don't know if this is true, validate range together
// 						"right"
// 					)
// 				)
// 			}
// 			return
// 		case "regex":
// 			if (domain !== "string") {
// 				throwInvalidConstraintError("regex", "a string", domain)
// 			}
// 			return
// 		case "props":
// 			if (domain !== "object") {
// 				throwInvalidConstraintError("props", "an object", domain)
// 			}
// 			return
// 		case "narrow":
// 			return
// 		default:
// 			throwInternalError(`Unexpected rule kind '${(node as Node).kind}'`)
// 	}
// }

// export const writeInvalidConstraintMessage = (
// 	kind: RefinementKind,
// 	typeMustBe: string,
// 	typeWas: string
// ) => {
// 	return `${kind} constraint may only be applied to ${typeMustBe} (was ${typeWas})`
// }

// export const throwInvalidConstraintError = (
// 	...args: Parameters<typeof writeInvalidConstraintMessage>
// ) => throwParseError(writeInvalidConstraintMessage(...args))
