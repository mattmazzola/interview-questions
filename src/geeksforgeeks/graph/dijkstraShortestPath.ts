import * as models from './models'

/** https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/ */


export function dijkstraShortestPath (graphInput: models.IWeightedGraph) {
    // Make a copy of input graph
    const vs = graphInput.verticies.map(v => ({ ...v }))
    const graph: models.IWeightedGraph = {
        verticies: vs,
        edges: graphInput.edges.map(e => ({
            start: vs.find(v => v.id === e.start.id)!,
            end: vs.find(v => v.id === e.end.id)!,
            distance: e.distance
        }))
    }

    const sptSet: Set<models.IVertexTotal> = new Set()

    while (sptSet.size != graph.verticies.length) {
        // Find vertex with mimum total distance
        const vertex = findMinimum(sptSet, graph.verticies)
        sptSet.add(vertex)
        // console.log(`found: vertex${vertex.id}`)

        // For each adjacent vertex updates it's total value to the 
        // Minimum current total and Adjacent vertex total + edge distance 
        graph.edges
            .filter(e => e.start === vertex)
            .filter(e => !sptSet.has(e.end))
            .forEach(e => {
                const total = Math.min(vertex.total + e.distance, e.end.total)
                e.end.total = total
                // console.log(`vertex${e.end.id}.total = ${total}`)
            })

        graph.edges
            .filter(e => e.end === vertex)
            .filter(e => !sptSet.has(e.start))
            .forEach(e => {
                const total = Math.min(vertex.total + e.distance, e.start.total)
                e.start.total = total
                // console.log(`vertex${e.start.id}.total = ${total}`)
            })
    }

    // console.log("Report Shortest distance to each vertix:")
    const result: [number, number][] = []
    sptSet.forEach((v) => {
        result.push([v.id, v.total])
        // console.log(`vertex${v.id}.total: ${v.total}`)
    })

    return result
}

export function findMinimum (set: Set<models.IVertexTotal>, verticies: models.IVertexTotal[]) {
    const min = verticies.reduce<models.IVertexTotal | null>((minV, v) => {
        if (!set.has(v) && (minV === null || v.total <= minV.total)) {
            minV = v
        }
        return minV
    }, null)

    if (min === null) {
        throw new Error()
    }

    return min
}