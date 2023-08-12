import type { Orthogonal } from "../type.js"
import { BaseNode, orthogonal } from "../type.js"
import { ConstraintSet } from "./constraint.js"

export class PatternConstraint extends BaseNode<{
	rule: RegExp
	attributes: {}
	intersections: Orthogonal
}> {
	readonly literal = `${this.rule}` as `/${string}/${string}`
	readonly kind = "pattern"

	writeDefaultDescription() {
		// don't use this.literal here since it may not have been initialized
		return `matched by ${this.rule}`
	}

	intersectRules(): Orthogonal {
		return orthogonal
	}
}

export class PatternSet extends ConstraintSet<readonly PatternConstraint[]> {
	readonly kind = "patterns"

	override writeDefaultDescription() {
		return ""
	}
}

// converting a regex to a string alphabetizes the flags for us
export const serializeRegex = (regex: RegExp) =>
	`${regex}` as SerializedRegexLiteral

export type SerializedRegexLiteral = `/${string}/${string}`

export const sourceFromRegexLiteral = (literal: SerializedRegexLiteral) =>
	literal.slice(1, literal.lastIndexOf("/"))
