import { breadthFirstTraversal, depthFirstTraversal, depthFirstTraversalRecursive } from './traversal'
import { Graph } from './models'

describe('graph traversal', () => {
    const input: Graph<number> = {
        rootNodeId: '1',
        nodes: [
            {
                id: '1',
                value: 1,
                routes: ['4', '3'],
            },
            {
                id: '3',
                value: 3,
                routes: ['12', '7'],
            },
            {
                id: '4',
                value: 4,
                routes: ['15', '21', '33'],
            },
            {
                id: '7',
                value: 7,
                routes: ['12'],
            },
            {
                id: '12',
                value: 12,
                routes: ['33'],
            },
            {
                id: '12',
                value: 12,
                routes: ['33'],
            },
            {
                id: '15',
                value: 15,
            },
            {
                id: '21',
                value: 21,
            },
            {
                id: '33',
                value: 33,
            },
        ]
    }

    describe('iterative', () => {

        test('BFS graph', () => {
            // Arrange
            const expected = [1, 4, 3, 15, 21, 33, 12, 7]

            // Act
            const actual = breadthFirstTraversal(input)

            // Assert
            expect(actual).toEqual(expected)
        })

        test('DFS graph', () => {
            // Arrange
            const expected = [1, 4, 15, 21, 33, 3, 12, 7]

            // Act
            const actual = depthFirstTraversal(input)

            // Assert
            expect(actual).toEqual(expected)
        })
    })

    describe('recursive', () => {
        test('DFS graph recursive', () => {
            // Arrange
            const expected = [1, 4, 15, 21, 33, 3, 12, 7]

            // Act
            const actual = depthFirstTraversalRecursive(input, input.rootNodeId)

            // Assert
            expect(actual).toEqual(expected)
        })
    })
})