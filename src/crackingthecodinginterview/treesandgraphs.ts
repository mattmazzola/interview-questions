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

export const bft = <T>(root: INode<T>): T[] => {
    const queue: INode<T>[] = []
    const visited = new Set<INode<T>>()
    const nodes: INode<T>[] = []

    queue.push(root)

    while (queue.length > 0) {
        // Get next node to process from queue
        const node = queue.shift()!

        if (!visited.has(node)) {
            // Add node to list
            nodes.push(node)

            // Mark node as visited to prevent processing it in future
            visited.add(node)

            // Get alls nodes that have not been visited and add them to the queue
            queue.push(...node.nodes.filter(n => !visited.has(n)))
        }
    }

    return nodes.map(x => x.value)
}

export const isPath = <T>(root: INode<T>, target: INode<T>): boolean => {
    const queue: INode<T>[] = []
    const visited = new Set<INode<T>>()

    queue.push(root)
    
    while (queue.length > 0) {
        const node = queue.shift()!

        if (!visited.has(node)) {
            if (node === target) {
                return true
            }

            visited.add(node)

            queue.push(...node.nodes.filter(n => !visited.has(n)))
        }
    }

    return false
}

export const dft = <T>(root: INode<T>, visited: Set<INode<T>> = new Set<INode<T>>()): T[] => {
    if (visited.has(root)) {
        return []
    }

    visited.add(root)

    return [
        root.value,
        ...root.nodes
            .filter(n => !visited.has(n))
            .map(n => dft(n, visited))
            .reduce((a,b) => a.concat(b), [])
    ]
}

export const getPaths = <T>(root: INode<T>, visited: Set<INode<T>> = new Set<INode<T>>()): T[][] => {
    if (visited.has(root)) {
        return []
    }

    visited.add(root)

    if (root.nodes.length === 0) {
        return [[root.value]]
    }

    return root.nodes
            .filter(n => !visited.has(n))
            .map(n => getPaths(n, visited)
                .map(path => [root.value, ...path]))
            .reduce((a, b) => a.concat(b), [])
}

export const convertBinaryTreeToTree = <T>(root: IBinaryNode<T> | null): INode<T> | null => {
    if (root === null) {
        return null
    }

    const node: INode<T> = {
        value: root.value,
        nodes: []
    }

    const left = convertBinaryTreeToTree(root.left)
    const right = convertBinaryTreeToTree(root.right)

    if (left !== null) {
        node.nodes.push(left)
    }

    if (right !== null) {
        node.nodes.push(right)
    }

    return node
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

/**
 * 4.4 Given binary tree convert to list of linked lists
 */
export interface ILinkedListNode<T> {
    value: T
    next: ILinkedListNode<T> | null
}

export const convertBinaryTreeToLinkedLists = <T>(root: IBinaryNode<T>, lists: T[][] = [], level: number = 0): T[][] => {
    if (root === null) {
        return []
    }

    // Add current node to the current level
    if (lists[level]) {
        lists[level].push(root.value)
    }
    else {
        lists[level] = [root.value]
    }

    if (root.left) {
        convertBinaryTreeToLinkedLists(root.left, lists, level + 1)
    }

    if (root.right) {
        convertBinaryTreeToLinkedLists(root.right, lists, level + 1)
    }

    return lists
}

/**
 * 4.5 Given binary tree determine if it's a binary search tree
 */
export const isBinaryTreeBinarySearchTree = (root: IBinaryNode<number>): boolean => {
    if (root === null) {
        return false
    }

    let isLeftBST = root.left === null || (root.left.value <= root.value) && isBinaryTreeBinarySearchTree(root.left)
    let isRightBST = isLeftBST && (root.right === null || (root.right.value > root.value) && isBinaryTreeBinarySearchTree(root.right))

    return isLeftBST && isRightBST
}

/**
 * 4.6 Find next node (in-order successor)
 */
export interface IBinaryNodeParent<T> {
    parent: IBinaryNodeParent<T> | null
    value: T
    left: IBinaryNodeParent<T> | null
    right: IBinaryNodeParent<T> | null
}

export const findInorderSuccessor = <T>(root: IBinaryNodeParent<T>): IBinaryNodeParent<T> | null => {
    // Go right once, then go left until leaf
    if (root.right) {
        let node = root.right
        while (node.left !== null) {
            node = node.left
        }

        return node
    }

    // If at root return null since there is no node with greater value
    if (!root.parent) {
        return null
    }

    // If our parent is greater than us return it since it's the next most highest
    if (root.parent.value > root.value) {
        return root.parent
    }

    // Go up tree until parent which has greater value
    let parent = root.parent
    while (parent.value < root.value) {

        // If we reach the root before we found parent that is greater return null
        if (parent.parent === null) {
            return null
        }

        parent = parent.parent
    }

    // At this point the parent value is greater than root.value
    return parent
}

/**
 * 4.7 Find common ancestor
 */
export const findCommonAncestor = <T>(nodeA: IBinaryNodeParent<T>, nodeB: IBinaryNodeParent<T>): IBinaryNodeParent<T> | null => {
    const nodeAparents = getParents(nodeA)
    const nodeBparents = getParents(nodeB)

    let firstCommonAncestor: IBinaryNodeParent<T> | null = null
    nodeAparents.some(node => {
        if (nodeBparents.includes(node)) {
            firstCommonAncestor = node
            return true
        }

        return false
    })

    return firstCommonAncestor
}

const getParents = <T>(node: IBinaryNodeParent<T>): IBinaryNodeParent<T>[] => {
    const parents = []
    let parent = node.parent
    while (parent !== null) {
        parents.push(parent)
        parent = parent.parent
    }

    return parents
}

/**
 * 4.7.2 Same as above, but no parent links, must start from root 
 */
export const findCommonAncestorNoParent = <T>(root: IBinaryNode<T>, nodeA: IBinaryNode<T>, nodeB: IBinaryNode<T>): IBinaryNode<T> | null => {
    if (root === null) {
        return null
    }
    
    // If both nodes are less than root, they must both be on left
    if (nodeA.value < root.value && nodeB.value < root.value) {
        return findCommonAncestorNoParent(root.left!, nodeA, nodeB)
    }

    // If both nodes are greater than root, they must both be on right
    if (nodeA.value > root.value && nodeB.value > root.value) {
        return findCommonAncestorNoParent(root.right!, nodeA, nodeB)
    }

    // nodes must be on different sides of root, meaning root is common ancestor
    return root
}

/**
 * 4.9 Find paths of height
 */
export const getPathsOfHeight = (tree: INode<number>, height: number): number[][] => {
    return <number[][]>getPaths(tree)
        .map(path => {
            let sum = 0
            let pathSubset: number[] = []

            const pathMatch = path.some(value => {
                sum += value
                pathSubset.push(value)
                return sum === height
            })

            return pathMatch ? pathSubset : null
        })
        .filter(x => x)
}