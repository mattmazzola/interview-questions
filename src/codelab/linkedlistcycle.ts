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
            return node.next
        }

        previousNodes.push(node)
        node = node.next
    }

    return undefined;
}

export const findCycleNodeConstantSpace = <T>(head: INode<T>): INode<T> | null => {
    // If the head, or next two nodes are end of list return null to indicate no cycles
    if (!(head && head.next && head.next.next)) {
        return null
    }

    let slowNode = head.next
    let fastNode = head && head.next && head.next.next

    // Increment pointers until they meet
    while (true) {
        // if either of the pointers will reach end of list, return null to indicate no cycle
        if (!(slowNode.next && fastNode.next && fastNode.next.next)) {
            return null
        }

        if (slowNode === fastNode) {
            break
        }

        slowNode = slowNode.next
        fastNode = fastNode.next.next
    }

    // Reset slow node to beginning
    slowNode = head
    while(slowNode !== fastNode
        && slowNode.next != null
        && fastNode.next != null
    ) {
        slowNode = slowNode.next
        fastNode = fastNode.next
    }

    return slowNode
}
