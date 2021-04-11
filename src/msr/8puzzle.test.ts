import { isSolvable, getMovesToSolve } from './8puzzle'

describe('MSR', () => {
    describe('8 Puzzle', () => {
        describe('isSolvable', () => {
            test('given solved puzzle return true', () => {
                // Arrange
                const puzzle = [
                    [1,2,3],
                    [4,5,6],
                    [7,8,0]
                ]
                const expected = true
                
                // Act
                const actualIsSolvable = isSolvable(puzzle, puzzle)
                
                // Assert
                expect(actualIsSolvable).toBe(expected)
            })
        })

        describe('getMoves', () => {
            test('given puzzle return the moves to solve it', () => {
                // Arrange
                const puzzle = [
                    [1,2,3],
                    [4,5,6],
                    [8,7,0]
                ]
                const expectedMoves = [
                    {
                        row: 1,
                        col: 1,
                        dir: 'down'
                    }
                ]
                
                // Act
                const moves = getMovesToSolve(puzzle, puzzle)
                
                // Assert
                expect(moves).toEqual(expectedMoves)
            })
        })
    })
})