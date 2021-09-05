export type Edge = {
    to: string
}

export type Node<T = unknown, E = Edge> = {
    id: string
    value: T
    routes?: E[]
}

export type Graph<T = unknown, E = Edge> = {
    rootNodeId: string
    nodes: Node<T, E>[]
}

export type Grid = Array<Array<string>>


