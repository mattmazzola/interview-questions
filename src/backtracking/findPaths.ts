export function findPathsRecursive(
    grid: string[][],
    startToken = 'start',
    endToken = 'end',
): string[][] {
    const rows = grid.length
    if (rows === 0) {
        return []
    }
    const cols = grid[0].length

    let startPosition: [number, number] = [-1, -1]
    let endPosition: [number, number] = [-1, -1]
    const paths: string[][] = []

    // Find the start and end positions
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === startToken) startPosition = [i, j]
            if (grid[i][j] === endToken) endPosition = [i, j]
        }
    }

    const [sRi, sCi] = startPosition
    const [eRi, eCi] = endPosition

    // If start or end is not found, return an empty array
    if (sRi === -1 || eRi === -1) {
        return []
    }

    function backtrack(i: number, j: number, path: string[]) {
        // Base case: if we've reached the end position
        if (i === eRi && j === eCi) {
            paths.push([...path, `(${i},${j})`])
            return
        }

        // Out of bounds check
        if (i >= rows || j >= cols) {
            return
        }

        // Add current position to path
        path.push(`(${i},${j})`)

        // Move right
        backtrack(i, j + 1, path)

        // Move down
        backtrack(i + 1, j, path)

        // Backtrack: remove the last position from path to try another direction
        path.pop()
    }

    // Start the backtracking from the 'start' position
    backtrack(sRi, sCi, [])

    return paths
}


export function findPaths(
    grid: string[][],
    startToken = 'start',
    endToken = 'end',
): string[][] {
    const rows = grid.length
    if (rows === 0) {
        return []
    }
    const cols = grid[0].length

    let startPosition: [number, number] = [-1, -1]
    let endPosition: [number, number] = [-1, -1]
    const paths: string[][] = []

    // Find the start and end positions
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === startToken) startPosition = [i, j]
            if (grid[i][j] === endToken) endPosition = [i, j]
        }
    }

    const [sRi, sCi] = startPosition
    const [eRi, eCi] = endPosition

    // If start or end is not found, return an empty array
    if (sRi === -1 || eRi === -1) {
        return []
    }

    const stack: { i: number, j: number, path: string[] }[] = [{ i: sRi, j: sCi, path: [] }]

    while (stack.length > 0) {
        const { i, j, path } = stack.shift()!

        // Base case: if we've reached the end position
        if (i === eRi && j === eCi) {
            paths.push([...path, `(${i},${j})`])
        }
        else {
            // If can move right, move right
            if (j + 1 < cols) {
                stack.push({ i, j: j + 1, path: [...path, `(${i},${j})`] })
            }

            // If can move down, move down
            if (i + 1 < rows) {
                stack.push({ i: i + 1, j, path: [...path, `(${i},${j})`] })
            }
        }
    }

    return paths
}



