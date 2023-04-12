import type { TypeOptions } from "../../type.js"
import type { validateDefinition } from "../definition.js"
import { parseDefinition } from "../definition.js"
import type { PostfixParser, TupleExpression } from "./tuple.js"

export type ConfigTuple<
    def = unknown,
    config extends TypeOptions = TypeOptions
> = readonly [def, ":", config]

/**
 * @operator {@link parseConfigTuple | :}
 * @docgenTable
 * @tuple ["type", ":", config]
 */
export const parseConfigTuple: PostfixParser<":"> = (def, ctx) =>
    parseDefinition(def[0], ctx)

export type validateConfigTuple<def extends TupleExpression, $> = readonly [
    validateDefinition<def[0], $>,
    ":",
    TypeOptions
]