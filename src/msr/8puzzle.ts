
interface INode<T> {
    parent?: INode<T>
    value: T
    nodes?: INode<T>[]
}

type Puzzle = number[][]

/**
 * Given a 3x3 matrix of numbers with 1 square empty leaving 8 filled squares return if the given puzzle is solvable.
 */
export function isSolvable(puzzle: Puzzle, goalPuzzle: Puzzle): boolean {
    // Return false if puzzle or goal isn't valid or they don't match
    // Get maxRowIndex and maxColIndex
    const maxRowIndex = puzzle.length - 1
    if (maxRowIndex < 1) {
        return false
    }

    const maxColIndex = puzzle[0].length - 1
    if (maxColIndex < 1) {
        return false
    }

    const inversionCount = getInversionCount(puzzle, goalPuzzle, maxRowIndex, maxColIndex)
    if (inversionCount % 2 === 0) {
        return true
    }

    return false
}

function getInversionCount(puzzle: Puzzle, goalPuzzle: Puzzle, maxRowIndex: number, maxColIndex: number): number {
    let inversionCount = 0

    for (let i = 0; i <= maxRowIndex; i++) {
        for (let j = 0; j <= maxColIndex; j++) {
            const puzzleNumber = puzzle[i][j]
            const goalNumber = goalPuzzle[i][j]

            if (puzzleNumber !== goalNumber) {
                inversionCount += 1
            }
        }
    }

    return inversionCount
}

function isMatchingGoal(puzzle: Puzzle, goalPuzzle: Puzzle, maxRowIndex: number, maxColIndex: number): boolean {
    const count = getInversionCount(puzzle, goalPuzzle, maxRowIndex, maxColIndex)

    return count == 0
}

/**
 * Given a 3x3 matrix above, return the moves to solve the puzzle
 */
export function getMovesToSolve(puzzle: Puzzle, goalPuzzle: Puzzle): Puzzle[] | undefined {
    // Return false if puzzle or goal isn't valid or they don't match
    // Get maxRowIndex and maxColIndex
    const maxRowIndex = puzzle.length - 1
    if (maxRowIndex < 1) {
        return undefined
    }

    const maxColIndex = puzzle[0].length - 1
    if (maxColIndex < 1) {
        return undefined
    }

    const root: INode<Puzzle> = {
        value: puzzle,
        nodes: []
    }

    const queue = [root]

    while(queue.length > 0) {
        const node = queue.shift()!
        const isMatching = isMatchingGoal(node.value, goalPuzzle, maxRowIndex, maxColIndex)
        if (isMatching) {
            const path = getPathToRoot(node)
            return path
        }

        // Compute children and add children to node
        const children = expandPuzzle(node.value)
        node.nodes = children.map(p => {
            return {
                value: p,
                nodes: [],
                parent: node
            }
        })

        queue.push(...node.nodes)
    }

    return []
}

export function expandPuzzle(puzzle: Puzzle): Puzzle[] {
    const maxRowIndex = puzzle.length - 1
    if (maxRowIndex < 1) {
        return []
    }

    const maxColIndex = puzzle[0].length - 1
    if (maxColIndex < 1) {
        return []
    }

    const emptyPosition = getEmptyLocation(puzzle, maxRowIndex, maxColIndex)
    if (!Array.isArray(emptyPosition)) {
        return []
    }

    const [i, j] = emptyPosition
    const expansions = getExpansions(puzzle, maxRowIndex, maxColIndex, i, j)
    if (!Array.isArray(expansions)) {
        return []
    }

    return expansions
}

export function getEmptyLocation(puzzle: Puzzle, maxRowIndex: number, maxColIndex: number, empty = 0): [number, number] | undefined {
    for (let i = 0; i <= maxRowIndex; i++) {
        for (let j = 0; j <= maxColIndex; j++) {
            const value = puzzle[i][j]
            if (value === empty) {
                return [i, j]
            }
        }
    }
}

export function getExpansions(puzzle: Puzzle, maxRowIndex: number, maxColIndex: number, emptyRow: number, emptyCol: number): Puzzle[] {
    const expansions: Puzzle[] = []

    const positions = [
        [emptyRow - 1, emptyCol],
        [emptyRow, emptyCol + 1],
        [emptyRow, emptyCol - 1],
        [emptyRow + 1, emptyCol],
    ]

    for (const [newEmptyRow, newEmptyCol] of positions) {
        // Is position in bounds?
        if ((0 <= newEmptyRow && newEmptyRow <= maxRowIndex)
            && (0 <= newEmptyCol && newEmptyCol <= maxColIndex)
        ) {
            // set new empty position to old empty position
            const puzzleCopy = deepClone(puzzle)
            const emptyValue = puzzleCopy[emptyRow][emptyCol]
            const value = puzzleCopy[newEmptyRow][newEmptyCol]
            puzzleCopy[newEmptyRow][newEmptyCol] = emptyValue
            puzzleCopy[emptyRow][emptyCol] = value

            expansions.push(puzzleCopy)
        }
    }

    return expansions
}

export function deepClone<T>(x: T): T {
    return JSON.parse(JSON.stringify(x))
}

export const getPathToRoot = <T>(node: INode<T>): T[] => {
    let currentNode = node
    const path: T[] = [node.value]

    while (currentNode.parent) {
        path.unshift(currentNode.parent.value)
        currentNode = currentNode.parent
    }

    return path
}