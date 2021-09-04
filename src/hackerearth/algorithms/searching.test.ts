import * as search from './searching'

describe('hackerearth', () => {
    describe('searching', () => {
        describe('linear', () => {
            describe('getVowelCount', () => {
                test('given empty string should return 0', () => {
                    expect(search.getVowelCount('')).toBe(0)
                })

                test('given string should return number of vowels', () => {
                    expect(search.getVowelCount('xxxx')).toBe(0)
                    expect(search.getVowelCount('abce123')).toBe(2)
                    expect(search.getVowelCount('JHkIsnZtTL')).toBe(1)
                })
            })

            describe('getDate', () => {
                test('given sample messages should return date wigh highest weight', () => {
                    // Arrange
                    const messages = [
                        'G: I want to go on 19',
                        'M: No that is not possible lets go on 21',
                        'G: No 19 is final and 21 is not',
                        'M: OKAY as you wish'
                    ]

                    // Act
                    const date = search.getDate(messages)

                    // Assert
                    expect(date).toBe(19)
                })
            })

            describe('minMax', () => {
                test('given array of integers return smallest and largest sum', () => {
                    expect(search.minMax([1, 2, 3, 4, 5])).toEqual([10, 14])
                })
            })

            describe('repeatedKTimes', () => {
                test('given array of numbers return the minimum number which is repeated k times', () => {
                    expect(search.repeatedKTimes([2, 2, 1, 3, 1], 2)).toBe(1)
                })
            })
        })

        describe('binary', () => {
            describe('getKillCountAndSum', () => {
                test('given N soliders and power of M should kill solidiers with powe less than or equal to M', () => {
                    expect(search.getKillCountAndSum([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([3, 6])
                    expect(search.getKillCountAndSum([1, 2, 3, 4, 5, 6, 7], 10)).toEqual([7, 28])
                    expect(search.getKillCountAndSum([1, 2, 3, 4, 5, 6, 7], 2)).toEqual([2, 3])
                })
            })

            describe('getUniqueTriangles', () => {
                test('given list of triangle sides return the number of unique traingles', () => {
                    // Arrange
                    const triangles = [
                        [7, 6, 5],
                        [5, 7, 6],
                        [8, 2, 9],
                        [2, 3, 4],
                        [2, 4, 3]
                    ]

                    expect(search.getUniqueTriangles(triangles)).toBe(1)
                })
            })

            describe('stringMonster', () => {
                // Technically this is the wrong solution since you are not allowed to use subset of the strings, it must be exact match
                test('given a set of strings is there enough characters in those strings to create the sleep string', () => {
                    // Arrange
                    const strings = [
                        'hey',
                        'rain',
                        'day',
                        'wet'
                    ]

                    const strings2 = [
                        'bump',
                        'ud',
                        'bish',
                        'chau'
                    ]

                    expect(search.stringMonster(strings, 'draaxiny')).toBe(false)
                    expect(search.stringMonster(strings2, 'bichhusa')).toBe(true)
                })
            })

            describe('getCountOfSmaller', () => {
                test('given array of numbers and value, return the count of numbers smaller than the value', () => {
                    expect(search.getCountOfSmaller([], 20)).toBe(0)
                    expect(search.getCountOfSmaller([3, 4, 5, 7, 8, 9, 123], 2)).toBe(0)
                    expect(search.getCountOfSmaller([3, 4, 5, 7, 8, 9, 123], 500)).toBe(7)
                    expect(search.getCountOfSmaller([1, 3, 4, 5, 7, 8, 9, 123], 6)).toBe(4)
                    expect(search.getCountOfSmaller([1, 3, 4, 5, 7, 8, 9, 123], 7)).toBe(4)
                })
            })

            describe('getCountOfLarger', () => {
                test('given array of number and value, return the count of numbers greater than the given value', () => {
                    expect(search.getCountOfLarger([], 10)).toBe(0)
                    expect(search.getCountOfLarger([5, 6, 7, 8, 9, 12, 15, 16], 10)).toBe(3)
                    expect(search.getCountOfLarger([5, 6, 7, 8, 9, 12, 13, 14, 15, 16], 9)).toBe(5)
                    expect(search.getCountOfLarger([5, 6, 7, 8, 9, 12, 13, 14, 15, 16], 10)).toBe(5)
                })
            })

            xdescribe('simpleGame', () => {
                test('given different numbers foreach monk return the winning monk and the score or tie', () => {
                    expect(search.simpleGame([1, 3], [0, 5])).toEqual(`Monk 2`)
                })
            })
        })
    })
})