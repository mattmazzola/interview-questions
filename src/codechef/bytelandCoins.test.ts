import { cointsToDollars } from './bytelandCoins'

describe('Code Chef', () => {
    describe("bytelandAndCoin", () => {
        test("given a number if the maximum of return value from bank in dollars or the origial", () => {
            expect(cointsToDollars(12)).toBe(13)
            expect(cointsToDollars(2)).toBe(2)
        })
    })
})