/**
 * Given a sorted linked list, delete all duplicates such that each element appear only once.
 * 
 * For example,
 * Given 1->1->2, return 1->2.
 * Given 1->1->2->3->3, return 1->2->3.
 */
import { INode } from './linkedlistcycle'

export const removeDuplicateNodes = <T>(head: INode<T>): void => {
    let node = head

    while (node.next != null) {
        if (node.next.value === node.value) {
            node.next = node.next.next
        }
        else {
            node = node.next
        }
    }
}