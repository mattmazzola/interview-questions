import { isSolvable, getMovesToSolve } from './8puzzle'

describe('MSR', () => {
    describe('8 Puzzle', () => {
        describe('isSolvable', () => {
            test('given solved puzzle return true', () => {
                // Arrange
                const puzzle = [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 0]
                ]
                const goalPuzzle = [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 0]
                ]
                const expected = true

                // Act
                const actualIsSolvable = isSolvable(puzzle, goalPuzzle)

                // Assert
                expect(actualIsSolvable).toBe(expected)
            })

            test('given a puzzle that is solvable return true', () => {
                // Arrange
                const puzzle = [
                    [1, 3, 2],
                    [5, 4, 6],
                    [7, 8, 0]
                ]
                const goalPuzzle = [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 0]
                ]
                const expected = true

                // Act
                const actualIsSolvable = isSolvable(puzzle, goalPuzzle)

                // Assert
                expect(actualIsSolvable).toBe(expected)
            })

            test('given a puzzle that is not solvable return false', () => {
                // Arrange
                const puzzle = [
                    [1, 3, 2],
                    [5, 5, 0],
                    [7, 8, 6]
                ]
                const goalPuzzle = [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 0]
                ]
                const expected = false

                // Act
                const actualIsSolvable = isSolvable(puzzle, goalPuzzle)

                // Assert
                expect(actualIsSolvable).toBe(expected)
            })
        })

        describe('getMoves', () => {
            test('given puzzle return the moves to solve it', () => {
                // Arrange
                const puzzle = [
                    [1, 2, 3],
                    [4, 5, 0],
                    [7, 8, 6]
                ]
                const goalPuzzle = [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 0]
                ]
                const expectedMoves = [
                    [
                        [1, 2, 3],
                        [4, 5, 0],
                        [7, 8, 6]
                    ],
                    [
                        [1, 2, 3],
                        [4, 5, 6],
                        [7, 8, 0],
                    ],
                ]

                // Act
                const moves = getMovesToSolve(puzzle, goalPuzzle)

                // Assert
                expect(moves).toEqual(expectedMoves)
            })

            test('given puzzle return the moves to solve it', () => {
                // Arrange
                const puzzle = [
                    [4, 1, 2],
                    [0, 5, 3],
                    [7, 8, 6],
                ]
                const goalPuzzle = [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 0],
                ]
                const expectedMoves = [
                    [
                        [4, 1, 2],
                        [0, 5, 3],
                        [7, 8, 6],
                    ],
                    [
                        [0, 1, 2],
                        [4, 5, 3],
                        [7, 8, 6],
                    ],
                    [
                        [1, 0, 2],
                        [4, 5, 3],
                        [7, 8, 6],
                    ],
                    [
                        [1, 2, 0],
                        [4, 5, 3],
                        [7, 8, 6],
                    ],
                    [
                        [1, 2, 3],
                        [4, 5, 0],
                        [7, 8, 6],
                    ],
                    [
                        [1, 2, 3],
                        [4, 5, 6],
                        [7, 8, 0],
                    ],
                ]

                // Act
                const moves = getMovesToSolve(puzzle, goalPuzzle)

                // Assert
                expect(moves).toEqual(expectedMoves)
            })
        })
    })
})