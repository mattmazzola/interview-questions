export interface INode<T> {
    value: T
    next: INode<T> | null
}