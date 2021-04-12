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

    const puzzleInstance = new PuzzleNode(puzzle, goalPuzzle)

    return []
}


class PuzzleNode {
    static emptySymbol = 0
    private puzzle: Puzzle
    private goalPuzzle: Puzzle
    private maxRowIndex: number
    private maxColIndex: number
    private children: PuzzleNode[] = []
    
    constructor (puzzle: Puzzle, goalPuzzle: Puzzle) {
        this.puzzle = puzzle;
        this.goalPuzzle = goalPuzzle;
        this.maxRowIndex = puzzle.length - 1
        this.maxColIndex = puzzle[0].length - 1
    }

    isSolved(): boolean {
        return isMatchingGoal(this.puzzle, this.goalPuzzle, this.maxRowIndex, this.maxColIndex)
    }

    expandNode(): PuzzleNode[] {
        const expandedPuzzles: PuzzleNode[] = []

        const [i0, j0] = this.getEmptyLocation()

        // move empty space up, down, left, right
        // add each new PuzzleNode to children

        return expandedPuzzles
    }

    getEmptyLocation(): [number, number] {
        for(let i = 0; i <= this.maxRowIndex, i++;)
        {
            for(let j = 0; j <= this.maxColIndex, j++;)
            {
                const value = this.puzzle[i][j]
                if (value === PuzzleNode.emptySymbol) {
                    return [i,j]
                }
            }
        }

        throw new Error(`Could not find empty space within puzzle. Looking for symbol ${PuzzleNode.emptySymbol}`)
    }

    findSolution(): PuzzleNode | undefined {
        if (this.isSolved()) {
            return this
        }

        const children = this.expandNode()
        this.children.push(...children)

        for(const child of this.children) {
            // findSolution()
        }

        // const a = new PuzzleNode()
        // return a
    }

}