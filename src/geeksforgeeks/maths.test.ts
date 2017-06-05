import * as math from './maths'

describe('math', () => {
    describe('recursiveSequnec', () => {
        test('recursiveSeuqnce given 1 should return 1', () => {
            expect(math.recursiveSequence(1)).toBe(1)
        })

        test('recursiveSequence should compute summation of multiplication of numbers', () => {
            expect(math.recursiveSequence(2)).toBe(7)
            expect(math.recursiveSequence(5)).toBe(365527)
            expect(math.recursiveSequence(7)).toBe(6006997207)
        })
    })

    describe('numberGame', () => {
        test('numberGame should return minimum number divisible by sequence from 1 = n', () => {
            expect(math.numberGame(3)).toBe(6)
            expect(math.numberGame(5)).toBe(60)
        })
    })

    describe('fillArrayBy1s', () => {
        test('should return minimum number of interations needed to fill array with 1s', () => {
            expect(math.fillArrayBy1s([1,1]))
            expect(math.fillArrayBy1s([1,0,10,0,0,1,0,1,1,0,1,1,0,0,1]))
            expect(math.fillArrayBy1s([1,0,0,0,0,0,1]))
        })
    })

    describe('validateTrack', () => {
        test('should return true for valid tracks, false for invalid', () => {
            expect(math.validateTrack([1])).toBe(false)
            expect(math.validateTrack([2,1,2])).toBe(true)
            expect(math.validateTrack([3,1,3])).toBe(true)
            expect(math.validateTrack([2,1,3])).toBe(false)
            expect(math.validateTrack([4,1,4])).toBe(true)
            expect(math.validateTrack([7,4,1,4,7])).toBe(true)
            expect(math.validateTrack([5,3,1,3,5])).toBe(true)
            expect(math.validateTrack([5,3,1,5,3])).toBe(false)
        })
    })
})