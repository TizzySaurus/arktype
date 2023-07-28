import { stringify } from "@arktype/util"
import { Disjoint } from "../disjoint.js"
import { PredicateNode } from "./predicate.js"
import type { PredicateRule } from "./predicate.js"

export interface UnitRule extends PredicateRule {
	readonly value: unknown
}

export class UnitNode extends PredicateNode<UnitRule, typeof UnitNode> {
	static override writeDefaultBaseDescription(rule: UnitRule) {
		// TODO: add reference to for objects
		return stringify(rule.value)
	}
}
