import { shortestPath } from './shortestPath'

describe("shortest path", () => {
    test("given matrix return the shortest path", () => {
        const matrix = [
            [1,2,3],
            [4,3,2],
            [4,1,2]
        ]

        expect(shortestPath(matrix)).toEqual([1,3,2])
    })
})