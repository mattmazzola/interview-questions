export const reshape = (nums: number[][], r: number, c: number): number[][] => {
    if (nums.length < 1) {
        return nums
    }

    // Get number of items in given matrix
    const rows = nums.length
    const cols = nums[0].length
    const length = cols * rows;
    
    // If new matrix cannot hold all of the items, return original
    if (r * c !== length) {
        return nums
    }

    let oldRow = 0
    const newMatrix: number[][] = [[]]

    for(let i = 0; i < nums.length; i++) {
        for(let j = 0; j < nums[0].length; j++) {
            const newCol = (i * cols + j) % c
            const newRow = Math.floor((i * cols + j) / c)

            if (oldRow != newRow) {
                newMatrix.push([])
                oldRow = newRow
            }

            newMatrix[newRow][newCol] = nums[i][j]
        }
    }

    return newMatrix
}