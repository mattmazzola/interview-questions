import { breadthFirstSearch, depthFirstSearch, INode, graphBuilder } from './search'

describe('graph search', () => {

    const graph: INode<number> = {
        value: 1,
        nodes: [
            {
                value: 2,
                nodes: [
                    {
                        value: 5,
                    },
                    {
                        value: 6,
                    },
                ]
            },
            {
                value: 3,
                nodes: [
                    {
                        value: 7,
                    },
                    {
                        value: 8,
                    },
                ]
            },
            {
                value: 4,
                nodes: [
                    {
                        value: 9,
                    },
                    {
                        value: 10,
                    },
                ]
            },
        ]
    }

    const graphWithParents = graphBuilder(graph)

    describe('find the path to value in graph', () => {
        test('given graph return the nodes to the value in the graph', () => {
            const target = 5
            const path = breadthFirstSearch(graphWithParents, n => n, n => n === target)
            const expectedPath = [1, 2, 5]

            expect(path).toEqual(expectedPath)
        })

        test('given graph return the nodes to the value in the graph', () => {
            const target = 5
            const path = depthFirstSearch(graphWithParents, n => n, n => n === target)
            const expectedPath = [1, 2, 5]

            expect(path).toEqual(expectedPath)
        })
    })
})