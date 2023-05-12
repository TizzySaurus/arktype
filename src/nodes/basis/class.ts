import type { abstractableConstructor } from "../../utils/objectKinds.js"
import {
    getExactBuiltinConstructorName,
    prototypeKeysOf
} from "../../utils/objectKinds.js"
import type { CompilationState } from "../compilation.js"
import { In } from "../compilation.js"
import { registry } from "../registry.js"
import { BasisNode } from "./basis.js"

export class ClassNode extends BasisNode<"class"> {
    readonly domain = "object"

    constructor(public instanceOf: abstractableConstructor) {
        super("class", ClassNode.compile(instanceOf))
    }

    static compile(instanceOf: abstractableConstructor) {
        return `${In} instanceof ${
            getExactBuiltinConstructorName(instanceOf) ??
            registry().register(instanceOf.name, instanceOf)
        }`
    }

    toString() {
        return this.instanceOf.name
    }

    literalKeysOf() {
        return prototypeKeysOf(this.instanceOf.prototype)
    }

    compileTraverse(s: CompilationState) {
        return s.ifNotThen(this.condition, s.problem("class", this.instanceOf))
    }
}