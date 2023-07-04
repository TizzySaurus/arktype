import { InputParameterName } from "../../compile/compile.js"
import { registry } from "../../compile/registry.js"
import type { Narrow } from "../../parse/tuple.js"
import { defineNode } from "../node.js"
import type { definePrimitive, PrimitiveNode } from "./primitive.js"

export type NarrowConfig = definePrimitive<{
    kind: "narrow"
    rule: Narrow
    meta: {}
    intersection: readonly Narrow[]
}>

export interface NarrowNode extends PrimitiveNode<NarrowConfig> {}

// intersect: (l, r) =>
//     // as long as the narrows in l and r are individually safe to check
//     // in the order they're specified, checking them in the order
//     // resulting from this intersection should also be safe.
//     intersectUniqueLists(l.children, r.children)

// TODO: allow changed order to be the same type
export const narrowNode = defineNode<NarrowNode>(
    {
        kind: "narrow",
        compile: (rule) => `${registry().register(rule)}(${InputParameterName})`
    },
    (base) => ({
        description: `valid according to ${base.rule.name}`
    })
)
