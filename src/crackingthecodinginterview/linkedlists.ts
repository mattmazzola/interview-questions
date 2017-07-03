export interface INode<T> {
    value: T,
    next: INode<T> | null
}

/**
 * 2.1
 */
export const removeDuplicates = <T>(head: INode<T>): INode<T> => {
    if (head === null) {
        return head
    }

    const seenValues: any = {}
    seenValues[head.value] = 1
    
    let previous = head
    let node = head.next
    while (node !== null) {
        // If current nodes value is already seen, set previous node to next node to remove it
        if (seenValues[node.value]) {
            previous.next = node.next
            node = node.next!
        }
        else {
            seenValues[node.value] = 1
            previous = node
            node = node.next!
        }
    }

    return head
}

export const from = <T>(xs: T[]): INode<T> => {
    const head: any = {
        value: null,
        next: null
    }

    let previousNode = head
    xs.forEach((x, i) => {
        if (i === 0) {
            previousNode.value = x
            previousNode.next = null
        }
        else {
            const newNode = {
                value: x,
                next: null
            }

            previousNode.next = newNode
            previousNode = previousNode.next
        }
    })

    return head
}

export const getValues = <T>(head: INode<T>): T[] => {
    const values: T[] = []

    let node = head
    while (node !== null) {
        values.push(node.value)
        node = node.next!
    }

    return values
}

/**
 * 2.2 Find Kth last element
 */
export const findKthLastElement = <T>(head: INode<T>, k: number): INode<T> | undefined => {
    let node = head

    while (node !== null) {
        if (isKthLastElement(node, k)) {
            return node
        }

        node = node.next!
    }

    return undefined
}

const isKthLastElement = <T>(head: INode<T>, k: number): boolean => {
    let node = head
    let count = 0

    while(count < k - 1) {
        count += 1

        if (node.next === null) {
            break
        }

        node = node.next
    }

    return count === k - 1 && node.next === null
}

/**
 * 2.3 Given node in middle of single-linked list remove node
 */
export const removeNode = <T>(head: INode<T>): INode<T> => {
    let node = head

    while (node.next !== null) {
        node.value = node.next.value

        if (node.next.next === null) {
            node.next = null
            break;
        }

        node = node.next
    }

    return head
}

/**
 * 2.4 Partition Linked List
 */
export const partition = <T>(head: INode<T>, x: T): INode<T> => {
    let smallerItemsHead: INode<T> | null = null
    let smallerItemsTail: INode<T> | null = smallerItemsHead
    let largerItemsHead: INode<T> | null = null
    let largerItemsTail: INode<T> | null = largerItemsHead

    let node = head

    while (node !== null) {
        if (node.value < x) {
            if (smallerItemsHead === null) {
                smallerItemsHead = node
                smallerItemsTail = smallerItemsHead
            }
            else {
                smallerItemsTail!.next = {
                    value: node.value,
                    next: null
                }
                smallerItemsTail = smallerItemsTail!.next
            }
        }
        else {
            if (largerItemsHead === null) {
                largerItemsHead = node
                largerItemsTail = largerItemsHead
            }
            else {
                largerItemsTail!.next = {
                    value: node.value,
                    next: null
                }
                largerItemsTail = largerItemsTail!.next
            }
        }

        node = node.next!
    }

    if (smallerItemsTail !== null) {
        smallerItemsTail.next = largerItemsHead
    }
    else {
        smallerItemsTail = largerItemsHead
    }

    return smallerItemsTail!
}

/**
 * 2.5 Represent number as linked list
 */
export const addTwoLists = (a: INode<number>, b: INode<number>): INode<number> => {
    return convertNumberToLinkedList([a, b]
        .map(convertLinkedListToNumber)
        .reduce((a, b) => a + b))
}

export const convertLinkedListToNumber = (head: INode<number>): number => {
    let power = 0
    let number: number = null!
    let node = head

    while (node !== null) {
        number += Math.pow(10, power) * node.value
        power += 1
        node = node.next!
    }

    return number
}

export const convertNumberToLinkedList = (x: number): INode<number> => {
    let head: INode<number> = null!
    let tail = head

    while (x > 0) {
        const digit = x % 10
        
        const newNode = {
            value: digit,
            next: null
        }

        if (head === null) {
            head = newNode
            tail = head
        }
        else {
            tail.next = newNode
            tail = tail.next
        }

        x = Math.floor(x / 10)
    }

    return head
}

/**
 * 2.6 Return node at beginning of loop
 */
export const getElementAtBeginningOfLoop = (head: INode<number>): INode<number> | undefined => {
    let slow = head
    let fast = head

    if (slow.next === null) {
        return undefined
    }

    slow = slow.next

    if (fast.next && fast.next.next === null) {
        return undefined
    }

    fast = fast.next!.next!

    // Loop until pointers meet
    while (slow !== fast) {
        if (slow.next === null) {
            return undefined
        }

        slow = slow.next

        if (fast.next && fast.next.next === null) {
            return undefined
        }

        fast = fast.next!.next!
    }

    // Reset slow pointer to head and loop until they meet again
    // Note fast pointer moves same speed as slow
    slow = head

    while (slow !== fast) {
        slow = slow.next!
        fast = fast.next!
    }

    return slow
}

/**
 * 2.7 Check if list if palindrome
 */
export const isPalindrome = (head: INode<number>): boolean => {
    if (head === null) {
        return false
    }
    
    return isPalindrome2(getValues(head))
}

const isPalindrome2 = (xs: number[]): boolean => {
    if (xs.length <= 1) {
        return true
    }

    const first = xs[0]
    const last = xs[xs.length - 1]
    const middle = xs.filter((x, i) => 0 < i && i < xs.length - 1)

    return (first === last) ? isPalindrome2(middle) : false
}