import * as arrays from './arrays'

describe('geeksforgeeks', () => {
    describe('arrays', () => {
        describe('binarySearch', () => {
            test('should return undefined if element with value is not found', () => {
                expect(arrays.binarySearch(999, [1,2,3,4,5,6,7,8])).toBeUndefined()
            })

            test('should return the index of the element matching the value', () => {
                expect(arrays.binarySearch(6, [1,2,3,4,5,6,7,8])).toBe(5)
            })
        })

        describe('findMinimum', () => {
            test('given empty array should return undefined', () => {
                expect(arrays.findMinimum([])).toBeUndefined();
            })

            test('given array should return minimum number in array', () => {
                expect(arrays.findMinimum([1,2,3,4,5,6,7,8])).toBe(1)
            })

            test('given rotated array should return minimum number in array', () => {
                expect(arrays.findMinimum([4,5,6,7,1,2,3])).toBe(1)
            })

            test('given rotated array should return minimum number in array', () => {
                expect(arrays.findMinimum([4,5,6,1,2,3])).toBe(1)
            })
        })

        describe('findRotation', () => {
            test('given empty array should return undefined', () => {
                expect(arrays.findRotation([])).toBeUndefined()
            })

            test('given non-rotated array should return 0', () => {
                expect(arrays.findRotation([1,2,3,4,5])).toBe(0)
            })

            test('given roated array should return index at rotation', () => {
                expect(arrays.findRotation([4,5,6,7,8,1,2,3])).toBe(5)
            })
        })

        describe('painting the fend', () => {
            test('given 3 posts and 2 colors the result should be 6', () => {
                expect(arrays.getWaysOfPaintingFence(3,2)).toBe(6)
            })
        })
    })
})