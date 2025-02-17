import { findPathsRecursive, findPaths } from "./findPaths"

describe('Find Paths', () => {
    test('Given an empty array, return an empty array', () => {
        expect(findPathsRecursive([])).toEqual([])
    })

    test('Given a grid with start and end, return the paths', () => {
        expect(findPathsRecursive([
            ["start", "0", "0"],
            ["0", "0", "end"]
        ])).toEqual([
            ["(0,0)", "(0,1)", "(0,2)", "(1,2)"],
            ["(0,0)", "(0,1)", "(1,1)", "(1,2)"],
            ["(0,0)", "(1,0)", "(1,1)", "(1,2)"],
        ])
    })

    test('Given a grid with start and end, return the paths', () => {
        expect(findPaths([
            ["start", "0"],
            ["0", "end"]
        ], 'start', 'end')).toEqual([
            ["(0,0)", "(0,1)", "(1,1)"],
            ["(0,0)", "(1,0)", "(1,1)"],
        ])
    })

})
