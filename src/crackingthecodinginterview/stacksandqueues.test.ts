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
    })
})
