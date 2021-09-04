/**
 * 17.1 Swap number in place without temporary variable
 */
// Don't understand question, Ifyou have two numbers just return the one you want?
// Assume we're given two numbers, go through one number binary bits and XOR? Could rotate through each bit with mask?


/**
 * 17.2 Has someone one game of tic tac toe
 */
export const hasWonTicTacToe = (board: number[][]): boolean => {
    // Test all rows
    const completeRow = () => board.some(row => row.every(cell => cell === row[0]))

    // Test all columns
    const columnPlaceholder = Array(board[0].length).fill(0)
    const completeColumn = () => columnPlaceholder.some((column, i) => board.every(row => row[i] === board[0][i]))

    // Test diagonals
    const topLeft = board[0][0]
    const diagonal1 = () => columnPlaceholder.every((_, i) => board[i][i] === topLeft)

    const maxIndex = columnPlaceholder.length - 1
    const topRight = board[0][maxIndex]
    const diagonal2 = () => columnPlaceholder.every((_, i) => board[i][maxIndex - i] === topRight)

    const x = completeRow()
        || completeColumn()

    return x
        || diagonal1()
        || diagonal2()
}

/**
 * 17.4 Return number of trailing zeroes
 */
export const factorialTrailingZeroes = (n: number, cache = new Map<number, number>()): number => {
    if (cache.has(n)) {
        return cache.get(n)!
    }

    const number = factorial(n)
    let foundNonZero = false
    const result = number.toString().split('').reverse().filter(n => {
        if (!foundNonZero) {
            if (n === '0') {
                return true
            }
            else {
                foundNonZero = true
                return false
            }
        }

        return false
    }).length

    cache.set(n, result)

    return result
}

export const factorial = (n: number, cache = new Map<number, number>()): number => {
    if (n <= 1) {
        return 1
    }

    if (cache.has(n)) {
        return cache.get(n)!
    }

    const result = n * factorial(n - 1, cache)
    cache.set(n, result)

    return result
}

/**
 * 17.5 Game of Master Mind
 */
export interface IResult {
    hits: number
    pseudohits: number
}

export const mastermind = (guess: string, solution: string): IResult => {
    const correctLetters = solution.split('').map((c, i) => ({ c, i, used: false }))
    const guessLetters = guess.split('').map((c, i) => ({ c, i, hit: false, pseudohit: false }))

    // Mark all hits in guess letters
    guessLetters.forEach(letter => {
        // If letter is same as solution in matching column then mark as hit
        const correspondingLetter = correctLetters[letter.i]
        if (letter.c === correspondingLetter.c) {
            letter.hit = true
            correspondingLetter.used = true
        }
    })

    // For each remaining letter not already a hit, check if it's a pseudo hit
    guessLetters.filter(l => !l.hit).forEach(gl => {
        correctLetters.filter(l => !l.used).forEach(cl => {
            if (cl.c === gl.c) {
                cl.used = true
                gl.pseudohit = true
            }
        })
    })

    return guessLetters.reduce((result, l) => {
        result.hits += (l.hit === true) ? 1 : 0
        result.pseudohits += (l.pseudohit === true) ? 1 : 0

        return result
    }, { hits: 0, pseudohits: 0 })
}