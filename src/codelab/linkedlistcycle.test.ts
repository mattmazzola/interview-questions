import { INode, findCycleNode, findCycleNodeConstantSpace } from './linkedlistcycle'

const linkedListWithoutCycle: INode<number> = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: null
        }
    }
}

let node5: INode<number> = {
    value: 5,
    next: null
}

const node3: INode<number> = {
    value: 3,
    next: {
        value: 4,
        next: node5
    }
}

const head: INode<number> = {
    value: 1,
    next: {
        value: 2,
        next: node3
    }
}

node5.next = node3

const linkedListWithCycle: INode<number> = head

describe('Code Lab', () => {
    describe('findCycleNode', () => {
        test('given linked list with no cycle returns undefined', () => {
            expect(findCycleNode(linkedListWithoutCycle)).toBeUndefined()
        })
        
        test('given linked list with cycle to return node which starts cycle', () => {
            expect(findCycleNode(linkedListWithCycle)).toBe(node3)
        })
    })
    
    describe('findCycleNodeConstantSpace', () => {
        test('given linked list with cycle, return node which starts cycle', () => {
            expect(findCycleNodeConstantSpace(linkedListWithCycle)).toBe(node3)
        })
    })
})