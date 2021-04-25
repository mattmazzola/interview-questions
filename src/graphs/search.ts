export interface INode<T> {
    parent?: INode<T>
    value: T
    nodes?: INode<T>[]
}

export const breadthFirstSearch = <T>(root: INode<T>, id: (n: T) => number, isTarget: (n: T) => boolean): T[] => {
    const visited: { [x: number]: boolean } = {}
    const queue = [root]

    while (queue.length > 0) {
        const node = queue.shift()!

        // if node hasn't been visited
        if (!visited[id(node.value)]) {
            if (isTarget(node.value)) {
                const path = getPathToRoot(node)
                return path
            }

            // mark node as visited
            visited[id(node.value)] = true

            const nonVisitedNodes = (node.nodes ?? []).filter(n => !visited[id(n.value)])
            queue.push(...nonVisitedNodes)
        }
    }

    return []
}

export const getPathToRoot = <T>(node: INode<T>): T[] => {
    let currentNode = node
    const path: T[] = [node.value]

    while (currentNode.parent) {
        path.unshift(currentNode.parent.value)
        currentNode = currentNode.parent
    }

    return path
}

export const depthFirstSearch = <T>(root: INode<T>, id: (n: T) => number, isTarget: (n: T) => boolean): T[] => {
    const visited: { [x: number]: boolean } = {}
    const stack = [root]

    while (stack.length > 0) {
        const node = stack.shift()!

        // if node hasn't been visited
        if (!visited[id(node.value)]) {
            if (isTarget(node.value)) {
                const path = getPathToRoot(node)
                return path
            }

            // mark node as visited
            visited[id(node.value)] = true

            const nonVisitedNodes = (node.nodes ?? []).filter(n => !visited[id(n.value)])
            stack.unshift(...nonVisitedNodes)
        }
    }

    return []
}

/**
 * Given graph with nodes without parents, assign parent references
 */
export const graphBuilder = <T>(root: INode<T>): INode<T> => {
    const queue = [root]

    while(queue.length > 0) {
        const node = queue.shift()!

        for (const n of (node.nodes ?? [])) {
            n.parent = node
            queue.push(n)
        }
    }

    return root
}