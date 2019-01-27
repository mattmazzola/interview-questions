import { parseTree, toRpn } from './postfixNotation'

describe("Code Wars", () => {
    describe("postfix notation", () => {
        test("given string of algebraic input convert to postfix", () => {
            expect(toRpn(parseTree('2+7*5'))).toBe('275*+')
            expect(toRpn(parseTree('3*3/(7+1)'))).toBe('33*71+/')
            expect(toRpn(parseTree('5+(6-2)*9+3^(7-1)'))).toBe('562-9*+371-^+')
        })
    })
})