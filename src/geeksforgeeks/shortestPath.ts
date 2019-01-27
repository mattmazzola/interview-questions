/** https://www.geeksforgeeks.org/min-cost-path-dp-6/ */
export function paths (matrix: number[][], m: number = 0, n: number = 0): number[][] {
    const current = matrix[m][n]
    const maxHieght = matrix.length - 1
    const maxWidth = matrix[0].length - 1
    // console.log("- start: ", m, n, " current: ", current)

    if (m === maxHieght && n === maxWidth) {
        const end = matrix[maxHieght][maxWidth]
        // console.log("end: ", end)
        return [[end]]
    }

    let newPaths: number[][] = []

    if (n + 1 <= maxWidth) {
        // console.log("right: ")
        const rightPaths = paths(matrix, m, n + 1)
            .map(path => [current, ...path])

        newPaths = [...newPaths, ...rightPaths]
    }
    if (n + 1 <= maxWidth && m + 1 <= maxHieght) {
        // console.log("diagonal: ")
        const diagonalPaths = paths(matrix, m + 1, n + 1)
            .map(path => [current, ...path])

        newPaths = [...newPaths, ...diagonalPaths]
    }
    if (m + 1 <= maxHieght) {
        // console.log("down: ")
        const downPaths = paths(matrix, m + 1, n)
            .map(path => [current, ...path])

        newPaths = [...newPaths, ...downPaths]
    }

    // console.log("paths: ", newPaths)
    return newPaths
}

export function shortestPath (matrix: number[][]): number[] {
    return paths(matrix)
        .map(path => ({
            total: path.reduce((sum, next) => sum += next, 0),
            path
        }))
        .reduce((aPathObject, bPathObject) => {
            return aPathObject.total < bPathObject.total
                ? aPathObject
                : bPathObject
        })
        .path
}

export function memoize<R, T extends (...args: any[]) => R>(f: T): T {
    const cache: { [x: string]: R } = {}

    const g = (...args: any[]) => {
        const serializedArgs = JSON.stringify(args)
        if (cache[serializedArgs]) {
            return cache[serializedArgs]
        }

        return cache[serializedArgs] = f(...args)
    };

    return g as T;
}