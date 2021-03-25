import { removeDuplicates } from './removeDuplicates'

describe('Remove Duplicates', () => {
    describe('removeDuplicates', () => {
        test('given empty array return empty array', () => {
            // Arrange
            const input: number[] = []
            const expected: number[] = []

            // Act
            const actual = removeDuplicates(input)

            // Assert
            expect(actual).toEqual(expected)
        })

        test('given array with no duplicates return array', () => {
            // Arrange
            const input: number[] = [1,2,3,]
            const expected: number[] = [1,2,3,]

            // Act
            const actual = removeDuplicates(input)

            // Assert
            expect(actual).toEqual(expected)
        })

        test('given array with duplicates move duplicates to END of array', () => {
            // Arrange
            const input: number[] = [1,2,3,3,3,5,5,6,7,]
            const expected: number[] = [1,2,3,5,6,7,3,3,5,]

            // Act
            const actual = removeDuplicates(input)

            // Assert
            expect(actual).toEqual(expected)
        })
    })
})