import { longestIncreasingSubsequence } from "./longestIncreasingSubsequence"

describe('Longest Increasing Subsequence', () => {

    test('given an empty array, should return 0', () => {
        expect(longestIncreasingSubsequence([])).toEqual(0)
    })

    test('given an array with one element, should return 1', () => {
        expect(longestIncreasingSubsequence([1])).toEqual(1)
    })

    test('given an array with all elements the same, should return 1', () => {
        expect(longestIncreasingSubsequence([1, 1, 1, 1])).toEqual(1)
    })

    test('given an array with all elements in increasing order, should return the length of the array', () => {
        expect(longestIncreasingSubsequence([1, 2, 3, 4, 5])).toEqual(5)
    })

    test('given an array with all elements in decreasing order, should return 1', () => {
        expect(longestIncreasingSubsequence([5, 4, 3, 2, 1])).toEqual(1)
    })

    test('given an array with a mix of increasing and decreasing elements, should return the length of the longest increasing subsequence', () => {
        expect(longestIncreasingSubsequence([10, 9, 2, 5, 3, 7, 101, 18])).toEqual(4)
    })

    test('should return longest subsequence within the array', () => {
        expect(longestIncreasingSubsequence([1, 2, 1, 2, 3, 4, 5, 4, 9])).toBe(6)
    })
})
