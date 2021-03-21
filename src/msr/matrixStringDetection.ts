/***
 * Given a matrix and string determine if string is present
 * 
 * If the string can be found in the matrix, output "String can be found", along with the coordinates of each of the letters, in order.
 * If the string can not be found in the matrix, output "String not found"
 */
export function isStringPresent(matrix: string[][] | undefined, s: string | undefined): string {
    // If matrix is not array, if matrix is empty, or if targetString is undefined
    if (!Array.isArray(matrix)
        || matrix.length == 0
        || matrix[0].length == 0
        || !s
        || s.length == 0
    ) {
        return 'String not found'
    }

    const matrixHeight = matrix.length
    const matrixWidth = matrix[0].length
    const firstChar = s[0]

    for (let i = 0; i < matrixWidth; i++) {
        for (let j = 0; j < matrixHeight; j++) {
            const letter = matrix[i][j]
            if (letter == firstChar) {
                const charCoordinates = findWord(matrix, i, j, s, 0)
                if (Array.isArray(charCoordinates)) {
                    const letterCoordinates = charCoordinates.map(({ char: c, position: [i, j] }) => `${c}: (${i}, ${j})`).join(', ')
                    return `String can be found. Coordinates: ${letterCoordinates}`
                }
            }
        }
    }

    return 'String not found'
}

type CharPosition = {
    char: string,
    position: [number, number]
}

function findWord(matrix: string[][], rowIndex: number, colIndex: number, word: string, charIndex: number): CharPosition[] | undefined {
    // If matrix is not array, if matrix is empty, or if targetString is undefined
    if (!Array.isArray(matrix)
        || matrix.length == 0
        || matrix[0].length == 0
    ) {
        return
    }

    const matrixHeight = matrix.length
    const matrixWidth = matrix[0].length

    // If position out of bounds
    if (rowIndex < 0
        || rowIndex >= matrixHeight
        || colIndex < 0
        || colIndex >= matrixWidth
    ) {
        return
    }

    // If charIndex invalid
    if (charIndex < 0
        || charIndex >= word.length
    ) {
        return
    }

    // Get target char from word
    const desiredChar = word[charIndex]
    const charAtPosition = matrix[rowIndex][colIndex]

    if (charAtPosition != desiredChar) {
        return
    }

    // If we matched last character return coordinates
    const charPosition: CharPosition = {
        char: desiredChar,
        position: [rowIndex, colIndex]
    }
    const charPositions = [charPosition]
    const isLastChar = charIndex == word.length - 1
    if (isLastChar) {
        return charPositions
    }

    // Otherwise continue searching
    // Invalid current char
    matrix[rowIndex][colIndex] = '*'

    const nextPositions = findWord(matrix, rowIndex - 1, colIndex, word, charIndex + 1)
                        || findWord(matrix, rowIndex, colIndex + 1, word, charIndex + 1)
                        || findWord(matrix, rowIndex + 1, colIndex, word, charIndex + 1)
                        || findWord(matrix, rowIndex, colIndex - 1, word, charIndex + 1)

    // Undo change to matrix
    matrix[rowIndex][colIndex] = desiredChar

    return nextPositions
        ? [...charPositions, ...nextPositions]
        : undefined
}