import { Graph, Node } from './models'

const searchGraph = <T>(addNodeIds: (traversalIds: string[], newIds: string[]) => void) => {
    return (graph: Graph<T>, isTarget: (n: Node<T>) => boolean): Node<T>[] => {
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
                    const nodesPath = nodeIdsPath.map(nId => graph.nodes.find(n => n.id === nId)!)
                    return nodesPath
                }

                // mark node as visited
                visited.add(node.id)

                const nonVisitedNodeIds = (node.routes ?? []).filter(r => !visited.has(r))
                for (const nonVisitedNodeId of nonVisitedNodeIds) {
                    nodeParents[nonVisitedNodeId] = node.id
                }

                addNodeIds(queue, nonVisitedNodeIds)
            }
        }

        return []
    }
}

const breadFirstAdd = (queue: string[], newIds: string[]) => queue.push(...newIds)

export const breadthFirstSearch = searchGraph(breadFirstAdd)

const depthFirstAdd = (stack: string[], newIds: string[]) => stack.unshift(...newIds)

export const depthFirstSearch = searchGraph(depthFirstAdd)

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
