import { Graph, Grid } from './models'
import { getGridFromString, getStartEndLocations, getGraph } from './gridPathFinding'

describe('Grid path finding', () => {
    describe('getGridFromString', () => {
        test('given grid string compute expected grid', () => {
            const gridString = `
S# E
 # #
    
 ## `

            const expected = [
                ['S', '#', ' ', 'E'],
                [' ', '#', ' ', '#'],
                [' ', ' ', ' ', ' '],
                [' ', '#', '#', ' '],
            ]

            const actual = getGridFromString(gridString)

            expect(actual).toEqual(expected)
        })
    })

    describe('getStartEndLocations', () => {
        test('given grid, return location of start and end', () => {

          const gridString = `
S# E
 # #
    
 ## `
            const expected = {
                start: [0,0],
                end: [0,3]
            }

            const grid = getGridFromString(gridString)
            const actual = getStartEndLocations(grid)

            expect(actual).toEqual(expected)
        })
    })

    describe.only('getGraph', () => {
        test('given grid, return the graph of the grid', () => {
            const gridString = `
S# E
 # #
    
 ## `

            const expected: Graph = {
                rootNodeId: '',
                nodes: [
                    {
                        id: `0-0`,
                        value: 'S',
                        routes: ['1-0'],
                    },
                    {
                        id: `0-1`,
                        value: '#',
                        routes: [],
                    },
                    {
                        id: `0-2`,
                        value: ' ',
                        routes: ['1-2', '0-3'],
                    },
                    {
                        id: `0-3`,
                        value: 'E',
                        routes: ['0-2'],
                    },
                    {
                        id: `1-0`,
                        value: ' ',
                        routes: ['2-0', '0-0'],
                    },
                    {
                        id: `1-1`,
                        value: '#',
                        routes: [],
                    },
                    {
                        id: `1-2`,
                        value: ' ',
                        routes: ['2-2', '0-2'],
                    },
                    {
                        id: `1-3`,
                        value: '#',
                        routes: [],
                    },
                    {
                        id: `2-0`,
                        value: ' ',
                        routes: ['3-0', '1-0', '2-1'],
                    },
                    {
                        id: `2-1`,
                        value: ' ',
                        routes: ['2-2', '2-0'],
                    },
                    {
                        id: `2-2`,
                        value: ' ',
                        routes: ['1-2', '2-3', '2-1'],
                    },
                    {
                        id: `2-3`,
                        value: ' ',
                        routes: ['3-3', '2-2'],
                    },
                    {
                        id: `3-0`,
                        value: ' ',
                        routes: ['2-0'],
                    },
                    {
                        id: `3-1`,
                        value: '#',
                        routes: [],
                    },
                    {
                        id: `3-2`,
                        value: '#',
                        routes: [],
                    },
                    {
                        id: `3-3`,
                        value: ' ',
                        routes: ['2-3'],
                    },
                ]
            }

            const grid = getGridFromString(gridString)
            const actual = getGraph(grid)

            expect(actual).toEqual(expected)
        })
    })
})