import { Edge, Graph, Node } from './models'

const traversGraph = (addNodeIds: (traversalIds: string[], newIds: string[]) => void) => {
    return <T>(graph: Graph<T, Edge>): string[] => {
        const path: string[] = []
        const visited = new Set<string>();
        const queue = [graph.rootNodeId]

        while (queue.length > 0) {
            const nodeId = queue.shift()!
            const node = graph.nodes.find(n => n.id === nodeId)!

            // if node hasn't been visited
            if (!visited.has(node.id)) {
                // add value
                path.push(node.id)
                // mark node as visited
                visited.add(node.id);

                const nonVisitedEdges = (node.routes ?? []).filter(e => !visited.has(e.to))
                addNodeIds(queue, nonVisitedEdges.map(e => e.to))
            }
        }

        return path
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
    const nonVisitedEdges = (node.routes ?? [])
        .filter(edge => !visited.has(edge.to))
        .flatMap(edge => depthFirstTraversalRecursive(graph, edge.to, visited))

    return [
        node,
        ...nonVisitedEdges
    ]
}