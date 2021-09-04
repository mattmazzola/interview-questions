import { dispatch } from './dispatch'

describe('dispatch', () => {
    it('should output N * length arrays', () => {
        // Arrange
        const input = [
            ['A', 'B', 'C'],
            ['D', 'E', 'F'],
            ['G', 'H', 'I'],
        ]

        const expected = [
            ['A', 'D', 'E', 'F'],
            ['A', 'B', 'D', 'E', 'F'],
            ['A', 'B', 'C', 'D', 'E', 'F'],
            ['A', 'G', 'H', 'I'],
            ['A', 'B', 'G', 'H', 'I'],
            ['A', 'B', 'C', 'G', 'H', 'I'],

            ['D', 'A', 'B', 'C'],
            ['D', 'E', 'A', 'B', 'C'],
            ['D', 'E', 'F', 'A', 'B', 'C'],
            ['D', 'G', 'H', 'I'],
            ['D', 'E', 'G', 'H', 'I'],
            ['D', 'E', 'F', 'G', 'H', 'I'],

            ['G', 'A', 'B', 'C'],
            ['G', 'H', 'A', 'B', 'C'],
            ['G', 'H', 'I', 'A', 'B', 'C'],
            ['G', 'D', 'E', 'F'],
            ['G', 'H', 'D', 'E', 'F'],
            ['G', 'H', 'I', 'D', 'E', 'F'],
        ]

        // Act
        const actual = dispatch(input)

        // Assert
        expect(actual).toEqual(expected)
    })
})