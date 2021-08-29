import { breadthFirstSearch, depthFirstSearch, Node, assignParents, Graph } from './search'

describe('graph search', () => {

    const graph: Graph<number> = {
        rootNodeId: '1',
        nodes: [
            {
                id: '1',
                value: 1,
                routes: ['2','3','4']
            },
            {
                id: '2',
                value: 2,
                routes: [ '5', '6']
            },
            {
                id: '3',
                value: 3,
                routes: ['7', '8']
            },
            {
                id: '4',
                value: 4,
                routes: ['9', '10']
            },
            {
                id: '5',
                value: 5,
                routes: []
            },
            {
                id: '6',
                value: 6,
                routes: []
            },
            {
                id: '7',
                value: 7,
                routes: []
            },
            {
                id: '8',
                value: 8,
                routes: []
            },
            {
                id: '10',
                value: 10,
                routes: []
            },
        ]
    }

    assignParents(graph)

    describe('find the path to value in graph', () => {
        test('given graph return the nodes to the value in the graph', () => {
            const target = '5'
            const path = breadthFirstSearch(graph, n => n.id === target)
            const expectedPath = ['1', '2', '5']

            expect(path).toEqual(expectedPath)
        })

        test('given graph return the nodes to the value in the graph', () => {
            const target = '5'
            const path = depthFirstSearch(graph, graph.rootNodeId, n => n.id === target)
            const expectedPath = ['1', '2', '5']

            expect(path).toEqual(expectedPath)
        })
    })
})