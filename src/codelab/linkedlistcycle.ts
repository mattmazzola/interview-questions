/**
 * Given a linked list, return the node where the cycle begins. If there is no cycle, return null.
 * Try solving it using constant additional space.
 */

export interface INode<T> {
    next: INode<T>| null
    value: T
}

export const findCycleNode = <T>(head: INode<T>): INode<T> | undefined => {
    const previousNodes: INode<T>[] = []

    let node = head;
    while (node.next != null) {
        if (previousNodes.indexOf(node.next) !== -1) {
            return node
        }

        previousNodes.push(node)
        node = node.next
    }

    return undefined;
}
