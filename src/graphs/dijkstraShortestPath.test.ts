import { Graph } from './models'
import { dijkstraShortedPathTopologicalSort, dijkstraShortedPathLazy, WeightedEdge, DistanceMap } from "./dijkstraShortestPath"

describe('dijkstrasShortedPath', () => {
    const graph: Graph<unknown, WeightedEdge> = {
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

    const expectedDistanceMap: DistanceMap = {
        'a': 0,
        'b': 3,
        'c': 6,
        'd': 7,
        'e': 3,
        'f': 12,
        'g': 9,
        'h': 11,
    }

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

    test('given graph return the shorted path from A to H (topsort)', () => {
        const nodeDistanceMap = dijkstraShortedPathTopologicalSort(graph, 'a')
        expect(nodeDistanceMap).toEqual(expectedDistanceMap)
        const nodeDistanceMap2 = dijkstraShortedPathTopologicalSort(graph2, '0')
        expect(nodeDistanceMap2).toEqual(expectedDistanceMap2)
    })

    test('given graph return the shortest path from A to H (lazy)', () => {
        const nodeDistanceMap = dijkstraShortedPathLazy(graph, 'a')
        expect(nodeDistanceMap).toEqual(expectedDistanceMap)
        const nodeDistanceMap2 = dijkstraShortedPathLazy(graph2, '0')
        expect(nodeDistanceMap2).toEqual(expectedDistanceMap2)
    })
})