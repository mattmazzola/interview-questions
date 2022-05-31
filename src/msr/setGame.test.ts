import { findSets, generateBoard } from './setGame'

describe('Set Game', () => {
    describe('generateBoard', () => {
        test('given board return the amount of sets', () => {

            // Arrange
            const board = generateBoard(4, 3)

            // Act
            const sets = findSets(board)

            // Assert
            expect(sets.length).toBe(3)
        })
    })
})
