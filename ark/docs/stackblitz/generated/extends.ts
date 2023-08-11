export default `import { type } from "arktype"

const a = type({
    a: "number%5",
    b: "unknown",
    c: "integer<100"
})

const b = type({ a: "15", b: "string", c: "99", d: "creditCard" })

console.log(a.extends(b))
console.log(b.extends(a))
`
