import { Edge, Graph } from "./models"
import { topologicalSort } from "./topologicalSort"
import debug from 'debug'

const logger = debug('graphs:dijkstra')

export type WeightedEdge = Edge & {
    distance: number
}

export type DistanceMap = { [key: string]: number }

// Problem from: https://youtu.be/09_LlHjoEiY?t=4415

export function dijkstraShortedPathTopologicalSort(graph: Graph<unknown, WeightedEdge>, startNodeId: string): DistanceMap {
    const sortedNodeIds = topologicalSort(graph)
    logger(`Sorted node ids: ${sortedNodeIds.join(', ')}`)

    const startNodeIndex = sortedNodeIds.findIndex(nId => nId === startNodeId)
    const nodeIdsToProcess = sortedNodeIds.slice(startNodeIndex)
    // Initialize every node to have distance of INFINITY
    const vertexDistanceMap = sortedNodeIds.reduce<DistanceMap>((map, nodeId) => {
        map[nodeId] = Number.POSITIVE_INFINITY
        return map
    }, {})
    // Set start node to have distance of 0 since we are starting there
    vertexDistanceMap[startNodeId] = 0

    logger(`Nodes to process: ${nodeIdsToProcess.join(', ')}`)
    logger(`Vertex Distances: ${JSON.stringify(vertexDistanceMap)}`)

    for (const nodeId of nodeIdsToProcess) {
        const node = graph.nodes.find(n => n.id === nodeId)!
        for (const edge of node.routes ?? []) {
            const minDistance = Math.min(vertexDistanceMap[nodeId] + edge.distance, vertexDistanceMap[edge.to])
            logger(`parent: ${nodeId} to: ${edge.to} min: ${minDistance}`)
            vertexDistanceMap[edge.to] = minDistance
            logger(`Vertex Distances: ${JSON.stringify(vertexDistanceMap)}`)
        }
    }

    logger(`Final Vertex Distances: ${JSON.stringify(vertexDistanceMap)}`)

    return vertexDistanceMap
}

// https://youtu.be/09_LlHjoEiY?t=5242

export function dijkstraShortedPathLazy(graph: Graph<unknown, WeightedEdge>, startNodeId: string) {
    const vertexDistanceMap = graph.nodes.reduce<DistanceMap>((map, node) => {
        map[node.id] = Number.POSITIVE_INFINITY
        return map
    }, {})
    vertexDistanceMap[startNodeId] = 0

    const priorityQueue: [string, number][] = [[startNodeId, 0]]
    
    while (priorityQueue.length > 0) {
        logger(`DistanceMap: ${JSON.stringify(vertexDistanceMap)}`)
        logger(`Priority Queue: [${priorityQueue}]`)
        const [nodeId, nodeDistance] = priorityQueue.shift()!
        if (nodeDistance > vertexDistanceMap[nodeId]) {
            logger(`Skipping queue item. Node: ${nodeId} queue distance: ${nodeDistance} existing distance: ${vertexDistanceMap[nodeId]}`)
            continue;
        }

        logger(`Find node: ${nodeId}`)
        const node = graph.nodes.find(n => n.id === nodeId)!

        for (const edge of node.routes ?? []) {
            const newDistance = nodeDistance + edge.distance
            if (newDistance < vertexDistanceMap[edge.to]) {
                vertexDistanceMap[edge.to] = newDistance
                priorityQueue.push([edge.to, newDistance])
            }
        }

        // Simulate priority by sorting
        logger(`Priority Queue PreSort: [${[...priorityQueue]}]`)
        priorityQueue.sort(([nodeA, dA], [nodeB, dB]) => dA - dB)
        logger(`Priority Queue PostSort: [${priorityQueue}]`)

    }

    return vertexDistanceMap
}