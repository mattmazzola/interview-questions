import { isSolveable } from './8puzzle'

describe('MSR', () => {
    describe('8 Puzzle', () => {
        test('given puzzle return if it is solvable', () => {
            // Arrange
            const puzzle = [
                [1,2,3],
                [4,5,6],
                [8,7,0]
            ]
            const expected = false

            // Act
            const isSolvable = isSolveable(puzzle)

            // Assert
        })
    })
})