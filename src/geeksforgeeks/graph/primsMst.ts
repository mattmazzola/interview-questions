import * as models from './models'

/**
 * Prim's Minimum Spanning Tree
 * 
 * Initialize two sets of vertices
 * 1. All the vertices of the given graph
 * 2. All the vertices of the minimum spanning tree
 * 
 * while Set 2 does not include all verticies
 *  get vertex with minimum distance
 *  add vertex to Set 2
 *  adjust adjacent vertices to minimum distance
 * 
 * return Set 2
 * @param graph    
 */
export function primsMst (graph: models.IWeightedGraph): models.IWeightedGraph {
    const mstSet: models.IWeightedGraph = {
        verticies: [],
        edges: []
    }
    const otherSet = graph.verticies
    console.log(`otherSet: `, otherSet)

    while (mstSet.verticies.length < otherSet.length) {
        const minVertex = findMinimum(otherSet, mstSet.verticies)
        console.log(`found v: ${minVertex.id} total: ${minVertex.total}`)
        if (mstSet.verticies.length >= 1) {
            const edgesToAdd = graph.edges
                .filter(e => !mstSet.edges.find(ed => ed === e))
                .filter(e => {
                    return (mstSet.verticies.find(v => v === e.start) && e.end === minVertex)
                        || (e.start === minVertex && mstSet.verticies.find(v => v === e.end))
                })

            console.log(`edge to add: `, edgesToAdd.map(e => ([e.start.id, e.end.id])))
            edgesToAdd.forEach(e => mstSet.edges.push(e))
        }
        mstSet.verticies.push(minVertex)


        console.log(`verticies: `, mstSet.verticies.map(v => v.id))
        graph.edges
            .filter(e => e.end === minVertex)
            .filter(e => !mstSet.verticies.find(v => v === e.start))
            .forEach(e => {
                const v = otherSet.find(v => v === e.start)!
                v.total = Math.min(v.total, e.distance)
            })

        graph.edges
            .filter(e => e.start === minVertex)
            .filter(e => !mstSet.verticies.find(v => v === e.end))
            .forEach(e => {
                const v = otherSet.find(v => v === e.end)!
                v.total = Math.min(v.total, e.distance)
            })
        console.log(`edges: `, mstSet.edges.map(e => ([e.start.id, e.end.id])))
        console.log(`others: `, otherSet)
    }

    return mstSet
}

export function findMinimum (verticies: models.IVertexTotal[], mstVerticies: models.IVertexTotal[]): models.IVertexTotal {
    // console.log(`verticies: `, verticies, `mstVerticies: `, mstVerticies)
    const filteredV = verticies
        .filter(v => !mstVerticies.find(mv => mv === v))

    // console.log(`filtered v: `, filteredV)

    return filteredV
        .reduce((min, v) => v.total < min.total ? v : min, { total: Number.POSITIVE_INFINITY, id: -1 })
}