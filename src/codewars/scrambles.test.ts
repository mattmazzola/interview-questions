import { scrambles } from './scrambles'

describe("scrambles", () => {
    test("given two words tell if letters in word 1 can be unscrabled to be the second", () => {
        expect(scrambles('rkqodlw', 'world')).toBe(true)
        expect(scrambles('cedewaraaossoqqyt', 'codewars')).toBe(true)
        expect(scrambles('katas', 'steak')).toBe(false)
    })
})