const letterValues: { [key: string]: number } = {
    'F': 3,
    'J': 6,
    'X': 12,
    'A': 2,
    'E': 2,
    'I': 2,
    'O': 2,
    'T': 5
}

const defaultLetterValue = 0
const maxLength = 50

export const wordScore = (w: string): number => {
    if (w.length > maxLength) {
        throw new Error(`Word must be at most 50 characters long. The word given was ${w.length}.`)
    }

    const letters = w.toUpperCase().split('')

    return letters.reduce((score, letter) => {
        let letterValue = letterValues[letter] || defaultLetterValue
        score += letterValue
        return score
    }, 0)
}



