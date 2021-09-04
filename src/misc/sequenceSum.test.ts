import { sequenceSum } from './sequenceSum'

describe("sequenceSum", () => {
    test("given a sequence and sum which can be created return true", () => {
        expect(sequenceSum([1, 2, 3, 4], 9)).toBe(true)
        expect(sequenceSum([1, 3, 4, 5, 9], 9)).toBe(true)
        expect(sequenceSum([4, 2, 6, 8], 10)).toBe(true)
    })
})