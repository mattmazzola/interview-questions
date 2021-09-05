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
                    routes: [{ to: 'a' }, { to: 'b' }]
                },
                {
                    id: 'a',
                    value: 2,
                    routes: [{ to: 'd' }]
                },
                {
                    id: 'b',
                    value: 2,
                    routes: [{ to: 'd' }]
                },
                {
                    id: 'd',
                    value: 2,
                    routes: [{ to: 'h' }, { to: 'g' }]
                },
                {
                    id: 'e',
                    value: 2,
                    routes: [{ to: 'a' }, { to: 'd' }, { to: 'f' }]
                },
                {
                    id: 'h',
                    value: 2,
                    routes: [{ to: 'i' }, { to: 'j' }]
                },
                {
                    id: 'g',
                    value: 2,
                    routes: [{ to: 'i' }]
                },
                {
                    id: 'i',
                    value: 2,
                    routes: [{ to: 'l' }]
                },
                {
                    id: 'k',
                    value: 2,
                    routes: [{ to: 'j' }]
                },
                {
                    id: 'f',
                    value: 2,
                    routes: [{ to: 'k' }, { to: 'j' }]
                },
                {
                    id: 'j',
                    value: 2,
                    routes: [{ to: 'm' }, { to: 'l' }]
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
                    routes: [{ to: 'b' }, { to: 'c' }]
                },
                {
                    id: 'b',
                    value: 1,
                    routes: [{ to: 'c' }, { to: 'a' }],
                },
                {
                    id: 'c',
                    value: 1,
                    routes: [{ to: 'a' }]
                }
            ]
        }

        expect(() => {
            topologicalSort(graphWithCycle)
        }).toThrowError()
    })
})