import * as StacksAndQueues from './stacksandqueues'

describe('Cracking The Coding Interview', () => {
    describe('Stacks and Queues', () => {
        describe('3.1 implement three stacks using same array', () => {
            test('each stack should operate idependently', () => {
                // Arrange
                const [stack1, stack2, stack3] = StacksAndQueues.getStacks(10)

                // Act
                stack1.push(1)
                stack1.push(2)
                stack2.push(11)
                stack2.push(12)
                stack3.push(101)
                stack3.push(102)
                
                // Assert
                expect(stack1.pop()).toBe(2)
                expect(stack2.pop()).toBe(12)
                expect(stack3.pop()).toBe(102)
            })
        })

        describe('3.2 stack with min', () => {
            test('min should return minimum value', () => {
                // Arrange
                const stack = StacksAndQueues.getMinStack()

                // Act / Assert
                stack.push(10)
                stack.push(5)
                expect(stack.min()).toBe(5)
                stack.push(30)
                expect(stack.min()).toBe(5)
                stack.push(2)
                expect(stack.min()).toBe(2)
                stack.pop()
                stack.pop()
                stack.pop()
                expect(stack.min()).toBe(10)
            })
        })

        describe('3.3 set of stacks', () => {
            test('implement set stack which is comprised of multiple stacks', () => {
                // Arrange
                const stack = StacksAndQueues.setOfStacks()

                // Act/Assert
                expect(() => stack.pop()).toThrow()

                stack.push(1)
                stack.push(2)
                stack.push(3)
                stack.push(4)
                stack.push(5)
                stack.push(6)
                stack.push(7)

                expect(stack.pop()).toBe(7)
            })
        })

        describe('3.4 towers of hanoi', () => {
            test('given three stacks and set of disks in ascending order on stack A, move them to stack C', () => {
                // Arrange
                const a: number[] = [5,4,3,2,1]
                const originalA = [...a]
                const b: number[] = []
                const c: number[] = []

                const print = (n: number) => {
                    const msg = `- Disks: ${n}
A: [${a.join(', ')}]
B: [${b.join(', ')}]
C: [${c.join(', ')}]
--------------------`
                    console.log(msg)
                }

                const noop = () => {}

                // Act
                StacksAndQueues.towersOfHanoi(a.length, a, b, c, noop)

                // Assert
                expect(originalA).toEqual(c)
            })
        })

        describe('3.5 implement queue using two stacks', () => {
            test('should behave like FIFO', () => {
                // Arrange
                const queue = new StacksAndQueues.MyQueue()

                // Act / Assert
                queue.push(1)
                queue.push(2)
                queue.push(3)
                expect(queue.pop()).toBe(1)
                expect(queue.pop()).toBe(2)
                queue.push(4)
                expect(queue.pop()).toBe(3)
            })
        })

        describe('3.7 cat and dogs stacks', () => {
            test('should exibit FIFO behavior for cats and dogs', () => {
                // Arrange
                const queue = new StacksAndQueues.DogAndCatStack()
                const dog = (x: string) => new StacksAndQueues.Dog(x)
                const cat = (x: string) => new StacksAndQueues.Cat(x)

                // Act
                queue.enqueue(dog('Sterling'))
                queue.enqueue(dog('Winston'))
                queue.enqueue(cat('Alex'))
                expect(queue.dequeueCat()).toEqual(cat('Alex'))
                queue.enqueue(cat('Sylvestor'))
                queue.enqueue(cat('Chester'))
                queue.enqueue(dog('Chance'))
                queue.enqueue(cat('Milo'))
                queue.enqueue(dog('Randolf'))
                queue.enqueue(cat('Garfield'))

                expect(queue.dequeueDog()).toEqual(dog('Sterling'))
                expect(queue.dequeueDog()).toEqual(dog('Winston'))
                expect(queue.dequeueCat()).toEqual(cat('Sylvestor'))
            })

            test('dequeue should return cat or dog', () => {
                // Arrange
                const queue = new StacksAndQueues.DogAndCatStack()
                const dog = (x: string) => new StacksAndQueues.Dog(x)
                const cat = (x: string) => new StacksAndQueues.Cat(x)

                const dog1 = dog('X')
                const cat1 = cat('Y')
                queue.enqueue(dog1)
                queue.enqueue(cat1)

                // Act
                const animal = queue.dequeue()!
                
                if (StacksAndQueues.Dog.isDog(animal)) {
                    expect(animal).toEqual(dog1)
                }
                else if (StacksAndQueues.Cat.isCat(animal)) {
                    expect(animal).toEqual(cat1)
                }
            })
        })
    })
})
