import { Graph } from './models'
import { getGridFromString, getStartEndLocations, getGraph, findPath } from './gridPathFinding'

describe('Grid path finding', () => {
    const gridString = `
S# E
 # #
    
 ## `

    describe('getGridFromString', () => {
        test('given grid string compute expected grid', () => {
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
            const expected = {
                start: [0,0],
                end: [0,3]
            }

            const grid = getGridFromString(gridString)
            const actual = getStartEndLocations(grid)

            expect(actual).toEqual(expected)
        })
    })

    describe('getGraph', () => {
        test('given grid, return the graph of the grid', () => {
            const expected: Graph = {
                rootNodeId: '0-0',
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

    // https://youtu.be/09_LlHjoEiY?t=2833
    describe('findPath', () => {
        test('given graph return path from start to end', () => {
            const expected = [
                '0-0',
                '1-0',
                '2-0',
                '2-1',
                '2-2',
                '1-2',
                '0-2',
                '0-3',
            ]

            const actual = findPath(gridString)

            expect(actual).toEqual(expected)
        })

        test('given graph return path from start to end 2', () => {
            const gridString = `
S  #   
 #   # 
 #     
  ##   
# #E # `

            const expected = [
                '0-0',
                '0-1',
                '0-2',
                '1-2',
                '1-3',
                '1-4',
                '2-4',
                '3-4',
                '4-4',
                '4-3',
            ]

            const actual = findPath(gridString)

            expect(actual).toEqual(expected)
        })
    })
})