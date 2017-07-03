/**
 * 1.1
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
 * 1.3
 */
export const isPermutation = (a: string, b: string) => {
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
 * 1.5 String compression
 */
interface ICharCount {
    char: string
    count: number
}

/**
 * 1.5 Compress string
 */
export const compressString = (s: string): string => {
    const getInOrderCharacterCounts = s
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
        .reduce((compressedString: string, charCount: ICharCount) => {
            compressedString += `${charCount.char}${charCount.count}`
            return compressedString
        }, '')

    return (getInOrderCharacterCounts.length < s.length) ? getInOrderCharacterCounts : s
}

export const rotateMatrix = (matrix: number[][]): number[][] => {
    const rotatedMatrix: number[][] = Array.apply(null, Array(matrix.length)).map(() => [])
    const maxIndex = matrix.length  - 1

    matrix.forEach((row, i) => {
        row.forEach((value, j) => {
            const newColumn = maxIndex - i
            const newRow = j

            rotatedMatrix[newRow][newColumn] = value
        })
    })

    return rotatedMatrix
}

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
    const locationsWithZero: any = []

    matrix.forEach((row, i) => {
        row.forEach((value, j) => {
            if (value === 0) {
                locationsWithZero.push({ i, j })
            }
        })
    })

    const uniques = locationsWithZero.reduce((uniqueSets: any, location: any) => {
        uniqueSets.rows[location.i] = 1
        uniqueSets.cols[location.j] = 1
        return uniqueSets
    }, { rows: {}, cols: {} })

    Object.keys(uniques.rows).forEach(row => setRowToZero(matrix, parseInt(row)))
    Object.keys(uniques.cols).forEach(column => setColumnToZero(matrix, parseInt(column)))

    return matrix
}

const setRowToZero = (matrix: number[][], row: number): void => {
    const rowSize = matrix[0].length
    matrix[row] = Array.apply(null, new Array(rowSize)).map(() => 0)
}

const setColumnToZero = (matrix: number[][], column: number): void => {
    matrix.forEach(row => row[column] = 0)
}