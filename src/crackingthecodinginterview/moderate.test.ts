import * as Moderate from './moderate'

describe('Cracking The Coding Interview', () => {
    describe('Moderate', () => {
        describe('17.2 Tic Tac Toe', () => {
            test('given board which does not have winner return false', () => {
                // Arrange
                const board: number[][] = [
                    [0, 1, 1],
                    [1, 1, 0],
                    [0, 0, 1]
                ]

                // Act/Assert
                expect(Moderate.hasWonTicTacToe(board)).toBe(false)
            })

            test('given board which has winner should return true', () => {
                // Arrange
                const board: number[][] = [
                    [0, 1, 1],
                    [0, 0, 1],
                    [1, 1, 0]
                ]

                // Act / Assert
                expect(Moderate.hasWonTicTacToe(board)).toBe(true)
            })
        })

        describe('factorial', () => {
            test('given number return factorial', () => {
                expect(Moderate.factorial(0)).toBe(1)
                expect(Moderate.factorial(1)).toBe(1)
                expect(Moderate.factorial(2)).toBe(2)
                expect(Moderate.factorial(3)).toBe(6)
                expect(Moderate.factorial(4)).toBe(24)
                expect(Moderate.factorial(5)).toBe(120)
                expect(Moderate.factorial(6)).toBe(720)
                expect(Moderate.factorial(7)).toBe(5040)
                expect(Moderate.factorial(8)).toBe(40320)
                expect(Moderate.factorial(12)).toBe(479001600)
            })
        })

        describe('factorial trailing zeroes', () => {
            test('given number return trailing zeroes form factorial', () => {
                expect(Moderate.factorialTrailingZeroes(0)).toBe(0)
                expect(Moderate.factorialTrailingZeroes(0)).toBe(0)
                expect(Moderate.factorialTrailingZeroes(0)).toBe(0)
                expect(Moderate.factorialTrailingZeroes(6)).toBe(1)
                expect(Moderate.factorialTrailingZeroes(7)).toBe(1)
                expect(Moderate.factorialTrailingZeroes(8)).toBe(1)
                expect(Moderate.factorialTrailingZeroes(12)).toBe(2)
            })
        })

        describe('MasterMind', () => {
            test('given guess and solution return hits and pseudohits', () => {
                expect(Moderate.mastermind('RGBY', 'GGRR')).toEqual({ hits: 1, pseudohits: 1 })
                expect(Moderate.mastermind('RRRR', 'GGRR')).toEqual({ hits: 2, pseudohits: 0 })
                expect(Moderate.mastermind('GRRY', 'GYRR')).toEqual({ hits: 2, pseudohits: 2 })
            })
        })
    })
})