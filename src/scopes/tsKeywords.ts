import { node } from "../nodes/type.js"
import type { Inferred } from "../parse/definition.js"
import { Scope } from "../scope.js"

// "bigint": "a bigint",
// "boolean": "a boolean",
// "false": "false",
// "never": "never",
// "null": "null",
// "number": "a number",
// "object": "an object",
// "string": "a string",
// "symbol": "a symbol",
// "true": "true",
// "unknown": "unknown",
// "void": "void",
// "undefined": "undefined"

export const tsKeyword = Scope.root({
    any: "unknown" as Inferred<any>,
    bigint: node({ basis: "bigint" }),
    boolean: "true|false",
    false: node({ basis: ["===", false as const] }),
    never: node(),
    null: node({ basis: ["===", null] }),
    number: node({ basis: "number" }),
    object: node({ basis: "object" }),
    string: node({ basis: "string" }),
    symbol: node({ basis: "symbol" }),
    true: node({ basis: ["===", true as const] }),
    unknown: node({ basis: undefined }),
    void: "undefined" as Inferred<void>,
    undefined: node({ basis: ["===", undefined] })
})

export const tsKeywordTypes = tsKeyword.export()
