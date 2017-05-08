import { INode } from './linkedlistcycle'
import { removeDuplicateNodes } from './removeduplicateslinked'

const sortedLinkedListWithDuplicates: INode<number> = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 2,
            next: {
                value: 3,
                next: {
                    value: 4,
                    next: {
                        value: 4,
                        next: {
                            value: 4,
                            next: {
                                value: 5,
                                next: null
                            }
                        }
                    }
                }
            }
        }
    }
}

const sortedLinkedListWithoutDuplicates: INode<number> = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: {
                    value: 5,
                    next: null
                }
            }
        }
    }
}

describe('removeDuplicateNodes', () => {
    test('given list with duplicates return list without duplicates', () => {
        removeDuplicateNodes(sortedLinkedListWithDuplicates);

        let nodeA = sortedLinkedListWithDuplicates;
        let nodeB = sortedLinkedListWithoutDuplicates;
        while (nodeA.next != null && nodeB.next != null) {
            expect(nodeA.value).toEqual(nodeB.value)
            nodeA = nodeA.next
            nodeB = nodeB.next
        }
    })
})