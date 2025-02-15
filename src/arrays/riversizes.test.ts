import { riverSizes } from './riversizes'

describe('riversizes', () => {
    test('given an empty matrix, should return an empty array', () => {
        // Arrange
        const matrix = [[]]

        // Act
        const result = riverSizes(matrix)

        // Assert
        expect(result).toEqual([])
    })

    test('given a matrix with no rivers, should return an empty array', () => {
        // Arrange
        const matrix = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]

        // Act
        const result = riverSizes(matrix)

        // Assert
        expect(result).toEqual([])
    })

    test('given a matrix with one river, should return an array with one size', () => {
        // Arrange
        const matrix = [
            [1, 0, 0],
            [1, 1, 0],
            [0, 0, 0],
        ]

        // Act
        const result = riverSizes(matrix)

        // Assert
        expect(result).toEqual([3])
    })

    test('given a matrix with multiple rivers, should return an array with multiple sizes', () => {
        // Arrange
        const matrix = [
            [1, 0, 0, 1],
            [1, 0, 0, 0],
            [0, 0, 1, 1],
        ]

        // Act
        const result = riverSizes(matrix)

        // Assert
        expect(result).toEqual([2, 1, 2])
    })

    test('given a matrix with a river that wraps around, should return the correct size', () => {
        // Arrange
        const matrix = [
            [1, 1, 0],
            [0, 1, 0],
            [1, 1, 0],
        ]

        // Act
        const result = riverSizes(matrix)

        // Assert
        expect(result).toEqual([5])
    })
})
