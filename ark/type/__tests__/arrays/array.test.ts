import { attest, contextualize } from "@ark/attest"
import { scope, type } from "arktype"
import { incompleteArrayTokenMessage } from "arktype/internal/parser/shift/operator/operator.ts"
import {
	multipleVariadicMesage,
	writeNonArraySpreadMessage
} from "arktype/internal/parser/tupleLiteral.ts"

contextualize(() => {
	describe("non-tuple", () => {
		it("allows and apply", () => {
			const t = type("string[]")
			attest<string[]>(t.infer)
			attest(t.allows([])).equals(true)
			attest(t([])).snap([])
			attest(t.allows(["foo", "bar"])).equals(true)
			attest(t(["foo", "bar"])).snap(["foo", "bar"])
			attest(t.allows(["foo", "bar", 5])).equals(false)
			attest(t(["foo", "bar", 5]).toString()).snap(
				"value at [2] must be a string (was a number)"
			)
			attest(t.allows([5, "foo", "bar"])).equals(false)
			attest(t([5, "foo", "bar"]).toString()).snap(
				"value at [0] must be a string (was a number)"
			)
		})

		it("nested", () => {
			const t = type("string[][]")
			attest<string[][]>(t.infer)
			attest(t.allows([])).equals(true)
			attest(t([])).snap([])
			attest(t.allows([["foo"]])).equals(true)
			attest(t([["foo"]])).snap([["foo"]])
			attest(t.allows(["foo"])).equals(false)
			attest(t(["foo"]).toString()).snap(
				"value at [0] must be an array (was string)"
			)
			attest(t.allows([["foo", 5]])).equals(false)
			attest(t([["foo", 5]]).toString()).snap(
				"value at [0][1] must be a string (was a number)"
			)
		})

		it("tuple expression", () => {
			const t = type(["string", "[]"])
			attest<string[]>(t.infer)
			attest(t.json).equals(type("string[]").json)
		})

		it("root expression", () => {
			const t = type("string", "[]")
			attest<string[]>(t.infer)
			attest(t.json).equals(type("string[]").json)
		})

		it("chained", () => {
			const t = type({ a: "string" }).array()
			attest<{ a: string }[]>(t.infer)
			attest(t.expression).snap("{ a: string }[]")
		})

		it("incomplete token", () => {
			// @ts-expect-error
			attest(() => type("string[")).throwsAndHasTypeError(
				incompleteArrayTokenMessage
			)
		})
	})

	describe("non-variadic tuple", () => {
		it("empty", () => {
			const t = type([])
			attest<[]>(t.infer)
			attest(t.expression).snap("[]")
			attest(t.json).snap({ proto: "Array", exactLength: 0 })
			attest(t([])).equals([])
			attest(t([1]).toString()).snap("must be exactly length 0 (was 1)")
		})

		it("shallow", () => {
			const t = type(["string", "number"])
			attest<[string, number]>(t.infer)
			attest(t.allows(["", 0])).equals(true)
			attest(t(["", 0])).snap(["", 0])
			attest(t.allows([true, 0])).equals(false)
			attest(t([true, 0]).toString()).snap(
				"value at [0] must be a string (was boolean)"
			)
			attest(t.allows([0, false])).equals(false)
			attest(t([0, false]).toString())
				.snap(`value at [0] must be a string (was a number)
value at [1] must be a number (was boolean)`)
			// too short
			attest(t.allows([""])).equals(false)
			attest(t([""]).toString()).snap("must be exactly length 2 (was 1)")
			// too long
			attest(t.allows(["", 0, 1])).equals(false)
			attest(t(["", 0, 1]).toString()).snap("must be exactly length 2 (was 3)")
			// non-array
			attest(
				t.allows({
					length: 2,
					0: "",
					1: 0
				})
			).equals(false)
			attest(
				t({
					length: 2,
					0: "",
					1: 0
				}).toString()
			).snap("must be an array (was object)")
		})

		it("nested", () => {
			const t = type([["string", "number"], [{ a: "bigint", b: ["null"] }]])
			attest<
				[
					[string, number],
					[
						{
							a: bigint
							b: [null]
						}
					]
				]
			>(t.infer)
			const valid: typeof t.infer = [["", 0], [{ a: 0n, b: [null] }]]
			attest(t.allows(valid)).equals(true)
			attest(t(valid)).equals(valid)
			const invalid = [["", 0], [{ a: 0n, b: [undefined] }]]
			attest(t.allows(invalid)).equals(false)
			attest(t(invalid).toString()).snap(
				"value at [1][0].b[0] must be null (was undefined)"
			)
		})

		it("optional tuple", () => {
			const t = type([["string", "?"]])
			attest<[string?]>(t.infer)
			attest(t([])).equals([])
			attest(t(["foo"])).equals(["foo"])
			attest(t([5]).toString()).snap(
				"value at [0] must be a string (was a number)"
			)
			attest(t(["foo", "bar"]).toString()).snap(
				"must be at most length 1 (was 2)"
			)
		})

		it("optional string-embedded tuple", () => {
			const t = type(["string?"])

			const expected = type([["string", "?"]])
			attest<typeof expected>(t)
			attest(t.expression).equals(expected.expression)
		})

		it("optional object tuple", () => {
			const t = type([[{ foo: "string" }, "?"], "string?"])
			attest<
				[
					{
						foo: string
					}?,
					string?
				]
			>(t.t)
			attest(t.expression).snap("[{ foo: string }?, string?]")
		})

		it("optional nested object tuple", () => {
			const t = type([[[{ foo: "string" }, "?"]], ["string", "?"]])
			attest<
				[
					[
						{
							foo: string
						}?
					],
					string?
				]
			>(t.t)
			attest(t.expression).snap("[[{ foo: string }?], string?]")
		})
	})

	describe("variadic tuple", () => {
		it("spreads simple arrays", () => {
			const wellRested = type(["string", "...", "number[]"])
			attest<[string, ...number[]]>(wellRested.infer)
			attest(wellRested(["foo"])).equals(["foo"])
			attest(wellRested(["foo", 1, 2])).equals(["foo", 1, 2])
		})

		it("spreads array expressions", () => {
			const greatSpread = type(["0", "...", "(Date|RegExp)[]"])
			attest<[0, ...(RegExp | Date)[]]>(greatSpread.infer)
		})

		it("distributes spread unions", () => {
			const t = type(["1", "...", "(Date[] | RegExp[])"])
			attest<[1, ...(Date[] | RegExp[])]>(t.infer)
			const expected = type(["1", "...", "Date[]"]).or(["1", "...", "RegExp[]"])
			attest(t.json).equals(expected.json)
		})

		it("distributes spread union tuples", () => {
			const counting = ["2", "3", "4"] as const
			const fibbing = ["1", "2", "3", "5", "8"] as const
			const countOrFib = type(counting, "|", fibbing)
			attest<[2, 3, 4] | [1, 2, 3, 5, 8]>(countOrFib.infer)
			const t = type(["1", "...", countOrFib])
			attest<[1, 2, 3, 4] | [1, 1, 2, 3, 5, 8]>(t.infer)
			const expected = type(["1", ...counting]).or(["1", ...fibbing])
			attest(t.json).equals(expected.json)
		})

		it("allows array keyword", () => {
			const types = scope({
				myArrayKeyword: "boolean[]",
				myVariadicKeyword: ["string", "...", "myArrayKeyword"]
			}).export()
			attest<[string, ...boolean[]]>(types.myVariadicKeyword.infer)
		})

		it("errors on non-array", () => {
			attest(() =>
				// @ts-expect-error
				type(["number", "...", "string"])
			).throwsAndHasTypeError(writeNonArraySpreadMessage("string"))
		})

		it("allows multiple fixed spreads", () => {
			const t = type([
				"string",
				"...",
				"number[]",
				"...",
				["boolean", "bigint"],
				"...",
				["symbol"]
			])
			const expected = type([
				"string",
				"...",
				"number[]",
				"boolean",
				"bigint",
				"symbol"
			])
			attest<[string, ...number[], boolean, bigint, symbol]>(t.infer)
			attest<typeof expected.infer>(t.infer)
			attest(t.json).equals(expected.json)
		})

		it("errors on multiple variadic", () => {
			attest(() =>
				type([
					"...",
					"string[]",
					// @ts-expect-error
					"...",
					"number[]"
				])
			).throwsAndHasTypeError(multipleVariadicMesage)
		})
	})

	it("reduces minLength", () => {
		const t = type(["number", "number", "...", "number[]", "number"])
		const expected = type("number[]>=3")
		attest(t.json).equals(expected.json)
	})

	it("multiple errors", () => {
		const stringArray = type("string[]")
		attest(stringArray([1, 2]).toString())
			.snap(`value at [0] must be a string (was a number)
value at [1] must be a string (was a number)`)
	})
})
