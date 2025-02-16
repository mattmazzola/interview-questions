import { binarySearch } from "./binarysearch"

describe('Binary Search', () => {
    test('Given an empty array, return -1', () => {
        expect(binarySearch([], 1)).toEqual(-1)
    })

    test('Given an array of numbers, return -1 if the number does not exist', () => {
        expect(binarySearch([1, 2, 3, 4, 5], 6)).toEqual(-1)
    })

    test('Given an array of numbers, return the index of the number if it exists', () => {
        expect(binarySearch([1, 2, 3, 4, 5], 3)).toEqual(2)
    })
})
