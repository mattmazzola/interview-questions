import { Graph, Node } from './models'

const traversGraph = (addNodeIds: (traversalIds: string[], newIds: string[]) => void) => {
    return <T>(graph: Graph<T>): Node<T>[] => {
        const nodes: Node<T>[] = []
        const visited: { [x: string]: boolean } = {}
        const queue = [graph.rootNodeId]

        while (queue.length > 0) {
            const nodeId = queue.shift()!
            const node = graph.nodes.find(n => n.id === nodeId)!

            // if node hasn't been visited
            if (!visited[node.id]) {
                // add value
                nodes.push(node)
                // mark node as visited
                visited[node.id] = true

                const nonVisitedNodeIds = (node.routes ?? []).filter(r => !visited[r])
                addNodeIds(queue, nonVisitedNodeIds)
            }
        }

        return nodes
    }
}

const breadFirstAdd = (queue: string[], newIds: string[]) => queue.push(...newIds)

export const breadthFirstTraversal = traversGraph(breadFirstAdd)

const depthFirstAdd = (stack: string[], newIds: string[]) => stack.unshift(...newIds)

export const depthFirstTraversal = traversGraph(depthFirstAdd)

export const depthFirstTraversalRecursive = <T>(
    graph: Graph<T>,
    nodeId: string,
    visited = new Set<string>()
): Node[] => {
    if (visited.has(nodeId)) {
        return []
    }

    visited.add(nodeId)

    const node = graph.nodes.find(n => n.id === nodeId)!
    const nonVisitedNodes = (node.routes ?? [])
        .filter(nodeId => !visited.has(nodeId))
        .flatMap(nodeId => depthFirstTraversalRecursive(graph, nodeId, visited))

    return [
        node,
        ...nonVisitedNodes
    ]
}