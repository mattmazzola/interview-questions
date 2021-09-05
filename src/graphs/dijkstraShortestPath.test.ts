import { Graph } from './models'
import { dijkstraTopologicalSort, findShortestPath, dijkstraLazy, WeightedEdge, DistanceMap, getNegatedGraph, findLongestPath } from "./dijkstraShortestPath"

describe('dijkstrasShortedPath', () => {
    const graph1: Graph<unknown, WeightedEdge> = {
        rootNodeId: 'a',
        nodes: [
            {
                id: 'a',
                value: 1,
                routes: [
                    {
                        to: 'b',
                        distance: 3
                    },
                    {
                        to: 'c',
                        distance: 6
                    }
                ]
            },
            {
                id: 'b',
                value: 1,
                routes: [
                    {
                        to: 'c',
                        distance: 4
                    },
                    {
                        to: 'd',
                        distance: 4
                    },
                    {
                        to: 'e',
                        distance: 11
                    }
                ]
            },
            {
                id: 'c',
                value: 1,
                routes: [
                    {
                        to: 'd',
                        distance: 8
                    },
                    {
                        to: 'g',
                        distance: 11
                    }
                ]
            },
            {
                id: 'd',
                value: 1,
                routes: [
                    {
                        to: 'e',
                        distance: -4
                    },
                    {
                        to: 'f',
                        distance: 5
                    },
                    {
                        to: 'g',
                        distance: 2
                    }
                ]
            },
            {
                id: 'e',
                value: 1,
                routes: [
                    {
                        to: 'h',
                        distance: 9
                    }
                ]
            },
            {
                id: 'f',
                value: 1,
                routes: [
                    {
                        to: 'h',
                        distance: 1
                    }
                ]
            },
            {
                id: 'g',
                value: 1,
                routes: [
                    {
                        to: 'h',
                        distance: 2
                    }
                ]
            },
            {
                id: 'h',
                value: 1,
                routes: []
            }
        ]
    }

    const expectedDistanceMap1: DistanceMap = {
        'a': 0,
        'b': 3,
        'c': 6,
        'd': 7,
        'e': 3,
        'f': 12,
        'g': 9,
        'h': 11,
    }

    const expectedPath1 = 'abdgh'.split('')

    const graph2: Graph<unknown, WeightedEdge> = {
        rootNodeId: '0',
        nodes: [
            {
                id: '0',
                value: 1,
                routes: [{ to: '1', distance: 4 }, { to: '2', distance: 1 }]
            },
            {
                id: '1',
                value: 1,
                routes: [{ to: '3', distance: 1 }]
            },
            {
                id: '2',
                value: 1,
                routes: [{ to: '1', distance: 2 }, { to: '3', distance: 5 }]
            },
            {
                id: '3',
                value: 1,
                routes: [{ to: '4', distance: 3 }]
            },
            {
                id: '4',
                value: 1,
                routes: []
            },
        ]
    }

    const expectedDistanceMap2: DistanceMap = {
        '0': 0,
        '1': 3,
        '2': 1,
        '3': 4,
        '4': 7,
    }

    const expectedPath2 = '02134'.split('')

    const testData: [Graph<unknown, WeightedEdge>, string, string, DistanceMap, string[]][] = [
        [graph1, 'a', 'h', expectedDistanceMap1, expectedPath1],
        [graph2, '0', '4', expectedDistanceMap2, expectedPath2]
    ]
    
    testData.forEach(([graph, startNodeId, endNodeId, expectedDistance, expectedPath]) => {
        test('given graph return the shortest Distance from start to end (topsort)', () => {
            const [nodeDistanceMap] =  dijkstraTopologicalSort(graph, startNodeId)

            expect(nodeDistanceMap).toEqual(expectedDistance)
        })
    
        test('given graph return the shortest Distance from start to end (lazy)', () => {
            const [nodeDistanceMap] = dijkstraLazy(graph, startNodeId)

            expect(nodeDistanceMap).toEqual(expectedDistance)
        })

        test('given graph return the shortest Path from start to end', () => {
            const [nodeDistanceMap, previousNodeMap] = dijkstraLazy(graph, startNodeId)
            const path = findShortestPath(nodeDistanceMap, previousNodeMap, endNodeId)

            expect(path).toEqual(expectedPath)
        })
    })

    describe('getNegatedGraph', () => {
        test('given graph return graph with negated edges', () => {
            const graph: Graph<unknown, WeightedEdge> = {
                rootNodeId: 'a',
                nodes: [
                    {
                        id: 'a',
                        value: 1,
                        routes: [{ to: 'b', distance: 1 }, { to: 'd', distance: 40 }]
                    },
                    {
                        id: 'b',
                        value: 1,
                        routes: [{ to: 'c', distance: 3 }]
                    },
                    {
                        id: 'c',
                        value: 1,
                        routes: [{ to: 'd', distance: 5 }]
                    },
                    {
                        id: 'd',
                        value: 1,
                        routes: []
                    }
                ]
            }

            const expectedGraph: Graph<unknown, WeightedEdge> = {
                rootNodeId: graph.rootNodeId,
                nodes: [
                    {
                        id: 'a',
                        value: 1,
                        routes: [{ to: 'b', distance: -1 }, { to: 'd', distance: -40 }]
                    },
                    {
                        id: 'b',
                        value: 1,
                        routes: [{ to: 'c', distance: -3 }]
                    },
                    {
                        id: 'c',
                        value: 1,
                        routes: [{ to: 'd', distance: -5 }]
                    },
                    {
                        id: 'd',
                        value: 1,
                        routes: []
                    }
                ]
            }

            const negatedGraph = getNegatedGraph(graph)

            expect(negatedGraph).toEqual(expectedGraph)
        })
    })

    describe('findLongestPath', () => {
        test('given graph return the longest path through the graph', () => {
            const longestPath = findLongestPath(graph1, 'a', 'h')
            const expectedPath = 'abeh'.split('')

            expect(longestPath).toEqual(expectedPath)
        })
    })
})