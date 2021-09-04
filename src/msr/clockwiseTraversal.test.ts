import { clockwiseTraversal } from './clockwiseTraversal'

describe('MSR', () => {
    describe('Clock-Wise Travesal of matrix', () => {
        test('given matrix return clockwise travesal of values', () => {
            // Arrange
            const matrix: string[][] = [
                ['A', 'B', 'C'],
                ['D', 'E', 'F'],
                ['G', 'H', 'I'],
            ]

            const expected = ['A', 'B', 'C', 'F', 'I', 'H', 'G', 'D', 'E']

            // Act / Assert
            expect(clockwiseTraversal(matrix)).toEqual(expected)
        })

        test('given empty matrix return empty list', () => {
            expect(clockwiseTraversal([])).toEqual([])
        })

        test('given single value return single value', () => {
            expect(clockwiseTraversal([['A']])).toEqual(['A'])
        })

        test('given single row return row', () => {
            expect(clockwiseTraversal([['A', 'B', 'C', 'D']])).toEqual(['A', 'B', 'C', 'D'])
        })

        test('given column print alternating values', () => {
            // Arrange
            const column: string[][] = [
                ['A'],
                ['B'],
                ['C'],
                ['D'],
                ['E']
            ]

            const expected = ['A', 'B', 'C', 'D', 'E']

            // Act / Assert
            expect(clockwiseTraversal(column)).toEqual(expected)
        })
    })
})