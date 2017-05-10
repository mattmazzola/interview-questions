import { getBoardVisual, nqueens } from './nqueens'

describe('nqueens', () => {
    test('given a square of 3 it should throw since there is not a way to place queens successfully', () => {
        expect(() => nqueens(3)).toThrow()
    })

    test('given a square of 4 it should place queens successfully', () => {
        const boardString = getBoardVisual(nqueens(4))

        const expectedBoardString = `
[x|Q|x|x]
[x|x|x|Q]
[Q|x|x|x]
[x|x|Q|x]`.trim()

        expect(boardString).toEqual(expectedBoardString)
    })
})