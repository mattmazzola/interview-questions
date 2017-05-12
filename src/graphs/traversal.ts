export interface INode<T> {
    value: T
    nodes: INode<T>[]
}

export interface IVisited<T> {
    item: T
    visited: boolean
}

class Visited<T> implements IVisited<T> {
    item: T
    parent: T
    visited = false

    constructor(item: T) {
        this.item = item
    }
}

export const depthFirstTraveral = <T>(root: INode<T>): T[] => {
    if (root.nodes.length === 0) {
        return [root.value]
    }

    return [root.value, ...root.nodes.map(depthFirstTraveral).reduce((a,b) => a.concat(b))]
}

export const depthFirstTraveralIterative = <T>(root: INode<T>): T[] => {
    const nodes: IVisited<INode<T>>[] = []
    const values: T[] = []

    nodes.push(new Visited(root))

    while (nodes.length > 0) {
        let n1 = nodes.pop()!
        
        if (n1.visited == false) {
            n1.visited = true
            values.push(n1.item.value)
            reverse(n1.item.nodes).forEach(n => nodes.push(new Visited(n)))
        }
    }

    return values
}

const reverse = <T>(xs: T[]): T[] => {
    return [...xs].reverse()
}

export const breadthFirstTraversal = <T>(root: INode<T>): T[] => {
    const nodes: IVisited<INode<T>>[] = []
    const values: T[] = []

    nodes.unshift(new Visited(root))

    while (nodes.length > 0) {
        let n1 = nodes.pop()!
        
        if (n1.visited == false) {
            n1.visited = true
            values.push(n1.item.value)
            n1.item.nodes.forEach(n => nodes.unshift(new Visited(n)))
        }
    }

    return values
}