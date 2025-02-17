import { findLargestFarmLandSquare, findLargestFarmLandSquareDP } from "./largestFarmLandSquare"

describe('Largest Farm Land Square', () => {
    test('Given empty matrix, return 0', () => {
        expect(findLargestFarmLandSquareDP([])).toEqual(0)
    })

    test('Given a matrix with no 1s, return 0', () => {
        expect(findLargestFarmLandSquareDP([
            [0, 0],
            [0, 0]
        ])).toEqual(0)
    })

    test('Given a matrix with one 1, return 1', () => {
        expect(findLargestFarmLandSquareDP([
            [0, 0],
            [0, 1]
        ])).toEqual(1)
    })

    test('Given a matrix with one row of 1s, return 1', () => {
        expect(findLargestFarmLandSquareDP([
            [0, 0],
            [1, 1]
        ])).toEqual(1)
    })

    test('Given a matrix with one column of 1s, return 1', () => {
        expect(findLargestFarmLandSquareDP([
            [0, 1],
            [0, 1]
        ])).toEqual(1)
    })

    test('Given matrix with square of size 3 of 1s, return 3', () => {
        expect(findLargestFarmLandSquareDP([
            [0, 1, 0],
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
            [0, 1, 0]
        ])).toEqual(3)
    })
})
