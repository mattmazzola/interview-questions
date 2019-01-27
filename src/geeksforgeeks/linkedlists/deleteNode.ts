/** https://www.geeksforgeeks.org/delete-a-given-node-in-linked-list-under-given-constraints/ */

import * as models from './models'

export function deleteNode <T>(head: models.INode<T>, node: models.INode<T>): models.INode<T> | null {
    if (head === node) {
        return head.next
    }

    let current = head
    let next = current.next

    while (next !== node && current.next !== null) {
        current = current.next
        next = current.next
    }

    if (node === next) {
        current.next = next.next
    }

    return head
}