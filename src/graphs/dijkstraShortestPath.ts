import { Edge, Graph } from "./models"
import { topologicalSort } from "./topologicalSort"
import debug from 'debug'

const logger = debug('graphs:dijkstra')

export type WeightedEdge = Edge & {
    distance: number
}

export type PreviousMap = { [key: string]: string | null}
export type DistanceMap = { [key: string]: number }

// Problem from: https://youtu.be/09_LlHjoEiY?t=4415

export function dijkstraTopologicalSort(graph: Graph<unknown, WeightedEdge>, startNodeId: string): [DistanceMap, PreviousMap] {
    const sortedNodeIds = topologicalSort(graph)
    logger(`Dijkstra Topological Begin`)
    logger(`Sorted node ids: ${sortedNodeIds.join(', ')}`)

    const startNodeIndex = sortedNodeIds.findIndex(nId => nId === startNodeId)
    const nodeIdsToProcess = sortedNodeIds.slice(startNodeIndex)
    const previousNodeIdMap = graph.nodes.reduce<PreviousMap>((map, node) => {
        map[node.id] = null
        return map
    }, {})
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
            const newDistance = vertexDistanceMap[nodeId] + edge.distance
            if (newDistance < vertexDistanceMap[edge.to]) {
                previousNodeIdMap[edge.to] = node.id
                logger(`Update distance for node: ${edge.to}. new: (${vertexDistanceMap[nodeId]} + ${edge.distance})  < current: ${vertexDistanceMap[edge.to]}`)
                vertexDistanceMap[edge.to] = newDistance
            }
            logger(`Vertex Distances: ${JSON.stringify(vertexDistanceMap)}`)
        }
    }

    logger(`Final Vertex Distances: ${JSON.stringify(vertexDistanceMap)}`)
    logger(`Dijkstra Topological End`)

    return [vertexDistanceMap, previousNodeIdMap]
}

// https://youtu.be/09_LlHjoEiY?t=5242


export function dijkstraLazy(graph: Graph<unknown, WeightedEdge>, startNodeId: string): [DistanceMap, PreviousMap] {
    const previousNodeIdMap = graph.nodes.reduce<PreviousMap>((map, node) => {
        map[node.id] = null
        return map
    }, {})
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
                previousNodeIdMap[edge.to] = node.id
                priorityQueue.push([edge.to, newDistance])
            }
        }

        // Simulate priority by sorting
        logger(`Priority Queue PreSort: [${[...priorityQueue]}]`)
        priorityQueue.sort(([nodeA, dA], [nodeB, dB]) => dA - dB)
        logger(`Priority Queue PostSort: [${priorityQueue}]`)

    }

    return [vertexDistanceMap, previousNodeIdMap]
}

export function findShortedPath(
    distanceMap: DistanceMap,
    previousNodeMap: PreviousMap,
    endNodeId: string
): string[] {
    logger(`Find shorted path start`)
    if (distanceMap[endNodeId] === Number.POSITIVE_INFINITY) {
        return []
    }
    logger(`Previous node map: ${JSON.stringify(previousNodeMap)}`)
    
    const path = [endNodeId]
    let currentNodeId: string | null = endNodeId
    while (currentNodeId != null) {
        currentNodeId = previousNodeMap[currentNodeId]
        logger(`CurrentNodeId: ${currentNodeId}`)

        if (currentNodeId) {
            path.unshift(currentNodeId)
            logger(`Add node ${currentNodeId} to path`)
        }
        logger(`Path: ${JSON.stringify(path)}`)
    }

    logger(`Find shorted path end`)

    return path
}