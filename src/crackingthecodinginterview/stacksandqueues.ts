/**
 * 3.1 Implement 3 stacks using single array
 */
export interface IStack {
    pop(): number
    push(x: number): void
}

export interface IExtendedStack extends IStack {
    peek(): number
}

export const getStacks = (maxSize: number, numStacks: number = 3): IStack[] => {
    const array = Array.apply(null, new Array(maxSize * 3)).map(() => null)

    return Array.apply(null, new Array(3))
        .map((x: any, i: number) => {
            const minIndex = i * maxSize
            return getArrayStack(array, minIndex, minIndex + maxSize - 1)
        })
}

const getArrayStack = (xs: number[], minIndex: number, maxIndex: number): IStack => {
    let currentIndex = minIndex

    return {
        pop() {
            if (currentIndex - 1 < minIndex) {
                throw new Error('You attempted to pop from stack which is empty.')
            }

            const value = xs[currentIndex]
            currentIndex -= 1
            return value
        },

        push(x: number) {
            if (currentIndex + 1 > maxIndex) {
                throw new Error('You attempted to push a value on to the stack but is is full.')
            }

            currentIndex += 1
            xs[currentIndex] = x
        }
    }
}

/**
 * 3.2 Design stack with push, pop, and min
 */

export interface IStackWithMin extends IStack {
    min(): number
}

interface INode<T> {
    value: T
    next: INode<T> | null
}


export const getStack = (): IExtendedStack => {
    let head: INode<number> = null!

    return {
        push(value: number) {
            if (head == null) {
                head = {
                    value,
                    next: null
                }
            }
            else {
                const next = head
                head = {
                    value,
                    next
                }
            }
        },

        pop() {
            if (head === null) {
                throw new Error('You attempted to access empty stack')
            }

            const value = head.value
            head = head.next!

            return value
        },

        peek() {
            if (head === null) {
                throw new Error('You attempted to access empty stack')
            }

            return head.value
        }
    }
}

export const getMinStack = (): IStackWithMin => {
    let head: INode<number> = null!
    let min = getStack()

    return {
        push(value: number) {
            if (head == null) {
                head = {
                    value,
                    next: null
                }
                
                min.push(value)
            }
            else {
                const next = head
                head = {
                    value,
                    next
                }

                if (value < min.peek()) {
                    min.push(value)
                }
            }
        },

        pop() {
            if (head === null) {
                throw new Error('You attempted to access empty stack')
            }

            const value = head.value
            head = head.next!

            if (value === min.peek()) {
                min.pop()
            }

            return value
        },

        min() {
            return min.peek()
        }
    }
}