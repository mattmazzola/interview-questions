/** https://www.codewars.com/kata/connect-four-1?utm_source=newsletter */

export enum Players {
    Red = 'R',
    Yellow = 'Y',
    None = 'N'
}

export interface IPlay {
    player: Players
    column: number
}

export interface IWinner {
    winner: Players
    field: IField
}
export type IPlace = [Players, number]

export type IField = Players[][]

export const columnLetters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

export function addToField(field: IField, play: IPlay): IField {
    if (play.column > field[0].length - 1) {
        throw new Error(`Cannot place token out of bounds. You passed: ${play.column} and the max is: ${field[0].length - 1}`)
    }

    for (let i = field.length - 1; i >= 0; i--) {
        if (field[i][play.column] === Players.None) {
            field[i][play.column] = play.player
            break
        }
    }

    return field
}

const maxConsequetiveNeeded = 4

export function connectFour(plays: string[]): IWinner {
    const field: IField = Array.from(Array(6), _ => Array.from(Array(7), _ => Players.None))
    const playsNormalized: IPlay[] = plays.map(p => {
        const [columnLetter, playerColor] = p.split('_')

        return {
            player: playerColor === "Red" ? Players.Red : Players.Yellow,
            column: columnLetters.findIndex(l => l === columnLetter.toUpperCase())
        }
    })


    let winner = Players.None
    playsNormalized.some((p, i) => {
        addToField(field, p)

        // Only look for winner if minimum number of moves to win have been taken
        if (i >= maxConsequetiveNeeded * 2 - 2) {
            winner = getWinner(field)
            if (winner === Players.Red || winner === Players.Yellow) {
                return true
            }
        }

        return false
    })

    // console.log(`field: \n`, field)
    // console.log(`playersNornalized: \n`, playsNormalized)

    return { winner, field }
}

export function getWinner(field: IField): Players {

    // Test rows
    const noToken: IPlace = [Players.None, 0]
    let lastPlace: IPlace = noToken

    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[0].length; j++) {
            const fieldPlayer = field[i][j]
            // console.log(`rows: ${i},${j}`)
            if (fieldPlayer === Players.None) {
                lastPlace = noToken
            }
            else {
                let [lastPlayer, count] = lastPlace
                if (fieldPlayer === lastPlayer) {
                    lastPlace = [fieldPlayer, lastPlace[1] + 1]
                }
                else {
                    lastPlace = [fieldPlayer, 1]
                }

                [lastPlayer, count] = lastPlace
                if (count >= maxConsequetiveNeeded) {
                    return lastPlayer
                }
            }
            // console.log(`lastPlace: `, lastPlace)
        }
        lastPlace = noToken
    }

    // Test columns
    for (let j = 0; j < field[0].length; j++) {
        for (let i = 0; i < field.length; i++) {
            const fieldPlayer = field[i][j]
            // console.log(`columns: ${i},${j}`)
            if (fieldPlayer === Players.None) {
                lastPlace = noToken
            }
            else {
                let [lastPlayer, count] = lastPlace
                if (fieldPlayer === lastPlayer) {
                    lastPlace = [fieldPlayer, lastPlace[1] + 1]
                }
                else {
                    lastPlace = [fieldPlayer, 1]
                }

                [lastPlayer, count] = lastPlace
                if (count >= maxConsequetiveNeeded) {
                    return lastPlayer
                }
            }

            // console.log(`lastPlace: `, lastPlace)
        }
        lastPlace = noToken
    }

    // Test diagonal down-right
    const rowMax = field.length - (maxConsequetiveNeeded - 1)
    for (let i = 0; i < rowMax; i++) {
        for (let k = i; k < field.length; k++) {
            const j = k - i
            // console.log(`diagonal down-right: ${i} - ${k},${j}`, lastPlace)
            const fieldPlayer = field[k][j]
            if (fieldPlayer === Players.None) {
                lastPlace = noToken
            }
            else {
                let [lastPlayer, count] = lastPlace
                if (fieldPlayer === lastPlayer) {
                    lastPlace = [fieldPlayer, lastPlace[1] + 1]
                }
                else {
                    lastPlace = [fieldPlayer, 0]
                }

                [lastPlayer, count] = lastPlace
                if (count >= maxConsequetiveNeeded) {
                    return lastPlayer
                }
            }
        }
    }

    const columnMax = field[0].length - (maxConsequetiveNeeded - 1)
    for (let j = 1; j < columnMax; j++) {
        for (let k = j; k < field[0].length; k++) {
            const i = k - j
            const fieldPlayer = field[i][k]
            // console.log(`diagonal2 down-right: ${j} - ${i},${k}`, lastPlace)

            if (fieldPlayer === Players.None) {
                lastPlace = noToken
            }
            else {
                let [lastPlayer, count] = lastPlace
                if (fieldPlayer === lastPlayer) {
                    lastPlace = [fieldPlayer, lastPlace[1] + 1]
                }
                else {
                    lastPlace = [fieldPlayer, 0]
                }

                [lastPlayer, count] = lastPlace
                if (count >= maxConsequetiveNeeded) {
                    return lastPlayer
                }
            }
        }
    }

    // Test diagonal down-left
    for (let i = 0; i < rowMax; i++) {
        for (let k = i; k < field.length; k++) {
            const j = field[0].length - 1 - (k - i)
            const fieldPlayer = field[k][j]
            // console.log(`diagonal2 down-left: ${i} - ${k},${j}`, lastPlace)

            if (fieldPlayer === Players.None) {
                lastPlace = noToken
            }
            else {
                let [lastPlayer, count] = lastPlace
                if (fieldPlayer === lastPlayer) {
                    lastPlace = [fieldPlayer, lastPlace[1] + 1]
                }
                else {
                    lastPlace = [fieldPlayer, 0]
                }

                [lastPlayer, count] = lastPlace
                if (count >= maxConsequetiveNeeded) {
                    return lastPlayer
                }
            }
        }
    }

    const columnMin = maxConsequetiveNeeded - 1
    for (let j = columnMin; j < field[0].length - 1; j++) {
        for (let k = j; k >= 0; k--) {
            const i = j - k
            const fieldPlayer = field[i][k]
            // console.log(`diagonal3 down-left: ${j} - ${i},${k}`, lastPlace)

            if (fieldPlayer === Players.None) {
                lastPlace = noToken
            }
            else {
                let [lastPlayer, count] = lastPlace
                if (fieldPlayer === lastPlayer) {
                    lastPlace = [fieldPlayer, lastPlace[1] + 1]
                }
                else {
                    lastPlace = [fieldPlayer, 0]
                }

                [lastPlayer, count] = lastPlace
                if (count >= maxConsequetiveNeeded) {
                    return lastPlayer
                }
            }
        }
    }

    return Players.None
}
