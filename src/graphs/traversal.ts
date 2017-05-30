export interface INode<T> {
    value: T
    nodes: INode<T>[]
}

export const breadthFirstSearch = <T>(root: INode<T>, getUnique: (n: T) => number): T[] => {
    const values: T[] = []
    const visited: { [x: number]: boolean } = {}
    const queue = [root]

    while(queue.length) {
        const node = queue.shift()!

        if (!visited[getUnique(node.value)]) {
            values.push(node.value)
            visited[getUnique(node.value)] = true

            queue.push(...node.nodes.filter(n => !visited[getUnique(n.value)]))
        }
    }

    return values
}

export const depthFirstSearch = <T>(root: INode<T>, id: (n: T) => number): T[] => {
    const values: T[] = []
    const visited: { [x: number]: boolean } = {}
    const stack = [root]

    while (stack.length > 0) {
        const node = stack.pop()!

        if (!visited[id(node.value)]) {
            values.push(node.value)
            visited[id(node.value)] = true

            stack.push(...reverse(node.nodes.filter(n => !visited[id(n.value)])))
        }
    }

    return values
}

export const dfs = <T>(root: INode<T>, id: (n: T) => number, visited: { [x: number]: boolean } = {}): T[] => {
    visited[id(root.value)] = true

    if (root.nodes.length === 0) {
        return [root.value]
    }

    return [
        root.value,
        ...root.nodes
            .filter(n => !visited[id(n.value)])
            .map(n => dfs(n, id, visited))
            .reduce((a,b) => a.concat(b), [])
    ]
}

const reverse = <T>(xs: T[]): T[] => {
    return [...xs].reverse()
}