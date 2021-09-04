import { Graph } from './models'
import debug from 'debug'

const logger = debug('graphs:topologicalsort')

// https://youtu.be/09_LlHjoEiY?t=3877
// https://en.wikipedia.org/wiki/Topological_sorting

export function topologicalSort(graph: Graph): string[] {
    logger('Topological Sort Begin')
    const permanentlyVisited = new Set<string>();
    const topologicalSort: string[] = []

    for(const node of graph.nodes) {
        logger(`node: ${node.id}`)
        if (!permanentlyVisited.has(node.id)) {
            logger(`node has not been visited: ${node.id}`)
            dft(graph, node.id, topologicalSort, permanentlyVisited)
        }
    }

    return topologicalSort
}

function dft(
    graph: Graph,
    nodeId: string,
    order: string[] = [],
    permanentVisited = new Set<string>(),
    visited = new Set<string>()
) {
    if (permanentVisited.has(nodeId)) {
        return
    }

    if (visited.has(nodeId)) {
        logger('loop detected?')
        throw new Error(`Loops detected in Depth First Search, Graph is not DAG`)
    }

    
    const node = graph.nodes.find(n => n.id === nodeId)!;
    
    const routes = node.routes ?? []
    logger(`DFT:
    permanentlyVisited: [${[...permanentVisited.keys()].join(', ')}]
    visited: [${[...visited.keys()].join(', ')}]
    node: ${nodeId}  routes: ${routes.join(', ')}`);

    visited.add(nodeId)

    routes
        .filter(nodeId => !visited.has(nodeId))
        .forEach(nodeId => dft(graph, nodeId, order, permanentVisited, visited))

    visited.delete(nodeId)
    permanentVisited.add(nodeId)
    order.unshift(nodeId)
}