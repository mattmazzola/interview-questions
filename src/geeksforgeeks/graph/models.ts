export interface IGraph<V, E> {
    vertices: V[]
    edges: E[]
}

export type ISimpleGraph = IGraph<IVertex, IEdge>
export type IWeightedGraph = IGraph<IVertexMinDistance, IWeightedEdge>

export interface IVertex {
    id: number
}

export interface IEdge {
    start: IVertex
    end: IVertex
}

export interface IVertexMinDistance extends IVertex {
    minDistance: number
}

export interface IWeightedEdge {
    start: IVertexMinDistance
    end: IVertexMinDistance
    distance: number
}