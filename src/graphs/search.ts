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

export const breadthFirstSearch = (graph: Graph, isTarget: (n: Node) => boolean): string[] => {
    const visited: { [x: string]: boolean } = {}
    const queue = [graph.rootNodeId]

    while (queue.length > 0) {
        const nodeId = queue.shift()!
        const node = graph.nodes.find(n => n.id === nodeId)!

        // if node hasn't been visited
        if (!visited[node.id]) {
            if (isTarget(node)) {
                const path = getPathToRoot(graph, node.id)
                return path
            }

            // mark node as visited
            visited[node.id] = true

            const nonVisitedNodeIds = (node.routes ?? []).filter(r => !visited[r])
            queue.push(...nonVisitedNodeIds)
        }
    }

    return []
}

export const getPathToRoot = (graph: Graph, nodeId: string): string[] => {
    let currentNode = graph.nodes.find(n => n.id === nodeId)!
    const path = [currentNode.id]

    while (currentNode.parent) {
        path.unshift(currentNode.parent)
        const parentNode = graph.nodes.find(n => n.id === currentNode.parent)!
        currentNode = parentNode
    }

    return path
}

export const depthFirstSearch = (graph: Graph, nodeId: string, isTarget: (n: Node) => boolean): string[] => {
    const visited: { [x: string]: boolean } = {}
    const stack = [nodeId]

    while (stack.length > 0) {
        const nodeId = stack.shift()!
        const node = graph.nodes.find(n => n.id === nodeId)!

        // if node hasn't been visited
        if (!visited[node.id]) {
            if (isTarget(node)) {
                const path = getPathToRoot(graph, node.id)
                return path
            }

            // mark node as visited
            visited[node.id] = true

            const nonVisitedNodeIds = (node.routes ?? []).filter(r => !visited[r])
            stack.unshift(...nonVisitedNodeIds)
        }
    }

    return []
}

/**
 * Given graph with nodes without parents, assign parent references
 */
export function assignParents(graph: Graph): void {
    const queue = [graph.rootNodeId]

    while(queue.length > 0) {
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