/**
 * 4.1 Determine if tree is balanced
 */
export interface IBinaryNode<T> {
    value: T
    left: IBinaryNode<T> | null
    right: IBinaryNode<T> | null
}

export const binaryNode = (value: number, left: IBinaryNode<number> | null = null, right: IBinaryNode<number> | null = null) =>
    ({
        value,
        left,
        right
    })

export interface IBalancedResult {
    balanced: boolean
    left: number
    right: number
}

export const isBalanced = <T>(root: IBinaryNode<T>): boolean => {
    return getHeight(root) !== -1
}

export const getHeight = <T>(root: IBinaryNode<T> | null): number => {
    if (root === null) {
        return 0
    }
    
    let sizeOfLeft = getHeight(root.left)
    if (sizeOfLeft === -1) {
        return -1
    }

    let sizeOfRight = getHeight(root.right)
    if (sizeOfRight === -1) {
        return -1
    }

    const sizesWithinLimit = Math.abs(sizeOfLeft - sizeOfRight) <= 1

    return sizesWithinLimit ? Math.max(sizeOfLeft, sizeOfRight) + 1 : -1
}

/**
 * 4.2 Given directed graph and two nodes find out if there is path between two nodes
 */
export interface INode<T> {
    value: T
    nodes: INode<T>[]
}

export const bft = <T>(root: INode<T>, getUnique: (node: T) => number): T[] => {
    const queue: INode<T>[] = []
    const visited: { [x: number]: boolean } = {}
    const nodes: INode<T>[] = []

    queue.push(root)

    while (queue.length > 0) {
        // Get next node to process from queue
        const node = queue.shift()!

        if (!visited[getUnique(node.value)]) {
            // Add node to list
            nodes.push(node)

            // Mark node as visited to prevent processing it in future
            visited[getUnique(node.value)] = true

            // Get alls nodes that have not been visited and add them to the queue
            queue.push(...node.nodes.filter(n => !visited[getUnique(n.value)]))
        }
    }

    return nodes.map(x => x.value)
}

export const isPath = <T>(root: INode<T>, target: INode<T>, getUnique: (node: T) => number): boolean => {
    const queue: INode<T>[] = []
    const visited: { [x: number]: boolean } = {}

    queue.push(root)
    
    while (queue.length > 0) {
        const node = queue.shift()!

        if (!visited[getUnique(node.value)]) {
            if (node === target) {
                return true
            }

            visited[getUnique(node.value)] = true

            queue.push(...node.nodes.filter(n => !visited[getUnique(n.value)]))
        }
    }

    return false
}

export const dft = <T>(root: INode<T>, id: (node: T) => number, visited: { [x: number]: boolean } = {}): T[] => {
    if (visited[id(root.value)]) {
        return []
    }

    visited[id(root.value)] = true

    return [
        root.value,
        ...root.nodes
            .filter(n => !visited[id(n.value)])
            .map(n => dft(n, id, visited))
            .reduce((a,b) => a.concat(b), [])
    ]
}

export const getPaths = <T>(root: INode<T>, id: (node: T) => number, visited: { [x: number]: boolean } = {}): T[][] => {
    if (visited[id(root.value)]) {
        return []
    }

    visited[id(root.value)] = true

    if (root.nodes.length === 0) {
        return [[root.value]]
    }

    return root.nodes
            .filter(n => !visited[id(n.value)])
            .map(n => getPaths(n, id, visited)
                .map(path => [root.value, ...path]))
            .reduce((a, b) => a.concat(b), [])
}

/**
 * 4.3 Given sorted array with unique integers create binary search tree
 */
export const convertSortedArrayToBinarySearchTree = (numbers: number[]): IBinaryNode<number> | null => {
    if (numbers.length === 0) {
        return null
    }

    if (numbers.length === 1) {
        return {
            value: numbers[0],
            left: null,
            right: null
        }
    }

    const maxIndex = numbers.length - 1
    const midIndex = Math.floor(maxIndex / 2)
    const midValue = numbers[midIndex]

    const left = convertSortedArrayToBinarySearchTree(numbers.slice(0, midIndex))
    const right = convertSortedArrayToBinarySearchTree(numbers.slice(midIndex + 1))

    return {
        value: midValue,
        left,
        right
    }
}