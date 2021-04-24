import { breadthFirstTraversal, depthFirstTraversal, depthFirstTraversalRecursive, INode } from './traversal'

describe('graph traversal', () => {
    const node33: INode<number> = {
        value: 33,
        nodes: []
    }

    const node12: INode<number> = {
        value: 12,
        nodes: [
            node33
        ]
    }

    const input: INode<number> = {
        value: 1,
        nodes: [
            {
                value: 4,
                nodes: [
                    {
                        value: 15,
                        nodes: []
                    },
                    {
                        value: 21,
                        nodes: []
                    },
                    node33
                ]
            },
            {
                value: 3,
                nodes: [
                    node12,
                    {
                        value: 7,
                        nodes: [
                            node12
                        ]
                    }
                ]
            }
        ]
    }

    describe('iterative', () => {

        test('BFS graph', () => {
            // Arrange
            const expected = [1, 4, 3, 15, 21, 33, 12, 7]

            // Act
            const actual = breadthFirstTraversal(input, x => x)

            // Assert
            expect(actual).toEqual(expected)
        })

        test('DFS graph', () => {
            // Arrange
            const expected = [1, 4, 15, 21, 33, 3, 12, 7]

            // Act
            const actual = depthFirstTraversal(input, x => x)

            // Assert
            expect(actual).toEqual(expected)
        })
    })

    describe('recursive', () => {
        test('DFS graph recursive', () => {
            // Arrange
            const expected = [1, 4, 15, 21, 33, 3, 12, 7]

            // Act
            const actual = depthFirstTraversalRecursive(input, x => x)

            // Assert
            expect(actual).toEqual(expected)
        })
    })
})