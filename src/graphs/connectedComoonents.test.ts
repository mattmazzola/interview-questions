import { Graph } from './models'
import { getGraphComponents } from './connectedComponents'

describe('Get Connected Components', () => {
    describe('getGraphComponents', () => {
        const graph: Graph = {
            rootNodeId: '1',
            nodes: [
                {
                    id: '1',
                    value: 1,
                    routes: [{ to: '2' }],
                },
                {
                    id: '2',
                    value: 2,
                    routes: [{ to: '3' }],
                },
                {
                    id: '3',
                    value: 3,
                    routes: [{ to: '1' }],
                },
                {
                    id: '4',
                    value: 4,
                    routes: [{ to: '5' }],
                },
                {
                    id: '5',
                    value: 5,
                    routes: [{ to: '6' }],
                },
                {
                    id: '6',
                    value: 6,
                    routes: [{ to: '4' }],
                },
            ]
        }

        test('given graph with 2 components return expected count and node component ids', () => {
            const expected = {
                count: 2,
                nodeColors: [
                    ['1', 0],
                    ['2', 0],
                    ['3', 0],
                    ['4', 1],
                    ['5', 1],
                    ['6', 1],
                ]
            }

            const actual = getGraphComponents(graph)

            expect(actual).toEqual(expected)
        })
    })
})