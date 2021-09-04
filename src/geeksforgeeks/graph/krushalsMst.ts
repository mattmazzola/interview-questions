import * as models from './models'
import { union, find } from './unionFind'

export function krushalsMst (graph: models.IWeightedGraph): models.IWeightedGraph {
    // Put each vertex in it's own set
    let subsets = graph.vertices.map(v => new Set([v]))

    // Sort edges by least distance
    const sortedEdges = graph.edges.sort((a, b) => a.distance < b.distance ? -1 : 1)

    // sortedEdges.forEach(e => {
    //     console.log(`e: ${e.start.id} ${e.end.id} ${e.distance}`)
    // })

    const mst: models.IWeightedGraph = {
        vertices: [],
        edges: []
    }

    sortedEdges.forEach(e => {
        const { start, end } = e
        if (mst.edges.length === graph.vertices.length - 1) {
            return
        }

        // Find which subset each vertex belongs to
        const subsetStart = find(subsets, start)
        const subsetEnd = find(subsets, end)
        // console.log(`start ${start.id}: `, subsetStart)
        // console.log(`end   ${end.id}: `, subsetEnd)

        // If subsets are the same edge would create a cycle so skip it by returning early
        if (subsetStart === subsetEnd) {
            return
        }

        // Add union of two sets
        const union1 = union(subsetStart, subsetEnd)
        subsets.push(union1)
        // console.log("union1: ", union1)
        subsets = subsets.filter(s => s !== subsetStart)
        subsets = subsets.filter(s => s !== subsetEnd)
        // console.log("Subsets: ", subsets)

        mst.vertices = []
        union1.forEach(s => {
            mst.vertices.push(s)
        })
        mst.edges.push(e)
    })
    
    return mst
}