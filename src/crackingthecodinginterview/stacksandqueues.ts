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

/**
 * 3.3 Stack of plates
 */
export const setOfStacks = () => {
    const stacks: IStack[] = []

    return {
        push(x: number) {
            if (stacks.length === 0) {
                stacks.push(createFixedStack(5))
            }

            const stack = stacks[stacks.length - 1]

            try {
                stack.push(x)
            }
            catch (e) {
                stacks.push(createFixedStack(5))
                const newStack = stacks[stacks.length - 1]
                newStack.push(x)
            }
        },

        pop() {
            if (stacks.length === 0) {
                throw new Error('You attempted to remove element from empty stack')
            }

            const stack = stacks[stacks.length - 1]

            try {
                return stack.pop()
            }
            catch (e) {
                stacks.pop()
                const stack = stacks[stacks.length - 1]
                return stack.pop()
            }
        }
    }
}

const createFixedStack = (size: number) => {
    const array = Array.apply(null, new Array(size))
    return getArrayStack(array, 0, array.length - 1)
}

/**
 * 3.4 Towers of Hanoi
 */
export const towersOfHanoi = (disks: number, source: number[], auxiliary: number[], target: number[], print: (x: number) => void) => {
    // If there are more than 1 disk on A, we need to move largest disk to C
    // First move all smaller disks to B
    if (disks > 1) {
        towersOfHanoi(disks - 1, source, target, auxiliary, print)
    }

    // Now that the larget disk is the only one left on A, move it on to C which should be empty
    target.push(source.pop()!)

    print(disks)

    // Now finish by moving all the smaller disks that were on B to C
    if (disks > 1) {
        towersOfHanoi(disks - 1, auxiliary, source, target, print)
    }
}

/**
 * 3.5 Implement MyQueue class which implements queue using two stacks
 */
export interface IQueue {
    push(x: number): void
    pop(): number | undefined
}

export class MyQueue implements IQueue {
    private stack1: number[] = []
    private stack2: number[] = []

    push(x: number) {
        this.stack1.push(x)
    }

    pop() {
        let value = this.stack1.pop()
        while (value) {
            this.stack2.push(value)
            value = this.stack1.pop()
        }

        const returnValue = this.stack2.pop()

        let value2 = this.stack2.pop()
        while (value2) {
            this.stack1.push(value2)
            value2 = this.stack2.pop()
        }

        return returnValue
    }
}

/**
 * 3.6 Sort a stack using another stack (ascending)
 */

/**
 * 3.7 Dogs and Cats stacks
 */

export interface IAnimal {
    name: string
    type: string
}

export class Dog implements IAnimal {
    static Type = 'Dog'
    name: string
    type = Dog.Type

    constructor(name: string) {
        this.name = name
    }

    static isDog(animal: IAnimal): animal is Dog {
        return animal.type === Dog.Type
    }
}

export class Cat implements IAnimal {
    static Type = 'Cat'
    name: string
    type = Cat.Type

    constructor(name: string) {
        this.name = name
    }

    static isCat(animal: IAnimal): animal is Dog {
        return animal.type === Cat.Type
    }
}

export class DogAndCatStack {
    dogs: Dog[] = []
    cats: Cat[] = []

    enqueue(animal: IAnimal) {
        if (Dog.isDog(animal)) {
            this.dogs.push(animal as Dog)
        }

        if (Cat.isCat(animal)) {
            this.cats.push(animal as Cat)
        }
    }

    dequeue(): IAnimal | undefined {
        const oneOrZero = Math.round(Math.random())
        const animal = oneOrZero ? this.dequeueDog() : this.dequeueCat()
        if (animal === undefined) {
            return oneOrZero ? this.dequeueCat() : this.dequeueDog()
        }

        return animal
    }

    dequeueDog() {
        return this.dogs.shift()
    }

    dequeueCat() {
        return this.cats.shift()
    }
}