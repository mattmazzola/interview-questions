export interface INode<T> {
    value: T
    nodes: INode<T>[]
}

export const breadthFirstTraversal = <T>(root: INode<T>, id: (n: T) => number): T[] => {
    const values: T[] = []
    const visited: { [x: number]: boolean } = {}
    const queue = [root]

    while(queue.length > 0) {
        const node = queue.shift()!

        // if node hasn't been visited
        if (!visited[id(node.value)]) {
            // add value
            values.push(node.value)
            // mark node as visited
            visited[id(node.value)] = true

            const nonVisitedNodes = node.nodes.filter(n => !visited[id(n.value)])
            queue.push(...nonVisitedNodes)
        }
    }

    return values
}

export const depthFirstTraversal = <T>(root: INode<T>, id: (n: T) => number): T[] => {
    const values: T[] = []
    const visited: { [x: number]: boolean } = {}
    const stack = [root]

    while (stack.length > 0) {
        const node = stack.shift()!

        // if node hasn't been visited
        if (!visited[id(node.value)]) {
            // add value
            values.push(node.value)
            // mark node as visited
            visited[id(node.value)] = true

            const nonVisitedNodes = node.nodes.filter(n => !visited[id(n.value)])
            stack.unshift(...nonVisitedNodes)
        }
    }

    return values
}

export const depthFirstTraversalRecursive = <T>(root: INode<T>, id: (node: T) => number, visited: { [x: number]: boolean } = {}): T[] => {
    if (visited[id(root.value)]) {
        return []
    }
    
    visited[id(root.value)] = true

    return [
        root.value,
        ...root.nodes
            .filter(n => !visited[id(n.value)])
            .flatMap(n => depthFirstTraversalRecursive(n, id, visited))
    ]
}