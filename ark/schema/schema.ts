import type { apply, extend } from "@arktype/util"
import { DynamicBase, hktInput } from "@arktype/util"
import type {
	Basis,
	BasisKind,
	ConstraintClassesByKind,
	ConstraintsByKind
} from "./constraints/constraint.js"
import { PredicateNode } from "./roots/predicate.js"
import type { PredicateInputs } from "./roots/predicate.js"
import type { RootClassesByKind, RootsByKind } from "./roots/type.js"

export interface NodeSubclass<subclass extends NodeSubclass<subclass>> {
	new (schema: InstanceType<subclass>["schema"]): BaseNode

	parse(
		input: InstanceType<subclass>["schema"]
	): InstanceType<subclass>["schema"]
}

export interface BaseSchema {
	description?: string
}

export type BasisInput = inputFor<BasisKind>

export const node = <
	input extends PredicateInputs<basis>,
	basis extends BasisInput
>(
	...input: input
) =>
	new PredicateNode<apply<PredicateNode, input>>(
		PredicateNode.parse(input as never)
	)

// @ts-expect-error
export abstract class BaseNode<
	schema extends BaseSchema = BaseSchema,
	node extends NodeSubclass<node> = NodeSubclass<any>
> extends DynamicBase<schema> {
	abstract kind: NodeKind;

	declare [hktInput]: unknown

	constructor(public schema: schema) {
		super(schema)
	}

	hasKind<kind extends NodeKind>(kind: kind): this is Node<kind> {
		return this.kind === kind
	}

	// 	intersect(other: this): this | Disjoint {
	// 		if (this === other) {
	// 			return this
	// 		}
	// 		const intersection = methods.intersect(this.definition, other.definition)
	// 		return intersection instanceof Disjoint
	// 			? intersection
	// 			: new this.ownConstructor(intersection as never)
	// 	}
	// }

	id = this.hash()

	// TODO: remove
	condition = this.id

	equals(other: BaseNode) {
		return this.id === other.id
	}

	abstract hash(): string

	abstract writeDefaultDescription(): string
}

export type inputFor<kind extends NodeKind> = Parameters<
	NodeClassesByKind[kind]["parse"]
>[0]

export type NodeClassesByKind = extend<
	ConstraintClassesByKind,
	RootClassesByKind
>

export type NodesByKind = extend<ConstraintsByKind, RootsByKind>

export type NodeKind = keyof NodesByKind

export type Node<kind extends NodeKind = NodeKind> = NodesByKind[kind]
