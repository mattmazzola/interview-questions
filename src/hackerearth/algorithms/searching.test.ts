import * as search from './searching'

describe('hackerearth', () => {
    describe('searching', () => {
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
                expect(search.minMax([1,2,3,4,5])).toEqual([10,14])
            })
        })

        describe('repeatedKTimes', () => {
            test('given array of numbers return the minimum number which is repeated k times', () => {
                expect(search.repeatedKTimes([2, 2, 1, 3, 1], 2)).toBe(1)
            })
        })
    })
})