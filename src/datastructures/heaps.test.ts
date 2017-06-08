import * as heap from './heaps'

describe('heap', () => {
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
})