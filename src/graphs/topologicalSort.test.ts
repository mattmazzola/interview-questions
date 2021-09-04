import { Graph } from "./models"
import { topologicalSort } from "./topologicalSort"

describe('topologicalSort', () => {
    test('given graph return topological sort', () => {
        const graph: Graph = {
            rootNodeId: 'c',
            nodes: [
                {
                    id: 'c',
                    value: 1,
                    routes: ['a', 'b']
                },
                {
                    id: 'a',
                    value: 2,
                    routes: ['d']
                },
                {
                    id: 'b',
                    value: 2,
                    routes: ['d']
                },
                {
                    id: 'd',
                    value: 2,
                    routes: ['h', 'g']
                },
                {
                    id: 'e',
                    value: 2,
                    routes: ['a', 'd', 'f']
                },
                {
                    id: 'h',
                    value: 2,
                    routes: ['i', 'j']
                },
                {
                    id: 'g',
                    value: 2,
                    routes: ['i']
                },
                {
                    id: 'i',
                    value: 2,
                    routes: ['l']
                },
                {
                    id: 'k',
                    value: 2,
                    routes: ['j']
                },
                {
                    id: 'f',
                    value: 2,
                    routes: ['k', 'j']
                },
                {
                    id: 'j',
                    value: 2,
                    routes: ['m', 'l']
                },
                {
                    id: 'l',
                    value: 2,
                    routes: []
                },
                {
                    id: 'm',
                    value: 2,
                    routes: []
                }
            ]
        }

        const expectedPath = ['e', 'f', 'k', 'c', 'b', 'a', 'd', 'g', 'h', 'j', 'm', 'i', 'l']
        const actual = topologicalSort(graph)

        expect(actual).toEqual(expectedPath)
    })

    xtest('given graph with loop throw error', () => {
        const graphWithCycle: Graph = {
            rootNodeId: 'a',
            nodes: [
                {
                    id: 'a',
                    value: 1,
                    routes: ['b', 'c']
                },
                {
                    id: 'b',
                    value: 1,
                    routes: ['c', 'a'],
                },
                {
                    id: 'c',
                    value: 1,
                    routes: ['a']
                }
            ]
        }

        expect(() => {
            topologicalSort(graphWithCycle)
        }).toThrowError()
    })
})