import * as TreesAndGraphs from './treesandgraphs'

const node = TreesAndGraphs.binaryNode

describe('Cracking The Coding Interview', () => {
    describe('Trees and Graphs', () => {
        
        const randomNode: TreesAndGraphs.INode<number> = {
            value: 4,
            nodes: []
        }
        const graph: TreesAndGraphs.INode<number> = {
            value: 1,
            nodes: [
                {
                    value: 2,
                    nodes: [
                        randomNode,
                        randomNode,
                        {
                            value: 5,
                            nodes: []
                        }
                    ]
                },
                {
                    value: 3,
                    nodes: [
                        {
                            value: 6,
                            nodes: []
                        },
                        {
                            value: 7,
                            nodes: []
                        }
                    ]
                }
            ]
        }

        describe('4.1 is binary tree balanced', () => {
            test('a tree with single root node is balanced', () => {
                // Arrange
                const tree: TreesAndGraphs.IBinaryNode<number> = {
                    value: 1,
                    left: null,
                    right: null
                }

                // Act
                // Assert
                expect(TreesAndGraphs.isBalanced(tree)).toBe(true)
            })

            test('given a balanced should return true', () => {
                // Arrange
                const balancedTree: TreesAndGraphs.IBinaryNode<number> = {
                    value: 1,
                    left: {
                        value: 2,
                        left: node(3),
                        right: node(4)
                    },
                    right: {
                        value: 5,
                        left: node(6),
                        right: node(7)
                    }
                }

                // Act
                // Assert
                expect(TreesAndGraphs.isBalanced(balancedTree)).toBe(true)
            })

            test('given an unbalanced tree should return false', () => {
                // Arrange
                const unbalancedTree: TreesAndGraphs.IBinaryNode<number> = {
                    value: 1,
                    left: {
                        value: 2,
                        left: {
                            value: 10,
                            left: node(3),
                            right: null
                        },
                        right: null
                    },
                    right: {
                        value: 5,
                        left: node(6),
                        right: node(7)
                    }
                }

                // Act
                // Assert
                expect(TreesAndGraphs.isBalanced(unbalancedTree)).toBe(false)
            })
        })

        describe('Rabbit hole into Breadth-First-Traversal again :(', () => {
            test('bfs should return values in correct order', () => {
                expect(TreesAndGraphs.bft(graph, x => x)).toEqual([1,2,3,4,5,6,7])
            })
        })

        describe('4.2 is there path between two nodes in directed graph', () => {
            test('given graph with path between two nodes should return true', () => {
                expect(TreesAndGraphs.isPath(graph, randomNode, x => x)).toBe(true)
            })

            test('given graph without path between two nodes return false', () => {
                expect(TreesAndGraphs.isPath(graph.nodes[1], randomNode, x => x)).toBe(false)
            })
        })

        describe('Rabbit hole into Depth-First-Traversal again :(', () => {
            test('given graph should return results in correct order', () => {
                expect(TreesAndGraphs.dft(graph, x => x)).toEqual([1,2,4,5,3,6,7])
            })
        })

        describe('Get all paths in graph', () => {
            test('given graph should return list of paths which reach leaves or a visited node', () => {
                expect(TreesAndGraphs.getPaths(graph, x => x)).toEqual([
                    [1,2,4],
                    [1,2,5],
                    [1,3,6],
                    [1,3,7]
                ])
            })
        })

        describe('4.3 Convert sorted array to binary search tree', () => {
            test('given sorted array convert it to BST', () => {
                // Arrange
                const input = [1,2,3,4,5,6,7,8,9]

                const expected = {
                    value: 5,
                    left: {
                        value: 2,
                        left: {
                            value: 1,
                            left: null,
                            right: null
                        },
                        right: {
                            value: 3,
                            left: null,
                            right: {
                                value: 4,
                                left: null,
                                right: null
                            }
                        }
                    },
                    right: {
                        value: 7,
                        left: {
                            value: 6,
                            left: null,
                            right: null
                        },
                        right: {
                            value: 8,
                            left: null,
                            right: {
                                value: 9,
                                left: null,
                                right: null
                            }
                        }
                    }
                }

                // Act
                const bst = TreesAndGraphs.convertSortedArrayToBinarySearchTree(input)

                // Assert
                expect(bst).toEqual(expected)
            })
        })
    })
})