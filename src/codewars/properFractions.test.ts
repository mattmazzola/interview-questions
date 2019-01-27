import { properFractions, gcd } from './properFractions'

describe('Code Wars', () => {
    xdescribe("Greatest Common Denominator", () => {
        test("given numerator and denominator return greatest common denominator", () => {
            expect(gcd(4,8)).toBe(2)
            expect(gcd(3,8)).toBe(1)
        })
    })

    describe('Proper Fractions', () => {
        test('Given number as denominator return amount of proper fractions that are less than that number', () => {
            expect(properFractions(1).length).toBe(0)
            expect(properFractions(2).length).toBe(1)
        })
    })
})