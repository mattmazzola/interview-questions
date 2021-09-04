import { dijkstraShortestPath } from './dijkstraShortestPath'
import * as models from './models'

const vertices1: models.IVertexMinDistance[] = [
    { id: 0, minDistance: 0 },
    { id: 1, minDistance: Number.POSITIVE_INFINITY },
    { id: 2, minDistance: Number.POSITIVE_INFINITY },
    { id: 3, minDistance: Number.POSITIVE_INFINITY },
    { id: 4, minDistance: Number.POSITIVE_INFINITY },
    { id: 5, minDistance: Number.POSITIVE_INFINITY },
    { id: 6, minDistance: Number.POSITIVE_INFINITY },
    { id: 7, minDistance: Number.POSITIVE_INFINITY },
    { id: 8, minDistance: Number.POSITIVE_INFINITY },
]

const graph2: models.IWeightedGraph = {
    vertices: vertices1,
    edges: [
        { start: vertices1[0], end: vertices1[1], distance: 4 },
        { start: vertices1[0], end: vertices1[7], distance: 8 },
        { start: vertices1[1], end: vertices1[7], distance: 11 },
        { start: vertices1[1], end: vertices1[2], distance: 8 },
        { start: vertices1[7], end: vertices1[8], distance: 7 },
        { start: vertices1[7], end: vertices1[6], distance: 1 },
        { start: vertices1[2], end: vertices1[8], distance: 2 },
        { start: vertices1[2], end: vertices1[5], distance: 4 },
        { start: vertices1[2], end: vertices1[3], distance: 7 },
        { start: vertices1[8], end: vertices1[6], distance: 6 },
        { start: vertices1[6], end: vertices1[5], distance: 2 },
        { start: vertices1[3], end: vertices1[5], distance: 14 },
        { start: vertices1[3], end: vertices1[4], distance: 9 },
        { start: vertices1[5], end: vertices1[4], distance: 10 },
    ]
}

describe("dijkstraShortestPath", () => {
    // Runs an infinite loops
    xtest("given graph return vertices with total distance", () => {
        expect(dijkstraShortestPath(graph2)).toBe(1)
    })
})


