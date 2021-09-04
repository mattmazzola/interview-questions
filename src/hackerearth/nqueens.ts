/**
 * So, while solving a problem using recursion, we break the given problem into smaller ones. Let's say we have a problem A and we divided it into three smaller problems B, C and D. 
 * Now it may be the case that the solution to A does not depend on all the three subproblems, in fact we don't even know on which one it depends.
 * 
 * Let's take a situation. Suppose you are standing in front of three tunnels, one of which is having a bag of gold at its end, but you don't know which one. So you'll try all three.
 * First go in tunnel 1, if that is not the one, then come out of it, and go into tunnel 2, and again if that is not the one, come out of it and go into tunnel 3. So basically in backtracking we attempt solving a subproblem, and if we don't reach the desired solution, then undo whatever we did for solving that subproblem, and try solving another subproblem.
 * 
 * Let's take a standard problem.
 * N-Queens Problem: Given a chess board having N×N cells, we need to place N queens in such a way that no queen is attacked by any other queen. A queen can attack horizontally, vertically and diagonally.
 * 
 * So initially we are having N×N unattacked cells where we need to place 
 * 
 * N queens. Let's place the first queen at a cell (i, j), so now the number of unattacked cells is reduced, and number of queens to be placed is 
 * N − 1. Place the next queen at some unattacked cell. This again reduces the number of unattacked cells and number of queens to be placed becomes 
 * N − 2. Continue doing this, as long as following conditions hold.
 * 
 * The number of unattacked cells is not 0.
 * The number of queens to be placed is not 0.
 * 
 * If the number of queens to be placed becomes 0, then it's over, we found a solution.
 */

export interface ICell {
    i: number
    j: number
    occupied: boolean
    attacked: boolean
}

export interface IPosition {
    i: number
    j: number
}

export const nqueens = (n: number, debug = false): ICell[][] => {
    const board = createBoard(n)

    if (debug) {
        console.log(`New Board: Size ${n} \n${getBoardVisual(board)}`)
    }

    return nqueensinternal(board, n, debug)
}

const nqueensinternal = (board: ICell[][], remainingQueensToPlace: number, debug: boolean): ICell[][] => {
    if (debug) {
        console.log(`nqueensinternal: ${remainingQueensToPlace} \n${getBoardVisual(board)}`)
    }

    if (remainingQueensToPlace == 0) {
        return board
    }

    const positionsAvailable = findPositionsAvailable(board)
    if (positionsAvailable.length === 0) {
        if (debug) {
            console.log(`error \n${getBoardVisual(board)}`)
        }
        throw new Error(`No unattacked cells available on the board`)
    }

    const positionsAttempted: IPosition[] = []
    let newBoard: ICell[][] = []

    while (true) {
        const position = findNextAvailablePosition(positionsAvailable, positionsAttempted)
        if (debug) {
            console.log(`Level: ${remainingQueensToPlace} - Attempt New Board with queen at ${position.i}, ${position.j}`)
        }
        newBoard = generateNewBoardWithQueenAtPosition(board, position)
        if (debug) {
            console.log(`Level: ${remainingQueensToPlace} - new board with queen applied. \n${getBoardVisual(newBoard)}`)
        }

        let isSuccess = false
        try {
            newBoard = nqueensinternal(newBoard, remainingQueensToPlace - 1, debug)
            isSuccess = true
        }
        catch (e) {
            const error = e as Error

            if (debug) {
                console.log(`Error at level: ${remainingQueensToPlace} position: ${position.i}, ${position.j}, \n ${error.message}`)
            }
            positionsAttempted.push(position)

            if (positionsAvailable.length === positionsAttempted.length) {
                throw new Error(`There are no more available positions to place the remaining queens. Retry by moving previous placed queen`)
            }
        }

        if (isSuccess) {
            break
        }
    }

    return newBoard
}

export const createBoard = (n: number): ICell[][] => {
    const board = []

    for (let i = 0; i < n; i++) {
        const row = []
        for (let j = 0; j < n; j++) {
            row.push({
                i,
                j,
                occupied: false,
                attacked: false
            })
        }
        board.push(row)
    }

    return board
}

export const findPositionsAvailable = (board: ICell[][]): IPosition[] => {
    return board
        .reduce((positions: IPosition[], row, i) => {
            return positions.concat(
                row
                    .map((cell, j) => cell.attacked ? ({ i: -1, j: -1 }) : ({ i, j }))
                    .filter(cell => cell.i !== -1)
            )
        }, [])
}

export const findNextAvailablePosition = (positionsAvilable: IPosition[], positionsAttempted: IPosition[]): IPosition => {
    return positionsAvilable[positionsAttempted.length]
}

export const generateNewBoardWithQueenAtPosition = (board: ICell[][], position: IPosition): ICell[][] => {
    const newBoard = board.map(row => row.map(cell => ({ ...cell })))

    // Get cell that queen should be placed on.
    const cell = newBoard[position.i][position.j]

    if (cell.occupied) {
        throw new Error(`Attempted to place queen on cell that is already occupied by another queen. Must be error in positioning algorithm`)
    }
    if (cell.attacked) {
        throw new Error(`Attempted to place queen on cell that is alrady attacked, Must be error in positioning algorithm`)
    }

    cell.occupied = true
    cell.attacked = true

    // set attacked to true on all cells in same column and row
    for (let i = 0; i < newBoard.length; i++) {
        newBoard[position.i][i].attacked = true
        newBoard[i][position.j].attacked = true
    }

    // set attacked to true on all cells on diagonals
    let topLeftEdgeHit = false
    let topRightEdgeHit = false
    let bottomLeftEdgeHit = false
    let bottomRightEdgeHit = false
    let offset = 1

    while (!topLeftEdgeHit
        || !topRightEdgeHit
        || !bottomRightEdgeHit
        || !bottomLeftEdgeHit
    ) {
        // If top left edge is not hit edge yet, expand it and either set to hit edge or set cell to attacked
        if (!topLeftEdgeHit) {
            const topLeftPosition = {
                i: position.i - offset,
                j: position.j - offset
            }

            if (topLeftPosition.i < 0
                || topLeftPosition.j < 0
            ) {
                topLeftEdgeHit = true
            }
            else {
                newBoard[topLeftPosition.i][topLeftPosition.j].attacked = true
            }
        }

        if (!topRightEdgeHit) {
            const topRightPosition = {
                i: position.i - offset,
                j: position.j + offset
            }

            if (topRightPosition.i < 0
                || topRightPosition.j >= newBoard.length
            ) {
                topRightEdgeHit = true
            }
            else {
                newBoard[topRightPosition.i][topRightPosition.j].attacked = true
            }
        }

        if (!bottomLeftEdgeHit) {
            const bottomLeftPosition = {
                i: position.i + offset,
                j: position.j - offset
            }

            if (bottomLeftPosition.i >= newBoard.length
                || bottomLeftPosition.j < 0
            ) {
                bottomLeftEdgeHit = true
            }
            else {
                newBoard[bottomLeftPosition.i][bottomLeftPosition.j].attacked = true
            }
        }

        if (!bottomRightEdgeHit) {
            const bottomRightPosition = {
                i: position.i + offset,
                j: position.j + offset
            }

            if (bottomRightPosition.i >= newBoard.length
                || bottomRightPosition.j >= newBoard.length
            ) {
                bottomRightEdgeHit = true
            }
            else {
                newBoard[bottomRightPosition.i][bottomRightPosition.j].attacked = true
            }
        }

        offset++
    }

    return newBoard
}

export const getBoardVisual = (board: ICell[][]): string => {
    return board
        .map(row => {
            const rowString = row.map(cell => {
                if (cell.occupied) {
                    return 'Q'
                }
                else if (cell.attacked) {
                    return 'x'
                }

                return ' '
            }).join('|')
            return `[${rowString}]`
        })
        .join('\n')
}