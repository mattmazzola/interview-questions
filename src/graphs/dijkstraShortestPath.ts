import { Edge, Graph } from "./models";
import { topologicalSort } from "./topologicalSort";
import debug from 'debug';

const logger = debug('graphs:dijkstra')

export type WeightedEdge = Edge & {
    distance: number
}

// Problem from: https://youtu.be/09_LlHjoEiY?t=4415

export function dijkstraShortedPath<T = unknown>(graph: Graph<T, WeightedEdge>, startNodeId: string, targetNodeId: string): number {
    const sortedNodeIds = topologicalSort(graph)
    logger(`Sorted node ids: ${sortedNodeIds.join(', ')}`)

    const startNodeIndex = sortedNodeIds.findIndex(nId => nId === startNodeId)
    const nodeIdsToProcess = sortedNodeIds.slice(startNodeIndex)
    const vertexDistanceMap = sortedNodeIds.reduce<{ [key: string]: number }>((map, nodeId) => {
        let distance = Number.POSITIVE_INFINITY;
        if (nodeId === startNodeId) {
            distance = 0
        }

        map[nodeId] = distance
        return map
    }, {})

    logger(`Nodes to process: ${nodeIdsToProcess.join(', ')}`)
    logger(`Vertex Distances: ${JSON.stringify(vertexDistanceMap)}`)

    for(const nodeId of nodeIdsToProcess) {
        const node = graph.nodes.find(n => n.id === nodeId)!
        for (const edge of node.routes ?? []) {
            const minDistance = Math.min(vertexDistanceMap[nodeId] + edge.distance, vertexDistanceMap[edge.to])
            logger(`parent: ${nodeId} to: ${edge.to} min: ${minDistance}`)
            vertexDistanceMap[edge.to] = minDistance
        }
    }

    return vertexDistanceMap[targetNodeId]
}