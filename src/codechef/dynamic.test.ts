import { minimumStepsToOne, longestIncreasingSubsequenceDp } from './dynamic'

describe('Code Chef', () => {
    describe('minimumStepsToOne', () => {
        test('should return the minimum steps needed to turn 1', () => {
            expect(minimumStepsToOne(1)).toBe(0)
            expect(minimumStepsToOne(4)).toBe(2)
            expect(minimumStepsToOne(7)).toBe(3)
        })
    })

    describe('longestIncreasingSubsequenceDp', () => {
        test('should return longest subsequence within the array', () => {
            expect(longestIncreasingSubsequenceDp([1, 2, 1, 2, 3, 4, 5, 4, 9])).toBe(6)
        })
    })
})
