import { INode, depthFirstSearch, depthFirstSearchRecursion, breadFirstSearch } from './newtraversal'

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

    test('depthFirstSearchRecursion should return array', () => {
        // Arrange

        const expected = [1,2,7,9,3,15,100]

        // Act
        const actual = depthFirstSearchRecursion(input)

        // Assert
        expect(actual).toEqual(expected)
    })

    test('depthFirstSerach should return array', () => {
        const expected = [1,2,7,9,3,15,100]

        // Act
        const actual = depthFirstSearch(input)

        // Assert
        expect(actual).toEqual(expected)
    })

    test('bfs should return array', () => {
        // Arrange
        const expected = [1,2,3,7,9,15,100]

        // Act
        const actual = breadFirstSearch(input)

        // Assert
        expect(actual).toEqual(expected)
    })
})