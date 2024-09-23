import { attest, contextualize } from "@ark/attest"
import { ark, type } from "arktype"

const validIPv4 = "192.168.1.1"
const validIPv6 = "2001:0db8:85a3:0000:0000:8a2e:0370:7334"

contextualize(() => {
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

	it("invalid ipv6 with empty segments", () => {
		const out = type.ark.string.ip.v6("::%8:.-:.:")
		attest(out.toString()).snap('must be an IPv6 address (was "::%8:.-:.:")')
	})
})