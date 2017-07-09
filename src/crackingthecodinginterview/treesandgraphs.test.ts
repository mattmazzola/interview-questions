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
                expect(TreesAndGraphs.getPaths(graph)).toEqual([
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

        describe('4.4 Given binary tree return linked list for all the nodes at each depth', () => {
            test('given null return empty array', () => {
                expect(TreesAndGraphs.convertBinaryTreeToLinkedLists(null!)).toEqual([])
            })

            test('given binary tree with one node should return single node', () => {
                // Arange
                const node: TreesAndGraphs.IBinaryNode<number> = { value: 1, left: null, right: null }
                const expected = [[1]]

                // Act/Assert
                expect(TreesAndGraphs.convertBinaryTreeToLinkedLists(node)).toEqual(expected)
            })

            test('given binary tree return lists for each level of tree', () => {
                // Arrange
                const tree: TreesAndGraphs.IBinaryNode<number> = {
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

                const expected = [
                    [1],
                    [2,5],
                    [10,6,7],
                    [3]
                ]

                // Act
                const actual = TreesAndGraphs.convertBinaryTreeToLinkedLists(tree)

                // Assert
                expect(actual).toEqual(expected)
            })
        })

        describe('4.5 Given binary tree determine if it is binary search tree', () => {
            test('given binary search tree return true', () => {
                // Arrange
                const tree: TreesAndGraphs.IBinaryNode<number> = {
                    value: 4,
                    left: {
                        value: 2,
                        left: null,
                        right: null
                    },
                    right: {
                        value: 6,
                        left: null,
                        right: null
                    }
                }

                // Act/Assert
                expect(TreesAndGraphs.isBinaryTreeBinarySearchTree(tree)).toBe(true)
            })

            test('given binary tree return false', () => {
                // Arrange
                const tree: TreesAndGraphs.IBinaryNode<number> = {
                    value: 1,
                    left: {
                        value: 2,
                        left: null,
                        right: null
                    },
                    right: {
                        value: 6,
                        left: null,
                        right: null
                    }
                }

                // Act/Assert
                expect(TreesAndGraphs.isBinaryTreeBinarySearchTree(tree)).toBe(false)
            })
        })

        describe('4.6 Given BST with parent nodes, return in-order successor', () => {
            const root: TreesAndGraphs.IBinaryNodeParent<number> = {
                parent: null,
                value: 10,
                left: null,
                right: null
            }

            root.left = {
                parent: root,
                value: 5,
                left: null,
                right: null
            }

            root.right = {
                parent: root,
                value: 15,
                left: null,
                right: null
            }

            root.left.left = {
                parent: root.left,
                value: 2,
                left: null,
                right: null
            }

            root.left.right = {
                parent: root.right,
                value: 7,
                left: null,
                right: null
            }

            root.left.right.left = {
                parent: root.left.right,
                value: 6,
                left: null,
                right: null
            }

            root.right = {
                parent: root,
                value: 15,
                left: null,
                right: null
            }

            root.right.left = {
                parent: root.right,
                value: 12,
                left: null,
                right: null
            }

            root.right.left.right = {
                parent: root.right.left,
                value: 13,
                left: null,
                right: null
            }

            root.right.right = {
                parent: root.right,
                value: 17,
                left: null,
                right: null
            }

            test('given node with right children, return next larger node', () => {
                expect(TreesAndGraphs.findInorderSuccessor(root)).toBe(root.right!.left)
            })

            test('given node with no right children and no larger parent return null', () => {
                expect(TreesAndGraphs.findInorderSuccessor(root.right!.right!)).toBe(null)
            })
            
            test('given node with no right children and greater parent return parent', () => {
                expect(TreesAndGraphs.findInorderSuccessor(root.left!.left!)).toBe(root.left!)
            })

            test('given node with no right children and smaller parent return next largest node', () => {
                expect(TreesAndGraphs.findInorderSuccessor(root.right!.left!.right!)).toBe(root.right!)
            })
        })

        describe('4.7 Given two nodes, return first common ancestor (slow naive version)', () => {
            test('given two nodes that are not in the same tree return null', () => {
                // Arrange
                const a: TreesAndGraphs.IBinaryNodeParent<number> = {
                    value: 1,
                    parent: null,
                    left: null,
                    right: null
                }

                const b: TreesAndGraphs.IBinaryNodeParent<number> = {
                    value: 2,
                    parent: null,
                    left: null,
                    right: null
                }

                // Act
                const actual = TreesAndGraphs.findCommonAncestor(a, b)

                // Assert
                expect(actual).toBe(null)
            })

            test('given two nodes thare in the same tree return first common ancestor', () => {
                // Arrange
                const createNode = (value: number, parent: TreesAndGraphs.IBinaryNodeParent<number> | null = null): TreesAndGraphs.IBinaryNodeParent<number> =>
                    ({
                        parent,
                        value,
                        left: null,
                        right: null
                    })

                const tree = createNode(1)
                const left = createNode(2, tree)
                const right = createNode(3, tree)
                const leftleft = createNode(4, left)
                const leftright = createNode(5, left)
                const rightleft = createNode(6, right)
                const rightright = createNode(7, right)

                // Act
                const firstCommonAncester = TreesAndGraphs.findCommonAncestor(leftleft, rightleft)

                // Assert
                expect(firstCommonAncester).toBe(tree)
            })
        })

        describe('4.9 Given binary tree return paths which add to sum', () => {
            // Arrange
            const tree: TreesAndGraphs.IBinaryNode<number> = {
                value: 1,
                left: {
                    value: 2,
                    left: {
                        value: 2,
                        left: null,
                        right: null
                    },
                    right: {
                        value: 3,
                        left: null,
                        right: null
                    }
                },
                right: {
                    value: 3,
                    left: {
                        value: 2,
                        left: null,
                        right: null
                    },
                    right: {
                        value: 1,
                        left: {
                            value: 1,
                            left: null,
                            right: null
                        },
                        right: null
                    }
                }
            }

            const nodes = TreesAndGraphs.convertBinaryTreeToTree(tree)!

            const expected = [
                [1,2,3],
                [1,3,2],
                [1,3,1,1]
            ]

            // Act
            const paths = TreesAndGraphs.getPathsOfHeight(nodes, 6)

            // Assert
            expect(paths).toEqual(expected)
        })
    })
})