/**
 * Given a 3x3 matrix of numbers with 1 square empty leaving 8 filled squares return if the given puzzle is solvable.
 */
export function isSolveable(puzzle: number[][]): boolean {
    return false
}

/**
 * Given a 3x3 matrix above, return the moves to solve the puzzle
 */

type Direction = "up" | "down" | "left" | "right"
type Move = {
    row: number
    col: number
    dir: Direction
}

export function movesToSolve(puzzle: number[][]): Move[] {
    return []
}