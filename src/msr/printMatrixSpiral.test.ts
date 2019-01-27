import { printMatrixSpiral } from './printMatrixSpiral'

describe("printMatrixSpiral", () => {
    test("given a matrix return the printed spiral of matrix", () => {
        const matrix = [
            [1,2,3],
            [4,5,6],
            [7,8,9]
        ]

        expect(printMatrixSpiral(matrix)).toEqual([1,2,3,6,9,8,7,4,5])

        const matrix2 = [
            [20,19,18,17],
            [16,15,14,13],
            [12,11,10,9],
            [8,7,6,5]
        ]

        expect(printMatrixSpiral(matrix2)).toEqual([20,19,18,17,13,9,5,6,7,8,12,16,15,14,10,11])

        const matrix3= [
            [20,19,18,17,16],
            [15,14,13,12,11],
            [10,9,8,7,6],
            [5,4,3,2,1],
            [100, 99, 98, 97, 96]
        ]

        expect(printMatrixSpiral(matrix3)).toEqual([20,19,18,17,16,11,6,1,96,97,98,99,100,5,10,15,14,13,12,7,2,3,4,9,8])
    })
})