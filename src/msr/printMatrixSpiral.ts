export function printMatrixSpiral (matrix: number[][]): number[] {
    const maxSize = matrix.length
    if (maxSize === 0) {
        return []
    }

    const isOdd = maxSize % 2 !== 0
    const maxIterations = Math.floor(maxSize / 2)

    // console.log("maxSize: ", maxSize)

    const numbers = []

    for (let j = 0; j < maxIterations; j++) {
        // Top
        let top = []
        for(let i = j; i < maxSize - 1 - j; i++) {
            top.push(matrix[j][i])
        }
        numbers.push(...top)
        // console.log("top: ", top)
        
        // Right
        let right = []
        for (let i = j; i < maxSize - 1 - j; i++) {
            right.push(matrix[i][maxSize - 1 - j])
        }
        numbers.push(...right)
        // console.log("right: ", right)
        
        // Bottom
        let bottom = []
        for (let i = maxSize - 1 - j; i > j; i--) {
            bottom.push(matrix[maxSize - 1 - j][i])
        }
        numbers.push(...bottom)
        // console.log("bottom: ", bottom)
        
        // Left
        let left = []
        for (let i = maxSize - 1 - j; i > j; i--) {
            left.push(matrix[i][j])
        }
        numbers.push(...left)
        // console.log("left: ", left)
    }

    if (isOdd) {
        const center = matrix[maxIterations][maxIterations]
        numbers.push(center)
        // console.log("center: ", center)
    }

    // console.log("numbers: ", numbers)

    return numbers
}