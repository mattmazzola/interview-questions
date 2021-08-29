import { Graph, Node } from './models'

const searchGraph = (addNodeIds: (traversalIds: string[], newIds: string[]) => void) => {
    return (graph: Graph, isTarget: (n: Node) => boolean): string[] => {
        const visited: { [x: string]: boolean } = {}
        const queue = [graph.rootNodeId]
        const nodeParents: { [key: string]: string } = {}

        while (queue.length > 0) {
            const nodeId = queue.shift()!
            const node = graph.nodes.find(n => n.id === nodeId)!

            // if node hasn't been visited
            if (!visited[node.id]) {
                if (isTarget(node)) {
                    const path = getPathFromStart(nodeParents, graph.rootNodeId, node.id)
                    return path
                }

                // mark node as visited
                visited[node.id] = true

                const nonVisitedNodeIds = (node.routes ?? []).filter(r => !visited[r])
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
 * Assuming each node has a parent property (which may not be the case)
 * Start at given node and continue up parents until you get to one with no parent
 */
export const getPathFromRoot = (graph: Graph, nodeId: string): string[] => {
    let currentNode = graph.nodes.find(n => n.id === nodeId)!
    const path = [currentNode.id]

    while (currentNode.parent) {
        path.unshift(currentNode.parent)
        const parentNode = graph.nodes.find(n => n.id === currentNode.parent)!
        currentNode = parentNode
    }

    return path
}

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

/**
 * Given graph with nodes without parents, assign parent references
 */
export function assignParents(graph: Graph): void {
    const queue = [graph.rootNodeId]

    while (queue.length > 0) {
        const nId = queue.shift()!
        const node = graph.nodes.find(n => n.id === nId)!

        for (const nodeId of (node.routes ?? [])) {
            const n = graph.nodes.find(n => n.id === nodeId)!
            if (n) {
                n.parent = nId
                queue.push(nodeId)
            }
        }
    }
}