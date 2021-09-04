export interface INode<T> {
    value: T
    left: INode<T> | null
    right: INode<T> | null
}

export interface INodeWithLevel<T> {
    node: INode<T>
    level: number
}

/**
 * Given binary tree return maximum width
 * 
 *                      10              0:1
 *                  /       \
 *                5           15        1:2
 *              /   \       /    \
 *             2     7    12     16     2:4 (Max Width)
 *           /      / \
 *         1      6     8               3:2
 */
export const getMaxWidth = <T>(root: INode<T>): number => {
    if (root === null) {
        return 0
    }

    const queue: INodeWithLevel<T>[] = []
    const widths: number[] = []

    widths[0] = 1
    queue.push({ node: root, level: 0 })

    while (queue.length > 0) {
        const { node, level } = queue.pop()!
        widths[level] = (widths[level] || 0) + 1

        if (node.left) {
            queue.push({ node: node.left, level: level + 1 })
        }

        if (node.right) {
            queue.push({ node: node.right, level: level + 1 })
        }
    }

    return widths.reduce((max, width) => Math.max(max, width), 0)
}