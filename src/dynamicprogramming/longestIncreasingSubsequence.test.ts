import { longestIncreasingSubsequence } from "./longestIncreasingSubsequence"

describe('Longest Increasing Subsequence', () => {

    test('given an empty array, should return 0', () => {
        // Arrange
        const array: number[] = []

        // Act
        const result = longestIncreasingSubsequence(array)

        // Assert
        expect(result).toEqual(0)
    })

    test('given an array with one element, should return 1', () => {
        // Arrange
        const array = [1]

        // Act
        const result = longestIncreasingSubsequence(array)

        // Assert
        expect(result).toEqual(1)
    })

    test('given an array with all elements the same, should return 1', () => {
        // Arrange
        const array = [1, 1, 1, 1]

        // Act
        const result = longestIncreasingSubsequence(array)

        // Assert
        expect(result).toEqual(1)
    })

    test('given an array with all elements in increasing order, should return the length of the array', () => {
        // Arrange
        const array = [1, 2, 3, 4, 5]

        // Act
        const result = longestIncreasingSubsequence(array)

        // Assert
        expect(result).toEqual(array.length)
    })

    test('given an array with all elements in decreasing order, should return 1', () => {
        // Arrange
        const array = [5, 4, 3, 2, 1]

        // Act
        const result = longestIncreasingSubsequence(array)

        // Assert
        expect(result).toEqual(1)
    })

    test('given an array with a mix of increasing and decreasing elements, should return the length of the longest increasing subsequence', () => {
        // Arrange
        const array = [10, 9, 2, 5, 3, 7, 101, 18]

        // Act
        const result = longestIncreasingSubsequence(array)

        // Assert
        expect(result).toEqual(4)
    })

})
