/**
 * River Sizes
 *
 * You are given a two-dimensional array (a matrix) of potentially unequal height and width containing only 0s and 1s.
 * Each 0 represents land, and each 1 represents part of a river.
 * A river consists of any number of 1s that are either horizontally or vertically adjacent (but not diagonally adjacent).
 * The number of adjacent 1s forming a river determine its size.
 *
 * Write a function that returns an array of the sizes of all rivers represented in the input matrix. The sizes don't need to be in any particular order.
 */

export function riverSizes(matrix: number[][]): number[] {

    // If the matrix is empty, return an empty array
    if (matrix.length === 0) {
        return []
    }

    // Go through each location and check if it's a 1
    // When detect 1, expand to all adjacent 1s
    // Store each found 1 in a set
    // When all adjacent 1s are found, store the size in an array

    const sizes: number[] = []
    const visited: Set<string> = new Set()

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            const currentLocation = `${i},${j}`
            if (matrix[i][j] === 1 && !visited.has(currentLocation)) {
                const size = exploreRiver(i, j, matrix, visited)
                sizes.push(size)
            }
        }
    }

    return sizes
}

function exploreRiver(
    i: number,
    j: number,
    matrix: number[][],
    visited: Set<string>
): number {
    const currentLocation = `${i},${j}`
    if (visited.has(currentLocation)) {
        return 0
    }

    visited.add(currentLocation)

    if (matrix[i][j] === 0) {
        return 0
    }

    let size = 1

    // Check all adjacent locations
    const adjacentLocations = getAdjacentLocations(i, j, matrix)
    for (const location of adjacentLocations) {
        const [x, y] = location
        size += exploreRiver(x, y, matrix, visited)
    }

    return size
}

// Helper function to get all adjacent locations
function getAdjacentLocations(
    i: number,
    j: number,
    matrix: number[][]
): number[][] {
    const adjacentLocations: number[][] = []

    // Up
    if (i > 0) {
        adjacentLocations.push([i - 1, j])
    }

    // Down
    if (i < matrix.length - 1) {
        adjacentLocations.push([i + 1, j])
    }

    // Left
    if (j > 0) {
        adjacentLocations.push([i, j - 1])
    }

    // Right
    if (j < matrix[i].length - 1) {
        adjacentLocations.push([i, j + 1])
    }

    return adjacentLocations
}
