import { INode, depthFirstTraversal, depthFirstTraversalRecursive, breadFirstTraversal, getPathsRecursive, depthFirstPaths } from './traversal'

describe('tree traversal', () => {
    const input: INode<number> = {
        value: 1,
        left: {
            value: 2,
            left: {
                value: 7,
                left: null,
                right: null
            },
            right: {
                value: 9,
                left: null,
                right: null
            }
        },
        right: {
            value: 3,
            left: {
                value: 15,
                left: null,
                right: null
            },
            right: {
                value: 100,
                left: null,
                right: null
            }
        }
    }

    describe('getPathsRecursive', () => {
        it('should return paths', () => {
            // Arrange
            const expected = [
                [1, 2, 7],
                [1, 2, 9],
                [1, 3, 15],
                [1, 3, 100]
            ]

            // Act
            const actual = getPathsRecursive(input)

            // Assert
            expect(actual).toEqual(expected)
        })
    })

    describe('depthFirstTraversalRecursion', () => {
        test('should return array of values of inorder traversal', () => {
            // Arrange
            const expected = [1, 2, 7, 9, 3, 15, 100]

            // Act
            const actual = depthFirstTraversalRecursive(input)

            // Assert
            expect(actual).toEqual(expected)
        })
    })

    describe('depthFirstTraversal', () => {
        test('should return array', () => {
            const expected = [1, 2, 7, 9, 3, 15, 100]

            // Act
            const actual = depthFirstTraversal(input)

            // Assert
            expect(actual).toEqual(expected)
        })
    })

    describe('breadFirstTraversalRecursion', () => {
        test('should return array', () => {
            // Arrange
            const expected = [1, 2, 3, 7, 9, 15, 100]

            // Act
            const actual = breadFirstTraversal(input)

            // Assert
            expect(actual).toEqual(expected)
        })
    })

    describe('depthFirstPaths', () => {
        test('should return paths', () => {
            // Arrange
            const expected = [
                [1, 3, 100],
                [1, 3, 15],
                [1, 2, 9],
                [1, 2, 7],
            ]

            // Act
            const actual = depthFirstPaths(input)

            // Assert
            expect(actual).toEqual(expected)
        })
    })
})