import { dijkstraShortestPath } from './dijkstraShortestPath'
import * as models from './models'

const verticies1: models.IVertexTotal[] = [
    { id: 0, total: 0 },
    { id: 1, total: Number.POSITIVE_INFINITY },
    { id: 2, total: Number.POSITIVE_INFINITY },
    { id: 3, total: Number.POSITIVE_INFINITY },
    { id: 4, total: Number.POSITIVE_INFINITY },
    { id: 5, total: Number.POSITIVE_INFINITY },
    { id: 6, total: Number.POSITIVE_INFINITY },
    { id: 7, total: Number.POSITIVE_INFINITY },
    { id: 8, total: Number.POSITIVE_INFINITY },
]

const graph2: models.IWeightedGraph = {
    verticies: verticies1,
    edges: [
        { start: verticies1[0], end: verticies1[1], distance: 4 },
        { start: verticies1[0], end: verticies1[7], distance: 8 },
        { start: verticies1[1], end: verticies1[7], distance: 11 },
        { start: verticies1[1], end: verticies1[2], distance: 8 },
        { start: verticies1[7], end: verticies1[8], distance: 7 },
        { start: verticies1[7], end: verticies1[6], distance: 1 },
        { start: verticies1[2], end: verticies1[8], distance: 2 },
        { start: verticies1[2], end: verticies1[5], distance: 4 },
        { start: verticies1[2], end: verticies1[3], distance: 7 },
        { start: verticies1[8], end: verticies1[6], distance: 6 },
        { start: verticies1[6], end: verticies1[5], distance: 2 },
        { start: verticies1[3], end: verticies1[5], distance: 14 },
        { start: verticies1[3], end: verticies1[4], distance: 9 },
        { start: verticies1[5], end: verticies1[4], distance: 10 },
    ]
}

xdescribe("dijkstraShortestPath", () => {
    test("given graph return vertices with total distance", () => {
        expect(dijkstraShortestPath(graph2)).toBe(1)
    })
})


