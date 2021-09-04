/**
 * 1.1 Given string, return true if it has all unique characters
 */
export const hasAllUnique = (s: string): boolean => {
    if (s.length === 0) {
        return true
    }

    if (s.length === 1) {
        return true
    }

    const characterCounts: any = {}
    return s.split('').every(char => {
        if (characterCounts[char]) {
            return false
        }

        characterCounts[char] = 1
        return true
    })
}

/**
 * 1.2 Revere a null terminatd string
 */
export const reverseString = (s: string): string => {
    // Simulate null terminated string using array
    const s2: string[] = s.split('')
    s2.push(null!)

    const nullIndex = s2.length - 1

    for (let i = 0; i < Math.floor(nullIndex / 2); i++) {
        // Save current character in null index
        s2[nullIndex] = s2[i]
        // Move opposing character in current characters position
        s2[i] = s2[nullIndex - 1 - i]
        // Move character in null position to opposint characters location
        s2[nullIndex - 1 - i] = s2[nullIndex]
    }

    s2[nullIndex] = null!

    return s2.filter(x => x).join('')
}

/**
 * 1.1.2 Alternative solution which sorts characters then goes through comparing neighboring characters
 */
export const hasAllUniqueWithSort = (s: string): boolean => {
    if (s.length <= 1) {
        return true
    }

    const sortedCharacters = s.split('').sort((a, b) => a.localeCompare(b))

    return !sortedCharacters.some((char, i, cs) => {
        if (i === cs.length - 1) {
            return false
        }

        return (char === cs[i + 1])
    })
}

/**
 * 1.3 Given two strings return true if one is permutation of the other
 */
export const isPermutation = (a: string, b: string): boolean => {
    if (a.length !== b.length) {
        return false
    }

    const aCharacterCounts = getCharacterCounts(a)
    const bCharacterCounts = getCharacterCounts(b)

    return Object.keys(aCharacterCounts).every(key => aCharacterCounts[key] === bCharacterCounts[key])
}

const getCharacterCounts = (s: string): { [x: string]: number } => {
    return s
        .split('')
        .reduce((counts: any, char) => {
            if (counts[char]) {
                counts[char] += 1
            }
            else {
                counts[char] = 1
            }

            return counts
        }, {})
}

/**
 * 1.3.2 Same as above but sort string then compare characters
 */
export const isPermutationWithSort = (a: string, b: string): boolean => {
    if (a.length !== b.length) {
        return false
    }

    const achars = a.split('').sort((ca, cb) => ca.localeCompare(cb))
    const bchars = b.split('').sort((ca, cb) => ca.localeCompare(cb))

    return !achars.some((char, i) => char !== bchars[i])
}

/**
 * 1.4 Replace all spaces in the string with %20
 */
// Question intended to be moving characters around within array, using RegExp here isn't safe anyways
export const replace1 = (s: string, x: string, y: string) => s.replace(new RegExp(x, 'g'), y)

/**
 * 1.5 String compression
 */
export interface ICharCount {
    char: string
    count: number
}

export const compressString = (s: string): string => {
    const inOrderCharacterCounts = getInOrderCharacterCounts(s)
    const compressedString = inOrderCharacterCounts
        .map(charCount => `${charCount.char}${charCount.count}`)
        .join('')

    return (compressedString.length < s.length) ? compressedString : s
}

export const getInOrderCharacterCounts = (s: string): ICharCount[] => {
    return s
        .split('')
        .reduce((counts: ICharCount[], char): ICharCount[] => {
            // If first character add it
            if (counts.length === 0) {
                counts.push({ char, count: 1 })
            }
            else {
                // If same character as previous character
                // Otherwise must be new character, add
                const previousCharCount = counts[counts.length - 1]
                if (previousCharCount.char === char) {
                    previousCharCount.count += 1
                }
                else {
                    counts.push({ char, count: 1 })
                }
            }

            return counts
        }, [])
}

/**
 * 1.6 Given image, rotate it 90 degrees
 */
export const rotateMatrix = (matrix: number[][]): number[][] => {
    const rotatedMatrix: number[][] = Array.from(Array(matrix.length), () => [])
    const maxIndex = matrix.length - 1

    matrix.forEach((row, i) => {
        row.forEach((value, j) => {
            const newColumn = maxIndex - i
            const newRow = j

            rotatedMatrix[newRow][newColumn] = value
        })
    })

    return rotatedMatrix
}

/**
 * 1.6.2 same as above, but do it in place
 */
export const rotateMatrixInPlace = (matrix: number[][]): number[][] => {
    const matrixCopy = matrix.map(x => x.map(y => y))
    const iterations = Math.floor(matrix.length / 2)

    for (let i = 0; i < iterations; i++) {
        const minIndex = i
        const maxIndex = matrix.length - 1 - i
        for (let j = minIndex; j <= maxIndex - 1; j++) {
            const topLeft = matrix[minIndex][j]
            const topRight = matrix[j][maxIndex]
            const bottomRight = matrix[maxIndex][maxIndex - (j - minIndex)]
            const bottomLeft = matrix[maxIndex - (j - minIndex)][minIndex]
            matrix[minIndex][j] = bottomLeft
            matrix[j][maxIndex] = topLeft
            matrix[maxIndex][maxIndex - (j - minIndex)] = topRight
            matrix[maxIndex - (j - minIndex)][minIndex] = bottomRight
        }
    }

    return matrix
}

/**
 * 1.7 If there is 0 in matrix set entire row or column to 0
 */
export const zeroOutMatrix = (matrix: number[][]): number[][] => {
    const rows = new Set<number>()
    const cols = new Set<number>()

    matrix.forEach((row, i) => {
        row.forEach((value, j) => {
            if (value === 0) {
                rows.add(i)
                cols.add(j)
            }
        })
    })

    rows.forEach(row => setRow(matrix, row, 0))
    cols.forEach(column => setColumn(matrix, column, 0))

    return matrix
}

const setRow = (matrix: number[][], row: number, value: number): void => {
    const rowSize = matrix[0].length
    matrix[row] = Array(rowSize).fill(value)
}

const setColumn = (matrix: number[][], column: number, value: number): void => {
    matrix.forEach(row => row[column] = value)
}

/**
 * 1.8 Given method isSubstring and 2 strings check if one word is rotation of another with only one call to isSubstring
 */
export const isRotation = (s1: string, s2: string) => {
    if (s1.length !== s2.length) {
        return false
    }

    const s = s1 + s1

    return isSubstring(s, s2)
}

export const isSubstring = (s1: string, s2: string) => s1.match(s2) !== null