import { suite, test } from "mocha"
import { type } from "../../src/main.js"
import { writeUnresolvableMessage } from "../../src/parse/string/shift/operand/unenclosed.js"
import { incompleteArrayTokenMessage } from "../../src/parse/string/shift/operator/operator.js"
import { attest } from "../attest/main.js"

suite("parse array", () => {
    test("parse", () => {
        const t = type("string[]")
        attest(t.infer).typed as string[]
        attest(t.condition).snap(`$arkIn instanceof Array && (() => {
            let valid = true;
            for(let i = 0; i < $arkIn.length; i++) {
                valid = typeof $arkIn[i] === "string" && valid;
            }
            return valid
        })()`)
        attest(t.allows(["foo", "bar"])).snap(true)
        attest(t.allows(["foo", 5, "bar"])).snap(false)
    })
    test("nested", () => {
        const t = type("string[][]")
        attest(t.infer).typed as string[][]
        attest(t.condition).snap(`$arkRoot instanceof Array && (() => {
            let valid = true;
            for(let $arkIndex = 0; $arkIndex < $arkRoot.length; $arkIndex++) {
                valid = $arkRoot[$arkIndex] instanceof Array && (() => {
            let valid = true;
            for(let $arkIndexInner = 0; $arkIndexInner < $arkRoot[$arkIndex].length; $arkIndexInner++) {
                valid = typeof $arkRoot[$arkIndex][$arkIndexInner] === "string" && valid;
            }
            return valid
        })() && valid;
            }
            return valid
        })()`)
        attest(t.allows([])).snap(true)
        attest(t.allows([["foo"]])).snap(true)
        attest(t.allows(["foo"])).snap(false)
        attest(t.allows([["foo", 5]])).snap(false)
    })
    test("shallow array intersection", () => {
        const actual = type("string[]&'foo'[]").condition
        const expected = type("'foo'[]").condition
        attest(actual).is(expected)
    })
    test("deep array intersection", () => {
        const actual = type([{ a: "string" }, "[]"]).and([
            { b: "number" },
            "[]"
        ]).condition
        const expected = type([{ a: "string", b: "number" }, "[]"]).condition
        attest(actual).is(expected)
    })
    it("tuple intersection", () => {
        const t = type([[{ a: "string" }], "&", [{ b: "boolean" }]])
        attest(t.infer).typed as [
            {
                a: string
                b: boolean
            }
        ]
    })
    it("mixed tuple intersection", () => {
        const tupleAndArray = type([
            [{ a: "string" }],
            "&",
            [{ b: "boolean" }, "[]"]
        ])
        const arrayAndTuple = type([
            [{ b: "boolean" }, "[]"],
            "&",
            [{ a: "string" }]
        ])
        attest(tupleAndArray.infer).typed as [
            {
                a: string
                b: boolean
            }
        ]
        attest(arrayAndTuple.infer).typed as [
            {
                a: string
                b: boolean
            }
        ]
        const expected = type([{ a: "string", b: "boolean" }]).condition
        attest(tupleAndArray.condition).is(expected)
        attest(arrayAndTuple.condition).is(expected)
    })
    test("multiple errors", () => {
        const stringArray = type("string[]")
        attest(stringArray([1, 2]).problems?.summary).snap(
            "Item at index 0 must be a string (was number)\nItem at index 1 must be a string (was number)"
        )
    })

    test("tuple expression", () => {
        const t = type(["string", "[]"])
        attest(t.infer).typed as string[]
    })

    test("chained", () => {
        const t = type({ a: "string" }).array()
        attest(t.infer).typed as {
            a: string
        }[]
        // @ts-expect-error
        attest(() => arrayOf({ a: "hmm" })).throwsAndHasTypeError(
            writeUnresolvableMessage("hmm")
        )
    })
    test("incomplete token", () => {
        // @ts-expect-error
        attest(() => type("string[")).throwsAndHasTypeError(
            incompleteArrayTokenMessage
        )
    })
})
