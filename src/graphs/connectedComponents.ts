import { Graph, Node } from './models'

// https://youtu.be/09_LlHjoEiY?t=1956

export function getGraphComponents(graph: Graph): { count: number, nodeColors: [string, number][] } {
    let count = 0
    let nodeColors: [string, number][] = []
    const visited = new Set<string>()

    const colorFn = (node: Node) => {
        nodeColors.push([node.id, count])
    }

    for (const node of graph.nodes) {
        if (!visited.has(node.id)) {
            depthFirstTraversal(graph, node.id, visited, colorFn)
            count += 1
        }
    }

    return {
        count,
        nodeColors
    }
}

const depthFirstAdd = (stack: string[], newIds: string[]) => stack.unshift(...newIds)

export function depthFirstTraversal(
    graph: Graph,
    nodeId: string,
    visited = new Set<string>(),
    fn: (n: Node) => void
) {
    const queue = [nodeId]

    while (queue.length > 0) {
        const nodeId = queue.shift()!
        const node = graph.nodes.find(n => n.id === nodeId)!

        if (!visited.has(node.id)) {
            visited.add(nodeId)
            fn(node)

            const nonVisitedEdges = (node.routes ?? []).filter(e => !visited.has(e.to))
            depthFirstAdd(queue, nonVisitedEdges.map(e => e.to))
        }
    }
}