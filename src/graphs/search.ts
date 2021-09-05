import { Edge, Graph, Node } from './models'

const getPathToTarget = <T>(addNodeIds: (traversalIds: string[], newIds: string[]) => void) => {
    return (graph: Graph<T, Edge>, isTarget: (n: Node<T, Edge>) => boolean): string[] => {
        const visited = new Set<string>();
        const queue = [graph.rootNodeId]
        const nodeParents: { [key: string]: string } = {}

        while (queue.length > 0) {
            const nodeId = queue.shift()!
            const node = graph.nodes.find(n => n.id === nodeId)!

            // if node hasn't been visited
            if (!visited.has(node.id)) {
                if (isTarget(node)) {
                    const nodeIdsPath = getPathFromStart(nodeParents, graph.rootNodeId, node.id)
                    return nodeIdsPath
                }

                // mark node as visited
                visited.add(node.id)

                const edgesToNonVisitedNodes = (node.routes ?? []).filter(e => !visited.has(e.to))
                for (const nonVisitedEdge of edgesToNonVisitedNodes) {
                    nodeParents[nonVisitedEdge.to] = node.id
                }

                addNodeIds(queue, edgesToNonVisitedNodes.map(e => e.to))
            }
        }

        return []
    }
}

const breadFirstAdd = (queue: string[], newIds: string[]) => queue.push(...newIds)

export const breadthFirstSearch = getPathToTarget(breadFirstAdd)

const depthFirstAdd = (stack: string[], newIds: string[]) => stack.unshift(...newIds)

export const depthFirstSearch = getPathToTarget(depthFirstAdd)

/**
 * Given mapping of nodeIds to their parent node Ids reconstruct path from root to start
 * @param nodeParents 
 */
export const getPathFromStart = (
    nodeParents: { [nodeId: string]: string },
    startNodeId: string,
    endNodeId: string
): string[] => {
    const path = [endNodeId]
    let currentNodeId = endNodeId
    let currentParentId = nodeParents[currentNodeId]

    while (currentParentId) {
        path.unshift(currentParentId)
        currentNodeId = currentParentId
        currentParentId = nodeParents[currentNodeId]
    }

    return path[0] === startNodeId
        ? path
        : []
}
