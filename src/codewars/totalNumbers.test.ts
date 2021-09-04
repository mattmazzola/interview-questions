import { totalIncDec } from './totalNumbers'

describe('Code Wars', () => {
    describe("totalNumbers", () => {
        test("given power should return number of increasing or decreasing numbers", () => {
            const powers = [
                [0, 1],
                [1, 10],
                [2, 100],
                [3, 475],
                [4, 1675],
                [5, 4954]
            ]

            powers.map(([power, answer]) => {
                expect(totalIncDec(power)).toBe(answer)
            })
        })
    })
})