/**
 * Given matrix return clockwise traversal of values
 * 
 *      A B C
 *      D E F   -> A, B, C, F, I, H, G, D, E
 *      G H I
 */
export const clockwiseTraversal = <T>(matrix: T[][], rowMin: number = 0, rowMax: number = matrix.length - 1, colMin: number = 0, colMax: number = (matrix[0] || []).length - 1): T[] => {
    if (rowMin > rowMax) return []
    if (colMin > colMax) return []

    const letters: T[] = []

    // TopLeft -> TopRight
    for (let i = colMin; i <= colMax; i++) {
        letters.push(matrix[rowMin][i])
    }

    // TopRight -> BottomRight
    for (let i = rowMin + 1; i <= rowMax; i++) {
        letters.push(matrix[i][colMax])
    }

    if (rowMax != rowMin) {
        // BottomRight -> BottomLeft
        for (let i = colMax - 1; i >= colMin; i--) {
            letters.push(matrix[rowMax][i])
        }
    }

    if (colMax != colMin) {
        // BottomRight -> TopLeft
        for (let i = rowMax - 1; i >= 1; i--) {
            letters.push(matrix[i][colMin])
        }
    }

    return [...letters, ...clockwiseTraversal(matrix, rowMin + 1, rowMax - 1, colMin + 1, colMax - 1)]
}