export interface INode<T> {
    value: T
    nodes: INode<T>[]
}

export const depthFirstTraveral = <T>(root: INode<T>): T[] => {
    if (root.nodes.length === 0) {
        return [root.value]
    }

    return [root.value, ...root.nodes.map(depthFirstTraveral).reduce((a,b) => a.concat(b))]
}