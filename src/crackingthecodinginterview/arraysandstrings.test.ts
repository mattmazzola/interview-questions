import * as AS from './arraysandstrings'

describe('Cracking The Coding Interview', () => {
    describe('arrays and strings', () => {
        describe('1.1 has all unique characters', () => {
            test('given string return true if it has all unique otherwise false', () => {
                expect(AS.hasAllUnique('a')).toBe(true)
                expect(AS.hasAllUnique('aa')).toBe(false)
                expect(AS.hasAllUnique('abcdefghijklmnopqrstuvwxyz')).toBe(true)

                expect(AS.hasAllUniqueWithSort('a')).toBe(true)
                expect(AS.hasAllUniqueWithSort('aa')).toBe(false)
                expect(AS.hasAllUniqueWithSort('abcdefghijklmnopqrstuvwxyz')).toBe(true)
            })
        })

        describe('1.2 given string reverse the string', () => {
            test('given string return reverse string', () => {
                expect(AS.reverseString('abc')).toBe('cba')
                expect(AS.reverseString('ab2c')).toBe('c2ba')
            })
        })

        describe('1.3 given two strings return true if permutation', () => {
            test('given two strings return true if permutation', () => {
                expect(AS.isPermutation('', '')).toBe(true)
                expect(AS.isPermutation('a', 'a')).toBe(true)
                expect(AS.isPermutation('abc', 'cab')).toBe(true)
                expect(AS.isPermutation('1234qwer', 'q1w2e3r4')).toBe(true)

                expect(AS.isPermutationWithSort('a', 'a')).toBe(true)
                expect(AS.isPermutationWithSort('abc', 'cab')).toBe(true)
                expect(AS.isPermutationWithSort('1234qwer', 'q1w2e3r4')).toBe(true)
            })
        })

        describe('1.4 given string, replace spaces with %20', () => {
            test('gievn string with no spaces return string', () => {
                expect(AS.replace1('abc', ' ', '%20')).toBe('abc')
            })

            test('given string with spaces, replace with %20', () => {
                expect(AS.replace1('a b c', ' ', '%20')).toBe('a%20b%20c')
            })
        })

        describe('1.5 Compress string', () => {
            test('given string where compressed string is longer return original string', () => {
                expect(AS.compressString('')).toEqual('')
                expect(AS.compressString('a')).toEqual('a')
                expect(AS.compressString('abc')).toEqual('abc')
            })

            test('given string, compress string by covnerting sequence of repeating characters into character counts', () => {
                expect(AS.compressString('aabcccccaaa')).toEqual('a2b1c5a3')
                expect(AS.compressString('xxxxxxxxx')).toEqual('x9')
            })
        })

        describe('1.6 rotate matrix', () => {
            test('given matrix rotate matrix by 90 degrees', () => {
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
        })

        describe('1.7 zero out rows or columns of matrix', () => {
            test('given matrix zero out rows or columns of matrix', () => {
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

        describe('1.8 given two strings: s1 and s2 return true if s2 is rotation of s1 by using 1 call to `isSubstring`', () => {
            test('given two strings of different lengths return true', () => {
                expect(AS.isRotation('abc', 'abcd')).toBe(false)
            })

            test('given s2 which is rotation of s1 return true', () => {
                expect(AS.isRotation('abcdefg','efgabcd')).toBe(true)
            })

            test('given s2 which is not rotation of s1 return false', () => {
                expect(AS.isRotation('abcdef', 'xxxxxx')).toBe(false)
            })
        })
    })
})