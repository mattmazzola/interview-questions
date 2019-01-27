import * as models from './models'
import * as utilities from './utilities'
import { insertInSorted } from './insertSorted'
import { deleteNode } from './deleteNode'

/** https://www.geeksforgeeks.org/compare-two-strings-represented-as-linked-lists/ */
export function compareStrings (s1: models.INode<string>, s2: models.INode<string>): number {
    let c1: models.INode<string> | null = s1
    let c2: models.INode<string> | null = s2

    do {
        if (c1!.value !== c2!.value) {
            return c1!.value.localeCompare(c2!.value)
        }

        c1 = c1!.next
        c2 = c2!.next
    }
    while (c1 !== null || c2 !== null)

    return 0
}

/** https://www.geeksforgeeks.org/sum-of-two-linked-lists/ */
export function addTwoNumbers (ll1: models.INode<number>, ll2: models.INode<number>): number {
    const n1 = convertToNumber(ll1)
    const n2 = convertToNumber(ll2)

    return n1 + n2
}

export function convertToNumber (head: models.INode<number>): number {
    const numbers = utilities.getNodeValues(head)
    return parseInt(numbers.join(''), 10)
}

/** https://www.geeksforgeeks.org/merge-a-linked-list-into-another-linked-list-at-alternate-positions/ */
export function mergeLists <T>(ll1: models.INode<T>, ll2: models.INode<T>): models.INode<T> {

    let current1: models.INode<T> | null = ll1
    let current2: models.INode<T> | null = ll2

    while (current1 != null && current2 != null) {
        const next1: models.INode<T> | null = current1 && current1.next
        const next2: models.INode<T> | null = current2 && current2.next
        // console.log(`nodes: `, current1.value, next1 && next1!.value, ' second: ', current2.value, next2 && next2.value)

        current1.next = current2
        current2.next = next1
        // console.log(`merge: `, current2.value, ` in `, current1)
        
        
        if (next1 == null) {
            current2.next = next2
            // console.log(`next1 is null, continue with second list: `, current2)
            break;
        }

        if (next2 == null) {
            // console.log(`end of second list. alread continued on first so break`)
            break;
        }

        current1 = next1
        current2 = next2
        // console.log(`current1: `, current1)
        // console.log(`current2: `, current2)
    }

    return ll1
}

/** https://www.geeksforgeeks.org/reverse-a-list-in-groups-of-given-size/ */
export function reverseKItems <T>(head: models.INode<T>, k: number): models.INode<T> {
    console.log(`k: `, k)
    return head
}

export function getKitems <T>(head: models.INode<T>, k: number): models.INode<T> {
    let reversed: models.INode<T> | null = null

    let current: models.INode<T> = head
    for (let i = 0; i < k; i++) {
        const next = current.next
        if (reversed === null) {
            reversed = {
               value: current.value,
                next: null
            }
        }
        else {
            current.next = reversed
            reversed = current
        }

        console.log(`next: `, next)
        console.log(`reversed: `, reversed)

        if (next == null) {
            break;
        }
        current = next
    }

    return reversed!
}

export {
    models,
    utilities,
    insertInSorted,
    deleteNode,
}