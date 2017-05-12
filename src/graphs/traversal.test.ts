import { INode, depthFirstTraveral, depthFirstTraveralIterative, breadthFirstTraversal } from './traversal'

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

const expectedDepthFirstValues = [1,2,3,4,5,6,7]
const expectedBreadthFirstValues = [1,2,5,3,4,6,7]

describe('depthFirstTraveral', () => {

    test('should return order of nodes using depth first', () => {
        // Arrange

        // Act
        const depthFirstValues = depthFirstTraveral(root)

        // Assert
        expect(depthFirstValues).toEqual(expectedDepthFirstValues)
    })
})

describe('depthFirstTraveralIterative', () => {
    test('should return order of nodes using depth first', () => {
        // Arrange

        // Act
        const depthFirstValues = depthFirstTraveralIterative(root)

        // Assert
        expect(depthFirstValues).toEqual(expectedDepthFirstValues)
    })
})

describe('breadthFirstTraversal', () => {
    test('should return order of node value in breadth first order', () => {
        // Arrange

        // Act
        const breadthFirstValues = breadthFirstTraversal(root)

        // Assert
        expect(breadthFirstValues).toEqual(expectedBreadthFirstValues)
    })
})