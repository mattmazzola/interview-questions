export interface INode<T> {
    left: INode<T> | null
    right: INode<T> | null
    value: T
}

export const depthFirstSearchRecursion = <T>(root: INode<T>): T[] => {
    const values = [root.value]

    if (root.left) {
        values.push(...depthFirstSearchRecursion(root.left))
    }
    if (root.right) {
        values.push(...depthFirstSearchRecursion(root.right))
    }

    return values
}

export const depthFirstSearch = <T>(root: INode<T>): T[] => {
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

export const breadFirstSearch = <T>(root: INode<T>): T[] => {
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
