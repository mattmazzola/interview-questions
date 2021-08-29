export type Graph<T = unknown> = {
    rootNodeId: string
    nodes: Node<T>[]
}

export type Node<T = unknown> = {
    parent?: string
    id: string
    value: T
    routes?: string[]
}

export const traversGraph = (addNodeIds: (traversalIds: string[], newIds: string[]) => void) => {
    return <T>(graph: Graph<T>): T[] => {
        const values: T[] = []
        const visited: { [x: string]: boolean } = {}
        const queue = [graph.rootNodeId]

        while (queue.length > 0) {
            const nodeId = queue.shift()!
            const node = graph.nodes.find(n => n.id === nodeId)!

            // if node hasn't been visited
            if (!visited[node.id]) {
                // add value
                values.push(node.value)
                // mark node as visited
                visited[node.id] = true

                const nonVisitedNodeIds = (node.routes ?? []).filter(r => !visited[r])
                addNodeIds(queue, nonVisitedNodeIds)
            }
        }

        return values
    }
}

const breadFirstAdd = (queue: string[], newIds: string[]) => queue.push(...newIds)

export const breadthFirstTraversal = traversGraph(breadFirstAdd)

const depthFirstAdd = (stack: string[], newIds: string[]) => stack.unshift(...newIds)

export const depthFirstTraversal = traversGraph(depthFirstAdd)

export const depthFirstTraversalRecursive = <T>(
    graph: Graph<T>,
    nodeId: string,
    visited: { [x: string]: boolean } = {}
): T[] => {
    if (visited[nodeId]) {
        return []
    }

    visited[nodeId] = true

    const node = graph.nodes.find(n => n.id === nodeId)!

    return [
        node.value,
        ...(node.routes ?? [])
            .filter(nodeId => !visited[nodeId])
            .flatMap(nodeId => depthFirstTraversalRecursive(graph, nodeId, visited))
    ]
}