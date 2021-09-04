export interface INode<T> {
    left: INode<T> | null
    right: INode<T> | null
    value: T
}

export const depthFirstTraversalRecursive = <T>(root: INode<T>): T[] => {
    const values = [root.value]

    if (root.left) {
        values.push(...depthFirstTraversalRecursive(root.left))
    }
    if (root.right) {
        values.push(...depthFirstTraversalRecursive(root.right))
    }

    return values
}

export const getPathsRecursive = <T>(root: INode<T>): T[][] => {
    const nodesToSearch: INode<T>[] = []
    if (root.left) {
        nodesToSearch.push(root.left)
    }

    if (root.right) {
        nodesToSearch.push(root.right)
    }

    const paths = nodesToSearch
        .flatMap(node => getPathsRecursive(node))
        .map(path => [root.value, ...path])

    return paths.length > 0
        ? paths
        : [[root.value]]
}

export const depthFirstTraversal = <T>(root: INode<T>): T[] => {
    const stack = [root]
    const values: T[] = []

    while (stack.length > 0) {
        const node = stack.pop()!

        values.push(node.value)

        if (node.right) {
            stack.push(node.right)
        }

        if (node.left) {
            stack.push(node.left)
        }
    }

    return values
}

function getPath<T>(leaf: INode<T>, nodeParents: Map<INode<T>, INode<T>>) {
    let current: INode<T> | undefined = leaf
    const path: T[] = []

    while (current) {
        path.unshift(current.value)
        current = nodeParents.get(current)
    }

    return path
}

export function depthFirstPaths<T>(root: INode<T>): T[][] {
    const stack = [root]
    const nodeParents = new Map<INode<T>, INode<T>>()
    const paths: T[][] = []

    while (stack.length !== 0) {
        const node = stack.pop()!

        if (node.left == undefined && node.right == undefined) {
            const pathToLeaf = getPath(node, nodeParents)
            paths.push(pathToLeaf)
        }

        if (node.left) {
            nodeParents.set(node.left, node)
            stack.push(node.left)
        }

        if (node.right) {
            nodeParents.set(node.right, node)
            stack.push(node.right)
        }
    }

    return paths.length > 0
        ? paths
        : [[root.value]]
}

export function breadFirstTraversal<T>(root: INode<T>): T[] {
    const queue = [root]
    const values: T[] = []

    while (queue.length > 0) {
        const node = queue.shift()!
        values.push(node.value)

        if (node.left) {
            queue.push(node.left)
        }
        if (node.right) {
            queue.push(node.right)
        }
    }

    return values
}
