import type { Literalable } from "@arktype/util"

export type astToString<
	ast,
	result extends string = ""
> = ast extends readonly [infer head, ...infer tail]
	? astToString<
			tail,
			`${result extends "" ? "" : `${result} `}${astToString<head, "">}`
	  >
	: ast extends Literalable
	? `${result}${ast extends bigint ? `${ast}n` : ast}`
	: result