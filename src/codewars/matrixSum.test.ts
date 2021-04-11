import { matrixSum } from './matrixSum'

describe("Code Wars", () => {
    describe("matrxSum", () => {
        test("given two matrix should return sum of both matricies", () => {
            const matrix1 = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
            ]

            const matrix2 = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
            ]

            const result = matrixSum(matrix1, matrix2)

            expect(result).toEqual([
                [2, 4, 6],
                [8, 10, 12],
                [14, 16, 18]
            ])
        })
    })
})