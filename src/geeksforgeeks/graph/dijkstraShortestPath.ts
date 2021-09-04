import * as models from './models'

/** https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/ */


export function dijkstraShortestPath (graphInput: models.IWeightedGraph) {
    // Make a copy of input graph
    const vs = graphInput.vertices.map(v => ({ ...v }))
    const graph: models.IWeightedGraph = {
        vertices: vs,
        edges: graphInput.edges.map(e => ({
            start: vs.find(v => v.id === e.start.id)!,
            end: vs.find(v => v.id === e.end.id)!,
            distance: e.distance
        }))
    }

    const shortestPathFromMin: { [key: string]: number } = {}

    while (Object.keys(shortestPathFromMin).length < graph.vertices.length) {
        // Find vertex with minimum total distance
        const vertex = findMinimum(shortestPathFromMin, graph.vertices)
        shortestPathFromMin[vertex.id]
        // console.log(`found: vertex${vertex.id}`)

        // For each adjacent vertex updates it's total value to the 
        // Minimum current total and Adjacent vertex total + edge distance 
        graph.edges
            .filter(e => e.start === vertex)
            .filter(e => typeof shortestPathFromMin[e.end.id] === 'undefined')
            .forEach(e => {
                const minDistance = Math.min(vertex.minDistance + e.distance, e.end.minDistance)
                e.end.minDistance = minDistance
                // console.log(`vertex${e.end.id}.total = ${total}`)
            })

        graph.edges
            .filter(e => e.end === vertex)
            .filter(e => typeof shortestPathFromMin[e.start.id] === 'undefined')
            .forEach(e => {
                const minDistance = Math.min(vertex.minDistance + e.distance, e.start.minDistance)
                e.start.minDistance = minDistance
                // console.log(`vertex${e.start.id}.total = ${total}`)
            })
    }

    return shortestPathFromMin
}

export function findMinimum (set: { [key: string]: number }, vertices: models.IVertexMinDistance[]) {
    const min = vertices.reduce<models.IVertexMinDistance | null>((minV, v) => {
        if (!set[v.id] && (minV === null || v.minDistance <= minV.minDistance)) {
            minV = v
        }
        return minV
    }, null)

    if (min === null) {
        throw new Error()
    }

    return min
}