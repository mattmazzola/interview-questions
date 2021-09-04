import * as heap from './heaps'

describe('heap', () => {
    test('sort items by using max heap', () => {
        // Arrange
        const input = [4, 7, 5, 8, 9, 0, 2, 1, 52, 3, 40]
        const expected = [52, 40, 9, 8, 7, 5, 4, 3, 2, 1, 0]

        // Act
        const h1 = new heap.Heap()
        input.forEach(x => h1.insert(x))

        const sortedItems = []
        let max = h1.remove()
        while (max !== undefined) {
            sortedItems.push(max)
            max = h1.remove()
        }

        // Arrange
        expect(sortedItems).toEqual(expected)
    })
})

describe('priorityqueue', () => {
    test('test opeations of priority queue implemented using an array', () => {
        // Arrange
        const priorityQueue = new heap.PriorityQueueArray()

        // Act
        priorityQueue.insert(1)
        priorityQueue.insert(10)
        priorityQueue.insert(6)
        const max1 = priorityQueue.removeMax()

        priorityQueue.empty()
        priorityQueue.insert(123124)
        priorityQueue.insert(-123124)
        priorityQueue.insert(0)
        priorityQueue.insert(10)
        const max2 = priorityQueue.removeMax()

        priorityQueue.insert(98)
        const max3 = priorityQueue.removeMax()

        // Assert
        expect(max1).toBe(10)
        expect(max2).toBe(123124)
        expect(max3).toBe(98)
    })

    test('test opeations of priority queue implemented using a heap', () => {
        // Arrange
        const priorityQueue = new heap.PriorityQueue()

        // Act
        priorityQueue.insert(1)
        priorityQueue.insert(10)
        priorityQueue.insert(6)
        const max1 = priorityQueue.removeMax()

        priorityQueue.insert(123124)
        priorityQueue.insert(-123124)
        priorityQueue.insert(0)
        priorityQueue.insert(10)
        const max2 = priorityQueue.removeMax()

        priorityQueue.insert(98)
        const max3 = priorityQueue.removeMax()

        // Assert
        expect(max1).toBe(10)
        expect(max2).toBe(123124)
        expect(max3).toBe(98)
    })
})