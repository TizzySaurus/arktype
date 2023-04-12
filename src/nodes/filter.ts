import type { Filter } from "../parse/ast/filter.js"
import { intersectUniqueLists } from "../utils/generics.js"
import { Node } from "./node.js"
import type { CompilationState } from "./node.js"

export class FilterNode extends Node<typeof FilterNode> {
    constructor(predicates: Filter | Filter[]) {
        super(
            FilterNode,
            typeof predicates === "function" ? [predicates] : predicates
        )
    }

    static compile(sources: Filter[], c: CompilationState) {
        return sources
            .sort()
            .map(
                (source) =>
                    `${source}.test(${c.data}) || ${c.problem(
                        "regex",
                        "`" + source + "`"
                    )}` as const
            )
            .join(";")
    }

    intersect(other: FilterNode) {
        return new FilterNode(intersectUniqueLists(this.child, other.child))
    }
}