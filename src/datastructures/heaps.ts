export class PriorityQueueArray {
    items: number[] = []

    empty() {
        return this.items = []
    }

    insert(x: number) {
        for(let i = 0; i < this.items.length; i++) {
            if (x >= this.items[i]) {
                this.items.splice(i, 0, x)
                return
            }
        }

        // If we got here, x was not greater than any item and must be the smallest
        // Add it to the end of the array
        this.items.push(x)
    }

    removeMax() {
        return this.items.shift()
    }
}

