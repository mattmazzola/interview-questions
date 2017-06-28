/**
 * Heap data structure using array as backing data
 */
export class Heap {
    items: number[] = [Number.MIN_VALUE]

    insert(x: number) {
        let newItemIndex = this.items.push(x) - 1

        // Move item up tree until it is not greater than its parent or reaches the top
        let parentIndex = Math.floor(newItemIndex/2)
        while (parentIndex > 0) {
            if (this.items[newItemIndex] <= this.items[parentIndex]) {
                break
            }

            const temp = this.items[parentIndex]
            this.items[parentIndex] = this.items[newItemIndex]
            this.items[newItemIndex] = temp
            newItemIndex = parentIndex
            parentIndex = Math.floor(parentIndex/2)
        }
    }

    remove(): number | undefined {
        if (this.items.length === 1) {
            return undefined
        }

        if (this.items.length === 2) {
            return this.items.pop()!
        }

        // Save current max to return
        const root = this.items[1]
        
        // Set last item as root and move it down tree until it is not less then a child or reachs leaf
        this.items[1] = this.items.pop()!
        let itemIndex = 1
        while (itemIndex < this.items.length) {
            const leftIndex = itemIndex * 2
            const rightIndex = itemIndex * 2 + 1

            let left = (leftIndex < this.items.length) ? this.items[leftIndex] : null
            let right = (rightIndex < this.items.length) ? this.items[rightIndex] : null

            // If one of the children is larger, swap the largest child with the the parent (item)
            let indexOfLargestItem = itemIndex
            if (left && left > this.items[itemIndex]) {
                indexOfLargestItem = leftIndex
            }
            if (right && right > this.items[indexOfLargestItem]) {
                indexOfLargestItem = rightIndex
            }

            if (indexOfLargestItem == itemIndex) {
                break
            }

            const item = this.items[itemIndex]
            this.items[itemIndex] = this.items[indexOfLargestItem]
            this.items[indexOfLargestItem] = item
            itemIndex = indexOfLargestItem
        }

        return root
    }
}


export class PriorityQueueArray {
    items: number[] = []

    empty() {
        return this.items = []
    }

    insert(x: number) {
        let insertionIndex: number | undefined = undefined
        this.items.some((item, i): boolean => {
            if (x >= item) {
                insertionIndex = i
                return true
            }

            return false
        })

        if (insertionIndex) {
            this.items.splice(insertionIndex, 0, x)
        }
        else {
            // If we got here, x was not greater than any item and must be the smallest
            // Add it to the end of the array
            this.items.push(x)
        }
    }

    removeMax() {
        return this.items.shift()
    }
}

export class PriorityQueue {
    heap: Heap = new Heap()

    insert(x: number) {
        this.heap.insert(x)
    }

    removeMax() {
        return this.heap.remove()
    }
}

