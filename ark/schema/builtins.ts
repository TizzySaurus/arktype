import { cached } from "@arktype/util"
import { node } from "./types/type.js"
import { type TypeNode } from "./types/type.js"

export const builtins = {
	never: cached(() => node()),
	unknown: cached(() => node({})),
	// TODO: fix
	nonVariadicArrayIndex: cached(() => node("number")),
	arrayIndexTypeNode: cached(() => node("number")),
	string: cached(() => node("string")),
	array: cached(() => node(Array))
} satisfies Record<string, () => TypeNode>
