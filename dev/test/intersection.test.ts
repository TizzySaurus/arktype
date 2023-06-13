import { suite, test } from "mocha"
import { type } from "../../src/main.js"
import { node } from "../../src/nodes/composite/type.js"
import { writeUnsatisfiableExpressionError } from "../../src/parse/ast/ast.js"
import {
    writeMissingRightOperandMessage,
    writeUnresolvableMessage
} from "../../src/parse/string/shift/operand/unenclosed.js"
import { attest } from "../attest/main.js"

suite("intersection", () => {
    test("two types", () => {
        const t = type("boolean&true")
        attest(t.infer).typed as true
        attest(t.root).is(node.literal(true as const))
    })
    test("intersection parsed before union", () => {
        // Should be parsed as:
        // 1. "0" | ("1"&"string") | "2"
        // 2. "0" | "1" | "2"
        const t = type("'0'|'1'&string|'2'")
        attest(t.infer).typed as "0" | "1" | "2"
        // attest(t.node).snap({
        //     string: [{ value: "0" }, { value: "1" }, { value: "2" }]
        // })
    })
    test("tuple expression", () => {
        const t = type([{ a: "string" }, "&", { b: "number" }])
        attest(t.infer).typed as {
            a: string
            b: number
        }
    })
    test("regex", () => {
        const t = type("email&/@arktype.io$/")
        attest(t.infer).typed as string
        attest(t("shawn@arktype.io").data).snap("shawn@arktype.io")
        attest(t("shawn@arktype.oi").problems?.summary).snap(
            "Must be a string matching /@arktype.io$/ (was 'shawn@arktype.oi')"
        )
    })
    test("multiple valid types", () => {
        const t = type("email&lowercase<5")
        attest(t("ShawnArktype.io").problems?.summary).snap(
            "'ShawnArktype.io' must be...\n• a string matching /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$/\n• a string matching /^[a-z]*$/\n• less than 5 characters"
        )
    })
    test("several types", () => {
        const t = type("unknown&boolean&false")
        attest(t.infer).typed as false
        // attest(t.node).snap("false")
    })
    suite("literals", () => {
        test("class+literal", () => {})
        test("domain+literal", () => {})
        test("literal+literal", () => {})
        test("constraints + literal", () => {})
    })
    test("helper", () => {
        const t = type({ a: "string" }).and({ b: "boolean" })
        attest(t.infer).typed as {
            a: string
            b: boolean
        }
        // attest(t.node).snap({
        //     object: { props: { a: "string", b: "boolean" } }
        // })
    })
    test("string type", () => {
        const t = type([["string", "string"], "&", "alpha[]"])
        // attest(t.node).snap({
        //     object: {
        //         instance: "(function Array)",
        //         props: {
        //             "0": "alpha",
        //             "1": "alpha",
        //             length: ["!", { number: { value: 2 } }]
        //         }
        //     }
        // })
        attest(t(["1", 1]).problems?.summary).snap(
            "Item at index 0 must be only letters (was '1')\nItem at index 1 must be only letters (was number)"
        )
    })
    test("multiple types with union array", () => {
        const t = type([["number", "string"], "&", "('one'|1)[]"])
        // attest(t.node).snap({
        //     object: {
        //         instance: "(function Array)",
        //         props: {
        //             "0": { number: { value: 1 } },
        //             "1": { string: { value: "one" } },
        //             length: ["!", { number: { value: 2 } }]
        //         }
        //     }
        // })
    })
    suite("errors", () => {
        test("bad reference", () => {
            // @ts-expect-error
            attest(() => type("boolean&tru"))
                .throws(writeUnresolvableMessage("tru"))
                .types.errors("boolean&true")
        })
        test("double and", () => {
            // @ts-expect-error
            attest(() => type("boolean&&true")).throws(
                writeMissingRightOperandMessage("&", "&true")
            )
        })
        test("implicit never", () => {
            // TODO: can preserve for top-level never?             // @ts-expect-error
            // attest(() => type("string&number"))
            //     .throws(
            //         'Intersection at $arkRoot of "number" and "string" results in an unsatisfiable type'
            //     )
            //     .types.errors(
            //         writeUnsatisfiableExpressionError("string & number")
            //     )
        })
        test("chained semantic validation", () => {
            // @ts-expect-error
            attest(() => type("string").and("number"))
                .throws(
                    'Intersection at $arkRoot of "string" and "number" results in an unsatisfiable type'
                )
                .types.errors(writeUnsatisfiableExpressionError("intersection"))
        })
        test("chained validation", () => {
            attest(() =>
                // @ts-expect-error
                type({ a: "string" }).and({ b: "what" })
            ).throwsAndHasTypeError(writeUnresolvableMessage("what"))
        })
        test("at path", () => {
            attest(() =>
                // @ts-expect-error
                type({ a: "string" }).and({ a: "number" })
            )
                .throws(
                    "Intersection at $arkRoot.a of string and number results in an unsatisfiable type"
                )
                .types.errors(writeUnsatisfiableExpressionError("intersection"))
        })
    })
})
