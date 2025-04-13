/**
 * Given matrix representing farm land where each cell is either a 1 or 0
 * 1 indicating good land
 * 0 indicating bad land
 * find the largest square of good land
 */


export function findLargestFarmLandSquare(
    matrix: number[][],
    goodLandValue = 1
): number {
    // Guards and Validation
    if (matrix.length === 0) return 0
    if (matrix[0].length === 0) return 0

    const rows = matrix.length
    const cols = matrix[0].length
    let largestSquare = 0

    function expandSquare(topLeft: [number, number], size: number): void {
        const [row, col] = topLeft
        const rightColIndex = col + size - 1
        const bottomRowIndex = row + size - 1

        let canExpand = true

        // Check if all right side cells are 1
        for (let i = 0; i < size; i++) {
            // If right column index is out of bounds, break
            if (rightColIndex >= cols || row + i >= rows) {
                canExpand = false
                break
            }

            if (matrix[row + i][rightColIndex] !== goodLandValue) {
                canExpand = false
                break
            }
        }

        // Check if all bottom side cells are 1
        for (let i = 0; i < size; i++) {
            // If bottom row index is out of bounds, break
            if (bottomRowIndex >= rows || col + i >= cols) {
                canExpand = false
                break
            }

            if (matrix[bottomRowIndex][col + i] !== goodLandValue) {
                canExpand = false
                break
            }
        }

        // Check if bottom right cell is 1
        if (bottomRowIndex < rows && rightColIndex < cols && matrix[bottomRowIndex][rightColIndex] !== goodLandValue) {
            canExpand = false
        }

        if (canExpand) {
            expandSquare(topLeft, size + 1)
        } else {
            // Update largest to current size
            largestSquare = Math.max(largestSquare, size)
        }
    }

    // Go through each cell in the matrix and find the largest square of 1s
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] !== goodLandValue) {
                continue
            }

            expandSquare([i, j], 1)
        }
    }

    return largestSquare
}


export function findLargestFarmLandSquareDP(matrix: number[][], goodLandValue = 1): number {
    // Guards and Validation
    if (matrix.length === 0) return 0
    if (matrix[0].length === 0) return 0

    const rows = matrix.length
    const cols = matrix[0].length
    let largestSquare = 0

    // Create a 2D dp array initialized to 0
    const dp: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0))

    // Fill the dp array
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] === goodLandValue) {
                if (i === 0 || j === 0) {
                    dp[i][j] = 1 // First row or column
                } else {
                    dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
                }
                largestSquare = Math.max(largestSquare, dp[i][j])
            }
        }
    }

    return largestSquare
}
