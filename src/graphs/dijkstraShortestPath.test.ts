import { Graph } from './models'
import { dijkstraShortedPath, WeightedEdge } from "./dijkstraShortestPath"
import exp from 'constants'

describe('dijkstrasShortedPath', () => {
    test('given graph return the shorted path from A to B', () => {
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

        const expectedDistance = 11
        const actualDistance = dijkstraShortedPath(graph, 'a', 'h')

        expect(actualDistance).toEqual(expectedDistance)
    })
})