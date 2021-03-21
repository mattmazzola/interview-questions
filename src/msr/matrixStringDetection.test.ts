import { isStringPresent } from './matrixStringDetection'

describe('Boggle (Matrix String Detection)', () => {
    describe('matrixStringDetection', () => {
        test('Given empty matrix return, String Not Found', () => {
            // Arrange
            const targetString = 's'

            // Act
            const result = isStringPresent(undefined, targetString)

            // Assert
            expect(result).toEqual('String not found')
        })

        test('Given matrix with empty string, return string not found', () => {
            // Arrange
            const matrix: string[][] = [
                ['s']
            ]
            const targetString = ''

            // Act
            const result = isStringPresent(matrix, targetString)

            // Assert
            expect(result).toEqual('String not found')
        })

        test('Given 1x1 matrix with string, return String found with coordinates', () => {
            // Arrange
            const matrix: string[][] = [
                ['s']
            ]
            const targetString = 's'

            // Act
            const result = isStringPresent(matrix, targetString)

            // Assert
            expect(result).toEqual('String can be found. Coordinates: s: (0, 0)')
        })

        test('Given medium matrix with string, return String found with coordinates', () => {
            // Arrange
            const matrix: string[][] = [
                ['a','b','c','d'],
                ['e','f','g','h'],
                ['i','j','k','l'],
                ['o','m','n','p'],
            ]
            const targetString = 'lpnmjf'

            // Act
            const result = isStringPresent(matrix, targetString)

            // Assert
            expect(result).toEqual('String can be found. Coordinates: l: (2, 3), p: (3, 3), n: (3, 2), m: (3, 1), j: (2, 1), f: (1, 1)')
        })
    })
})