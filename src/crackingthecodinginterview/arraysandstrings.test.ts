import * as AS from './arraysandstrings'

describe('Cracking The Coding Interview', () => {
    describe('arrays and strings', () => {
        test('1.1 has all unique characters', () => {
            expect(AS.hasAllUnique('a')).toBe(true)
            expect(AS.hasAllUnique('aa')).toBe(false)
            expect(AS.hasAllUnique('abcdefghijklmnopqrstuvwxyz')).toBe(true)
        })

        test('1.3 given two strings return true if permutation', () => {
            expect(AS.isPermutation('a', 'a')).toBe(true)
            expect(AS.isPermutation('abc', 'cab')).toBe(true)
            expect(AS.isPermutation('1234qwer', 'q1w2e3r4')).toBe(true)
        })

        test('1.5 Compress string', () => {
            expect(AS.compressString('aabcccccaaa')).toEqual('a2b1c5a3')
            expect(AS.compressString('a')).toEqual('a')
            expect(AS.compressString('abc')).toEqual('abc')
            expect(AS.compressString('xxxxxxxxx')).toEqual('x9')
        })

        test('1.6 rotate matrix', () => {
            // Arrange
            const matrix = [
                [1,2,3],
                [4,5,6],
                [7,8,9]
            ]

            const matrix2 = [
                [1,2,3,4],
                [5,6,7,8],
                [9,10,11,12],
                [13,14,15,16]
            ]

            const expectedMatrix = [
                [7,4,1],
                [8,5,2],
                [9,6,3]
            ]

            const expectedMatrix2 = [
                [13,9,5,1],
                [14,10,6,2],
                [15,11,7,3],
                [16,12,8,4]
            ]

            expect(AS.rotateMatrix(matrix)).toEqual(expectedMatrix)
            expect(AS.rotateMatrixInPlace(matrix)).toEqual(expectedMatrix)
            expect(AS.rotateMatrixInPlace(matrix2)).toEqual(expectedMatrix2)
        })

        test('1.7 zero out rows or columns of matrix', () => {
            // Arrange
            const matrix = [
                [1,2,3],
                [4,0,6],
                [7,8,9]
            ]

            const matrix2 = [
                [1,0,3,4],
                [5,6,7,8],
                [9,0,0,12],
                [0,14,15,16]
            ]

            const expectedMatrix = [
                [1,0,3],
                [0,0,0],
                [7,0,9]
            ]

            const expectedMatrix2 = [
                [0,0,0,0],
                [0,0,0,8],
                [0,0,0,0],
                [0,0,0,0]
            ]

            expect(AS.zeroOutMatrix(matrix)).toEqual(expectedMatrix)
            expect(AS.zeroOutMatrix(matrix2)).toEqual(expectedMatrix2)
        })
    })
})