import type { AbstractableConstructor, Domain, evaluate } from "@arktype/utils"
import type { CheckResult } from "./compiler/traverse.js"
import type { Bound } from "./nodes/primitive/bound.js"
import type { TypeNode } from "./nodes/type.js"
import type { Narrow } from "./parser/tuple.js"
import type { extractOut } from "./type.js"

export type Type<t = unknown, $ = any> = {
    (data: unknown): CheckResult<extractOut<t>>
    branches: readonly Predicate[]
}

export type Predicate = Readonly<{
    basis?: readonly [BasisConstraint]
    range?:
        | readonly [RangeConstraint]
        | readonly [RangeConstraint, RangeConstraint]
    divisor?: readonly [DivisorConstraint]
    pattern?: readonly PatternConstraint[]
    narrow?: readonly NarrowConstraint[]
    prop?: readonly PropConstraint[]
    signature?: readonly SignatureConstraint[]
    variadic?: readonly [VariadicConstraint]
}>

export type PropConstraint = defineConstraint<{
    kind: "prop"
    key: string | symbol
    required: boolean
    value: Type
}>

export type SignatureConstraint = defineConstraint<{
    kind: "signature"
    key: Type
    value: Type
}>

// TODO: add minLength prop that would result from collapsing types like [...number[], number]
// to a single variadic number prop with minLength 1
// Figure out best design for integrating with named props.
export type VariadicConstraint = defineConstraint<{
    kind: "variadic"
    value: Type
    tail: readonly Type[]
}>

type CommonConstraintProps = {
    description?: string
}

type BaseConstraint = {
    kind: string
}

type defineConstraint<constraint extends BaseConstraint> = evaluate<
    Readonly<constraint & CommonConstraintProps>
>

export type BasisConstraint =
    | DomainConstraint
    | UnitConstraint
    | PrototypeConstraint

export type DomainConstraint = defineConstraint<{
    kind: "domain"
    rule: Domain
}>

export type UnitConstraint = defineConstraint<{
    kind: "unit"
    rule: unknown
}>

export type PrototypeConstraint = defineConstraint<{
    kind: "prototype"
    rule: AbstractableConstructor
}>

export type DivisorConstraint = defineConstraint<{
    kind: "divisor"
    rule: number
}>

export type PatternConstraint = defineConstraint<{
    kind: "pattern"
    rule: RegexRule
}>

type RegexRule = Readonly<{
    source: string
    flags: string
}>

export type NarrowConstraint = defineConstraint<{
    kind: "narrow"
    rule: Narrow
}>

export type RangeConstraint = defineConstraint<{
    kind: "range"
    rule: Bound
}>
