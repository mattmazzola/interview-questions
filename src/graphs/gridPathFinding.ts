import { Graph, Node, Grid, Edge } from './models'
import { breadthFirstSearch } from './search'

export function getGridFromString(gridString: string): Grid {
    const trimmedGrid = gridString.trimStart()
    const gridRows = trimmedGrid.split('\n')
    const grid: Grid = []

    for (const gridRow of gridRows) {
        const gridColumn = gridRow.split('')
        grid.push(gridColumn)
    }

    return grid
}

export function getStartEndLocations(grid: Grid, startChar = 'S', endChar = 'E'): { start: [number, number], end: [number, number] } {
    let start: [number, number] | undefined
    let end: [number, number] | undefined

    for (const [i, row] of grid.entries()) {
        for (const [j, char] of row.entries()) {
            if (char === startChar) {
                if (start!) {
                    const [startRow, startCol] = start
                    throw new Error(`Found second start location in grid at [${i}, ${j}] but start location was already found at [${startRow}, ${startCol}]`)
                }

                start = [i, j]
            }
            else if (char === endChar) {
                if (end) {
                    const [endRow, endCol] = end
                    throw new Error(`Found second end location in grid at [${i}, ${j}] but end location was already found at [${endRow}, ${endCol}]`)
                }

                end = [i, j]
            }
        }
    }

    if (!start) {
        throw new Error(`Grid did not contain start location`)
    }
    if (!end) {
        throw new Error(`Grid did not contain end location`)
    }

    return { start, end }
}

export function getGraph(grid: Grid, starChar = 'S', pathBlockChar = '#'): Graph<string, Edge> {
    const graph: Graph<string, Edge> = {
        rootNodeId: ``,
        nodes: []
    }

    const directions: [number, number][] = [
        [1, 0], [-1, 0], [0, 1], [0, -1]
    ]

    const maxI = grid.length - 1
    const maxJ = grid[0].length - 1

    for (const [i, row] of grid.entries()) {
        for (const [j, char] of row.entries()) {

            const routes: Edge[] = []

            if (char === starChar) {
                graph.rootNodeId = `${i}-${j}`
            }

            if (char !== pathBlockChar) {
                for (const [movI, movJ] of directions) {
                    const [newI, newJ] = [i + movI, j + movJ]
                    const isRowInBounds = newI >= 0 && newI <= maxI
                    const isColInBounds = newJ >= 0 && newJ <= maxJ

                    if (isRowInBounds && isColInBounds) {
                        const newChar = grid[newI][newJ]
                        const isPositionAvailable = newChar !== pathBlockChar
                        if (isPositionAvailable) {
                            const nodeId = `${newI}-${newJ}`
                            routes.push({ to: nodeId })
                        }
                    }
                }
            }

            const node: Node<string, Edge> = {
                id: `${i}-${j}`,
                value: char,
                routes
            }

            graph.nodes.push(node)
        }
    }

    return graph
}

export function findPath(gridString: string): string[] {
    const grid = getGridFromString(gridString)
    const graph = getGraph(grid)
    const path = breadthFirstSearch(graph, n => n.value === 'E')

    return path
}

