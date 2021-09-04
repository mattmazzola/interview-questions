/** https://www.codewars.com/kata/matrix-addition */
export function matrixSum(xs1: number[][], xs2: number[][]): number[][] {
    const width = xs1.length
    const height = xs1[0].length
    const newMatrix = Array.from(Array(width), () => Array(height).fill(0))

    xs1.forEach((row, xi) => {
        row.forEach((x1, xj) => {
            const x2 = xs2[xi][xj]
            newMatrix[xi][xj] = x1 + x2
        })
    })

    return newMatrix
}