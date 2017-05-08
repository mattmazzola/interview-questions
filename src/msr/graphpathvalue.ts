/**
 * Given a binary tree and a positive number, return all the paths to a leaf node where the total of values through the path equals the given number
 * 
 *               6
 *             /   \
 *           3       2
 *         /   \   /   \
 *       7      1 2     1
 *      /          \     \
 *     1            1     1
 * 
 * [[6,3,1], [6,2,1,1]]
 */

export interface INode<T> {
    value: T
    left: INode<T> | null
    right: INode<T> | null
}

export const findPathsWithTotalValue = (root: INode<number>, value: number): number[][] => {
    if (root.value > value) {
        return []
    }

    const paths: number[][] = []
    const nextValue = value - root.value
    if (root.left && root.left.value < nextValue) {
        paths.push(findPathsWithTotalValue(root.left, nextValue).map(path => path.unshift(root.value)))
    }
    if (root.right && root.right.value < nextValue) {
        paths.push(findPathsWithTotalValue(root.right, nextValue).map(path => path.unshift(root.value)))
    }

    return paths
}

export const findPathsWithTotalValueSlower = (root: INode<number>, value: number): number[][] => {
    return findPaths(root)
        .filter(path => path.reduce((a, b) => a + b, 0) === value)
}

export const findPaths = (root: INode<number>): number[][] => findPathsWithFilter(root, () => true)

export const findPathsWithFilter = (root: INode<number>, filter: (n: INode<number>) => boolean): number[][] => {
        const paths: number[][] = []

    // If leaf node, return single item as path
    if (!root.left && !root.right) {
        return [[root.value]]
    }

    if (root.left && filter(root.left)) {
        findPaths(root.left)
            .forEach(path => paths.push([root.value, ...path]))
    }
    if (root.right && filter(root.right)) {
        findPaths(root.right)
            .forEach(path => paths.push([root.value, ...path]))
    }

    return paths
}