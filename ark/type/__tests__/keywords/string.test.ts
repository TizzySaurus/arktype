import { attest, contextualize } from "@ark/attest"
import { ark, type } from "arktype"
import type { Out, To, string } from "arktype/internal/keywords/ast.ts"

contextualize(() => {
	it("alpha", () => {
		const alpha = type("string.alpha")
		attest(alpha("user")).snap("user")
		attest(alpha("user123").toString()).snap(
			'must be only letters (was "user123")'
		)
	})

	it("alphanumeric", () => {
		const alphanumeric = type("string.alphanumeric")
		attest(alphanumeric("user123")).snap("user123")
		attest(alphanumeric("user")).snap("user")
		attest(alphanumeric("123")).snap("123")
		attest(alphanumeric("abc@123").toString()).equals(
			'must be only letters and digits 0-9 (was "abc@123")'
		)
	})

	it("digits", () => {
		const digits = type("string.digits")
		attest(digits("123")).snap("123")
		attest(digits("user123").toString()).equals(
			'must be only digits 0-9 (was "user123")'
		)
	})

	it("email", () => {
		const email = type("string.email")
		attest(email("shawn@mail.com")).snap("shawn@mail.com")
		attest(email("shawn@email").toString()).equals(
			'must be an email address (was "shawn@email")'
		)
	})

	it("credit card", () => {
		const validCC = "5489582921773376"
		attest(ark.string.creditCard(validCC)).equals(validCC)
		// Regex validation
		attest(ark.string.creditCard("0".repeat(16)).toString()).snap(
			'must be a credit card number (was "0000000000000000")'
		)
		// Luhn validation
		attest(ark.string.creditCard(validCC.slice(0, -1) + "0").toString()).snap(
			'must be a credit card number (was "5489582921773370")'
		)
	})

	it("semver", () => {
		attest(ark.string.semver("1.0.0")).snap("1.0.0")
		attest(ark.string.semver("-1.0.0").toString()).snap(
			'must be a semantic version (see https://semver.org/) (was "-1.0.0")'
		)
	})

	describe("ip", () => {
		const validIPv4 = "192.168.1.1"
		const validIPv6 = "2001:0db8:85a3:0000:0000:8a2e:0370:7334"

		it("root", () => {
			const ip = type("string.ip")

			attest(ip(validIPv4)).equals(validIPv4)

			attest(ip(validIPv6)).equals(validIPv6)

			attest(ip("192.168.1.256").toString()).snap(
				'must be an IP address (was "192.168.1.256")'
			)
			attest(ip("2001:0db8:85a3:0000:0000:8a2e:0370:733g").toString()).snap(
				'must be an IP address (was "2001:0db8:85a3:0000:0000:8a2e:0370:733g")'
			)
		})

		it("version subtype", () => {
			const uuidv4 = type("string.ip.v4")

			attest(uuidv4(validIPv4)).equals(validIPv4)
			attest(uuidv4("1234").toString()).snap(
				'must be an IPv4 address (was "1234")'
			)

			attest(ark.string.ip.v6(validIPv6)).equals(validIPv6)

			attest(uuidv4(validIPv6).toString()).snap(
				'must be an IPv4 address (was "2001:0db8:85a3:0000:0000:8a2e:0370:7334")'
			)

			attest(ark.string.ip.v6(validIPv4).toString()).snap(
				'must be an IPv6 address (was "192.168.1.1")'
			)
		})
	})
})