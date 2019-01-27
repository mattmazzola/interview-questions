/** https://www.geeksforgeeks.org/union-find/ */

import { ISimpleGraph } from './models'

/** 
 * Put each vertex in it's own set
 * For each edge find the subset containing each vertex
 * If they are in the same subset then those vertecies are already connected by an edge and this edge will create a cycle return true
 * If they are different subsets union the sets since they are connected by the edge and cotinue to next edge
 */
export function unionFind (graph: ISimpleGraph): boolean {
    let subsets = graph.verticies.map(v => new Set([v]))

    const isCycle = graph.edges.some(({ start, end }) => {
        const subsetStart = find(subsets, start)
        const subsetEnd = find(subsets, end)
        console.log(`start ${start.id.toString().padEnd(1)}: `, subsetStart)
        console.log(`end   ${end.id.toString().padEnd(1)}: `, subsetEnd)

        if (subsetStart !== subsetEnd) {
            // Add union of two sets
            const union1 = union(subsetStart, subsetEnd)
            subsets.push(union1)
            // console.log("union1: ", union1)
            subsets = subsets.filter(s => s !== subsetStart)
            subsets = subsets.filter(s => s !== subsetEnd)
            console.log("Subsets: ", subsets)
            return false
        }
        
        return true
    })

    // console.log(`isCycle: `, isCycle)
    return isCycle
}

export function union <T>(setA: Set<T>, setB: Set<T>): Set<T> {
    const union = new Set(setA)

    setB.forEach(v => {
        union.add(v)
    })

    return union
}

export function find <T>(subset: Set<T>[], vertex: T): Set<T> {
    return subset.find(s => s.has(vertex))!
}
