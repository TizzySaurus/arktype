import type { Nominal, of } from "../../attributes.ts"
import { regexStringNode } from "./utils.ts"

declare namespace string {
	export type email = of<string, Nominal<"email">>
}

export const email = regexStringNode(
	// https://www.regular-expressions.info/email.html
	/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
	"an email address"
)

export type email = string.email
