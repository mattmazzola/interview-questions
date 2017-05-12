import { INode, depthFirstTraveral } from './traversal'

describe('depthFirstTraveral', () => {
    test('should return order of nodes using depth first', () => {
        // Arrange
        const root: INode<number> = {
            value: 1,
            nodes: [
                {
                    value: 2,
                    nodes: [
                        {
                            value: 3,
                            nodes: []
                        },
                        {
                            value: 4,
                            nodes: []
                        }
                    ]
                },
                {
                    value: 5,
                    nodes: [
                        {
                            value: 6,
                            nodes: [
                                {
                                    value: 7,
                                    nodes: []
                                }
                            ]
                        }
                    ]
                }
            ]
        }

        const expectedValues = [1,2,3,4,5,6,7]

        // Act
        const depthFirstValues = depthFirstTraveral(root)

        // Assert
        expect(depthFirstValues).toEqual(expectedValues)
    })
})