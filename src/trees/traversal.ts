export interface INode<T> {
    left: INode<T> | null
    right: INode<T> | null
    value: T
}

export const depthFirstTraversalRecusion = <T>(root: INode<T>): T[] => {
    const values = [root.value]

    if (root.left) {
        values.push(...depthFirstTraversalRecusion(root.left))
    }
    if (root.right) {
        values.push(...depthFirstTraversalRecusion(root.right))
    }

    return values
}

export const getPaths = <T>(root: INode<T>): T[][] => {
    const current = [[root.value]]
    let paths: T[][] = []
    
    if (root.left) {
        const leftPaths = getPaths(root.left)
        const combinedLeftPaths: T[][] = []
        for (const leftPath of leftPaths) {
            combinedLeftPaths.push([root.value, ...leftPath])
        }
        
        paths.push(...combinedLeftPaths)
    }
    
    if (root.right) {
        const rightPaths = getPaths(root.right)
        const combinedRightPaths: T[][] = []
        for (const rightPath of rightPaths) {
            combinedRightPaths.push([root.value, ...rightPath])
        }
        paths.push(...combinedRightPaths)
    }

    return paths.length > 0
        ? paths
        : current
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
