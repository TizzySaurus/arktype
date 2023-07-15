import { serializeRegex } from "../../nodes/primitive/regex.js"
import { node } from "../../nodes/type.js"

// https://github.com/validatorjs/validator.js/blob/master/src/lib/isLuhnNumber.js
export const isLuhnValid = (creditCardInput: string) => {
	const sanitized = creditCardInput.replace(/[- ]+/g, "")
	let sum = 0
	let digit
	let tmpNum
	let shouldDouble
	for (let i = sanitized.length - 1; i >= 0; i--) {
		digit = sanitized.substring(i, i + 1)
		tmpNum = parseInt(digit, 10)
		if (shouldDouble) {
			tmpNum *= 2
			if (tmpNum >= 10) {
				sum += (tmpNum % 10) + 1
			} else {
				sum += tmpNum
			}
		} else {
			sum += tmpNum
		}
		shouldDouble = !shouldDouble
	}
	return !!(sum % 10 === 0 ? sanitized : false)
}

// https://github.com/validatorjs/validator.js/blob/master/src/lib/isCreditCard.js
const creditCardMatcher =
	/^(?:4[0-9]{12}(?:[0-9]{3,6})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12,15}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|6[27][0-9]{14}|^(81[0-9]{14,17}))$/

// TODO:   { mustBe: "a valid credit card number" }
export const creditCard = node({
	basis: "string",
	regex: serializeRegex(creditCardMatcher),
	narrow: (s, state) =>
		isLuhnValid(s) ||
		// TODO: Fix
		!state.mustBe("a valid credit card number", s, state.basePath)
})
