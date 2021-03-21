import * as SS from './sortingandsearching'

describe('Cracking The Coding Interview', () => {
    describe('Sorting and Searching', () => {
        describe('11.1 Given two sorted arrays, merge B in to A', () => {
            test('given empty array return array', () => {
                expect(SS.mergeBintoA([], [], 0)).toEqual([])
            })
            test('given two sorted arrays, return merged array', () => {
                // Arrange
                const b = [1, 3, 5, 6, 9, 10]
                const a = [1, 2, 5, 7, 8, 13, 14]
                const lastA = a.length

                const aWithBuffer = [...a, ...Array(b.length).fill(null)]

                const expected = [1, 1, 2, 3, 5, 5, 6, 7, 8, 9, 10, 13, 14]

                // Act / Assert
                expect(SS.mergeBintoA(aWithBuffer, b, lastA)).toEqual(expected)
            })
        })

        describe('11.2 Sort array of strings, so all anagrams are next to each other', () => {
            test('given array sorted strings, group by anagram', () => {
                // Arrange
                const strings = ['dog', 'pals','cat', 'god', 'bat', 'tac', 'slap' ]
                const expected = ['bat','cat', 'tac', 'pals', 'slap', 'dog', 'god']
                const expected2 = ["dog", "god", "pals", "slap", "cat", "tac", "bat"]

                // Act
                // const actual = SS.sortAnagrams(strings)
                const actual2 = SS.sortAnagrams2(strings)
                const actual3 = SS.sortAnagrams3(strings)

                // Assert
                // expect(actual).toEqual(expected)
                expect(actual2).toEqual(expected)
                expect(actual3).toEqual(expected2)
            })
        })

        describe('11.3 Given array that has been rotated, find a value', () => {
            // Arrange
            const values = [18, 23, 26, 29, 1, 2, 3, 6, 8, 10, 13, 15]

            // Act / Assert
            expect(SS.findRotated(values, 3)).toBe(6)
        })

        describe('11.4 20 GB file with one string per line, sort the file', () => {
            /**
             * Split file into different subsets and sort each subset, then merge results
             * each machine/process could take section of the file
             */
            test('given file, sort file', () => {
                expect(true).toBe(true)
            })
        })

        describe('11.5 Given sorted array of strings with interspersed empty strings, find location of given string', () => {
            test('given empty array return undefined', () => {
                expect(SS.findString([], "x")).toBeUndefined()
                expect(SS.findStringBinarySearch([], "x")).toBeUndefined()
            })

            test('given strings, find string', () => {
                // Arrange
                const strings = ["at", "", "", "", "ball", "", "", "car", "", "", "dad", "", ""]
                const strings2 = ["at", "", "", "ba", "ball", "", "", "car", "cat", "", "dad", "", ""]
                const strings3 = ["ast", "at", "", "ball", "", "", "car", "", "", "dad", "", ""]

                // Act
                const string = SS.findString(strings, "ball")
                const string2 = SS.findStringBinarySearch(strings, "ball")
                const string3 = SS.findStringBinarySearch(strings2, "car")
                const string4 = SS.findStringBinarySearch(strings3, "ball")

                // Assert
                expect(string).toEqual(4)
                expect(string2).toEqual(4)
                expect(string3).toEqual(7)
                expect(string4).toEqual(3)
            })
        })

        describe('11.6 Given M x N matrix in which row & column are sorted in ascending order, write method to find element', () => {
            test('given empty matrix return undefined', () => {
                expect(SS.findMatrixValue([], 34)).toBeUndefined()
            })

            xtest('given matrix, return row,column of value', () => {
                // Arrange
                const matrix: number[][] = [
                    [0, 4, 8, 12],
                    [1, 5, 9, 13],
                    [2, 6, 10, 14],
                    [3, 7, 11, 15],
                ]

                const matrix2: number[][] = [
                    [0, 1, 2, 3],
                    [4, 5, 6, 7],
                    [8, 9, 10, 11],
                    [12, 13, 14, 15],
                ]

                // Act
                // const val = SS.findMatrixValue(matrix, 9)
                // const val2 = SS.findMatrixValue(matrix2, 9)

                // Assert
                // expect(val).toEqual([1,2])
                // expect(val2).toEqual([2,1])
            })
        })

        describe('11.7 Circus people tower', () => {
            test('given empty list, return empty', () => {
                expect(SS.circusTower([])).toEqual([])
            })

            test('given array of people return tallest stack', () => {
                // Arrange
                const p = (height: number, weight: number): SS.IPerson => ({ height, weight })
                const people: SS.IPerson[] = [
                    p(65, 100),
                    p(70, 150),
                    p(56, 90),
                    p(75, 190),
                    p(60, 95),
                    p(68, 110)
                ]

                const expected: SS.IPerson[] = [
                    p(75, 190),
                    p(70, 150),
                    p(68, 110),
                    p(65, 100),
                    p(60, 95),
                    p(56, 90)
                ]

                // Act / Assertr
                expect(SS.circusTower(people)).toEqual(expected)
            })
        })

        describe('11.8 number stream', () => {
            xtest('given stream of numbers, return rank of given number', () => {
                // Arrange
                const numbers = [5, 1, 4, 4, 5, 9, 7, 13, 3]
                const reader = new SS.Reader()

                // Act
                numbers.forEach(n => reader.track(n))

                // Assert
                expect(reader.getRankofNumber(1)).toEqual(0)
                expect(reader.getRankofNumber(3)).toEqual(1)
                expect(reader.getRankofNumber(4)).toEqual(3)
            })
        })
    })
})