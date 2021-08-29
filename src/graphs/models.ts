export type Graph<T = unknown> = {
    rootNodeId: string
    nodes: Node<T>[]
}

export type Grid = Array<Array<string>>

export type Node<T = unknown> = {
    parent?: string
    id: string
    value: T
    routes?: string[]
}