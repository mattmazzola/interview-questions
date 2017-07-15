import * as LinkedList from './linkedlists'

describe('Cracking The Coding Interview', () => {
    describe('Linked Lists', () => {
        describe('2.1 Remove duplicates', () => {
            test('given linked list with duplicate values, remove the duplicates', () => {
                // Arrange
                const head = LinkedList.from([1,1,2,3,4,4,1,5,6,7,10])
                const head2 = LinkedList.from([1,1,2,3,4,4,1,5,6,7,10])
                const expectedValues = [1,2,3,4,5,6,7,10]

                // Act
                const newList = LinkedList.removeDuplicates(head)
                const newList2 = LinkedList.removeDuplicates(head2)
                const actualValues = LinkedList.getValues(newList)
                const actualValues2 = LinkedList.getValues(newList2)

                // Assert
                expect(actualValues).toEqual(expectedValues)
                expect(actualValues2).toEqual(expectedValues)
            })
        })

        describe('2.2 Find kth element', () => {
            test('given linked list return the kth element', () => {
                // Arrange
                const list = LinkedList.from([1,2,3,4,5,6,7,8,9,10,11,12,13,14])
                
                // Act
                const kthElement = LinkedList.findKthLastElement(list, 3)
                const kthElement2 = LinkedList.findKthLastElementQueue(list, 3)

                // Assert
                expect(kthElement!.value).toEqual(12)
                expect(kthElement2!.value).toEqual(12)
            })

            test('given list shorter than k, return undefined', () => {
                // Arrange
                const list = LinkedList.from([1,2,3,4])
                
                // Act
                const kthElement = LinkedList.findKthLastElement(list, 6)
                const kthElement2 = LinkedList.findKthLastElementQueue(list, 6)

                // Assert
                expect(kthElement).toBeUndefined()
                expect(kthElement2).toBeUndefined()
            })
        })

        describe('2.3 Given node in the middle of single linked list, remove the node', () => {
            test('given node should remove it from the list', () => {
                // Arrange
                const list = LinkedList.from([1,2,3,4,5,6,7,8,9])

                let middleNode = list
                for(let i = 0; i < 5; i++) {
                    middleNode = middleNode.next!
                }

                // Act
                const newList = LinkedList.removeNode(middleNode)

                // Assert
                expect(LinkedList.getValues(list)).toEqual([1,2,3,4,5,7,8,9])
            })

            test('given last node should return same list since it cant remove it', () => {
                // Arrange
                const list = LinkedList.from([1,2,3,4,5,6,7,8,9])

                let node = list
                while(node.next != null) {
                    node = node.next!
                }

                // Act
                const newList = LinkedList.removeNode(node)

                // Assert
                expect(LinkedList.getValues(list)).toEqual([1,2,3,4,5,6,7,8,9])
            })
        })

        describe('2.4 Partition a linked list', () => {
            test('given linked list and value, return list with all items below value come before all items greater than', () => {
                // Arrange
                const list = LinkedList.from([10,12,37,4,5,60,17,8])

                // Act
                const newList = LinkedList.partition(list, 25)

                // Assert
                expect(LinkedList.getValues(list)).toEqual([10,12,4,5,17,8,37,60])
            })
        })

        describe('2.5 numbers are represented as linked lists', () => {
            test('given two linked lists, convert them to numbers, add them and return new linked list representing sum', () => {
                // Arrange
                const list1 = LinkedList.from([7,1,6])
                const list2 = LinkedList.from([1,2,3,4])
                
                // Act
                const list3 = LinkedList.addTwoLists(list1, list2)

                // Assert
                // 4321
                // +617
                // 4938
                expect(LinkedList.getValues(list3)).toEqual([8,3,9,4])
            })

            test('should convert linked list to number', () => {
                // Arrange
                const list = LinkedList.from([1,2,3,4,5])

                // Act/Assert
                expect(LinkedList.convertLinkedListToNumber(list)).toBe(54321)
            })

            test('should convert linked list to number', () => {
                // Arrange

                // Act
                const list = LinkedList.convertNumberToLinkedList(54321)
                const expected = LinkedList.getValues(list)

                // Assert
                expect(expected).toEqual([1,2,3,4,5])
            })
        })

        describe('2.6 Cycle detection', () => {
            test('given linked list with cycle, return the element at beginning of cycle', () => {
                // Arrange
                const cycleStart: LinkedList.INode<number> = {
                    value: 3,
                    next: null
                }

                const last: LinkedList.INode<number> = {
                    value: 5,
                    next: cycleStart
                }

                cycleStart.next = {
                    value: 4,
                    next: last
                }

                const head: LinkedList.INode<number> = {
                    value: 1,
                    next: {
                        value: 2,
                        next: cycleStart
                    }
                }

                // Act
                const startElement = LinkedList.getElementAtBeginningOfLoop(head)

                // Assert
                expect(startElement!.value).toBe(cycleStart.value)
            })
        })

        describe('2.7 Check if list is palindrome', () => {
            test('given null head return false', () => {
                expect(LinkedList.isPalindrome(null!)).toBe(false)
            })

            test('given list which is palindrome should return true', () => {
                // Arrange
                const list = LinkedList.from([1,2,3,4,3,2,1])

                expect(LinkedList.isPalindrome(list)).toBe(true)
            })

            test('given list which is NOT palindrome should return false', () => {
                // Arrange
                const list = LinkedList.from([1,2,3,4])

                expect(LinkedList.isPalindrome(list)).toBe(false)
            })
        })
    })
})