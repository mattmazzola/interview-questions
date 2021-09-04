import { coinsToDollars } from './bytelandCoins'

describe('Code Chef', () => {
    describe("bytelandAndCoin", () => {
        test("given a number if the maximum of return value from bank in dollars or the original", () => {
            expect(coinsToDollars(12)).toBe(13)
            expect(coinsToDollars(2)).toBe(2)
        })
    })
})