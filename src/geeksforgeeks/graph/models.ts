export interface IGraph<V, E> {
    verticies: V[]
    edges: E[]
}

export type ISimpleGraph = IGraph<IVertex, IEdge>
export type IWeightedGraph = IGraph<IVertexTotal, IWeightedEdge>

export interface IVertex {
    id: number
}

export interface IEdge {
    start: IVertex
    end: IVertex
}

export interface IVertexTotal extends IVertex {
    total: number
}

export interface IWeightedEdge {
    start: IVertexTotal
    end: IVertexTotal
    distance: number
}