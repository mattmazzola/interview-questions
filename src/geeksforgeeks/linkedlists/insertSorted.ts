/** https://www.geeksforgeeks.org/given-a-linked-list-which-is-sorted-how-will-you-insert-in-sorted-way/ */

import * as models from './models'

export function insertInSorted (list: models.INode<number>, node: models.INode<number>): models.INode<number> {
    // insert before
    if (node.value < list.value) {
        node.next = list
        list = node
        return list
    }

    // increment until next is greater than node
    let current = list
    let next = current.next
    while (next !== null) {
        if (next.value > node.value) {  
            break
        }

        current = current.next!
        next = current.next
    }

    node.next = current.next
    current.next = node

    return list
}
