/**
 * 9.1 Staircase 1, 2, or 3 steps, how many ways to run up n steps
 */
export const getStairPermutations = (n: number, cache = new Map<number, number[][]>()): number[][] => {
    if (n === 0) {
        return []
    }

    if (cache.has(n)) {
        return cache.get(n)!
    }

    const permutations: number[][] = []
    if (n >= 3) {
        permutations.push(...getSubPermutations(n, 3, cache))
    }

    if (n >= 2) {
        permutations.push(...getSubPermutations(n, 2, cache))
    }

    if (n >= 1) {
        permutations.push(...getSubPermutations(n, 1, cache))
    }

    cache.set(n, permutations)

    return permutations
}

const getSubPermutations = (n: number, m: number, cache: Map<number, number[][]>): number[][] => {
    const perms = getStairPermutations(n - m, cache)
    if (perms.length === 0) {
        return [[m]]
    }

    return perms.map(perm => [m].concat(perm))
}

/**
 * 9.2 Robot from top left (0,0) to bottom right (X,Y)
 */
// TODO: Could be optimized by only computing 1 half of matrix then inverting it?
// TODO: Add caching?
export type ICoordinate = [number, number]

export const getRobotPaths = (x: number, y: number, rx: number = 0, ry: number = 0): ICoordinate[][] => {
    let permutations: ICoordinate[][] = []

    if (x === 0 || y === 0) {
        return []
    }

    // If robot is not on right edge it can to right, move right and then add all permutatins from there.
    if (x - 1 - rx > 0) {
        const paths = getRobotPaths(x, y, rx + 1, ry)
        const coord: ICoordinate = [rx + 1, ry]
        const newPermutations = paths.length === 0 ? [[coord]] : paths.map(path => [coord].concat(path))
        permutations.push(...newPermutations)
    }

    // Likewise, if robot is not on bottom edge it can still moe down, move down 1 and then add permutations from there
    if (y - 1 - ry > 0) {
        const paths = getRobotPaths(x, y, rx, ry + 1)
        const coord: ICoordinate = [rx, ry + 1]
        const newPermutations = paths.length === 0 ? [[coord]] : paths.map(path => [coord].concat(path))
        permutations.push(...newPermutations)
    }

    if (rx === 0 && ry === 0) {
        const coord: ICoordinate = [rx, ry]
        const newPermutations = permutations.length === 0 ? [[coord]] : permutations.map(path => [coord].concat(path))
        permutations = newPermutations
    }

    return permutations
}

/**
 * 9.3 Find magic indecies
 */
export const findMagicIndexSlow = (numbers: number[]): number[] => {
    return numbers
        .filter((x, i) => x === i)
}

export const findMagicIndex = (numbers: number[], low: number = 0, high: number = numbers.length - 1): number | undefined => {
    if (low >= high) {
        return undefined
    }

    const midIndex = Math.floor((high + low) / 2)
    const mid = numbers[midIndex]

    if (mid === midIndex) {
        return midIndex
    }

    // If value is greater than index, must search left
    if (mid > midIndex) {
        return findMagicIndex(numbers, low, midIndex)
    }
    else {
        return findMagicIndex(numbers, midIndex + 1, high)
    }
}

/**
 * 9.4 Return all subsets of a set ?
 */
export const getSubsets = (numbers: number[]): number[][] => {
    if (numbers.length <= 1) {
        return []
    }

    const first = numbers.slice(0, numbers.length - 1)
    const last = numbers.slice(1)

    return [
        first,
        last,
        ...getSubsets(first),
        ...getSubsets(last)
    ]
}

/**
 * 9.5 Get all permutatations of a string
 */
export const getPermutations = (s: string): string[] => {
    if (s.length <= 1) {
        return [s]
    }

    const head = s[0]
    const tail = s.slice(1)

    return getPermutations(tail)
        .map(string => [...string.split('').map((x, i) => `${string.slice(0, i)}${head}${string.slice(i, string.length)}`), `${string}${head}`])
        .reduce((a, b) => a.concat(b))
}

/**
 * 9.6 Print parentheses pairs
 */
export const parenthesesPairs = (n: number, cache = new Map<number, string[]>()): string[] => {
    if (n === 0) {
        return []
    }

    if (n === 1) {
        return ['()']
    }

    if (cache.has(n)) {
        return cache.get(n)!
    }

    const subPairs = parenthesesPairs(n - 1)

    const pairs = Array.from(new Set<string>([
        ...subPairs.map(s => `(${s})`),
        ...subPairs.map(s => `()${s}`),
        ...subPairs.map(s => `${s}()`)
    ]).values())

    cache.set(n, pairs)

    return pairs
}

/**
 * 9.7 Fill color
 */

export type IPoint = [number, number]

export const fillColor = (screen: number[][],
    point: IPoint,
    color: number
): number[][] => {
    const yMin = 0
    const yMax = screen.length

    if (yMax === 0) {
        return screen
    }

    const queue: IPoint[] = []
    const xMin = 0
    const xMax = screen[0].length
    const [px, py] = point
    const originalColor = screen[py][px]
    if (xMax === 0) {
        return screen
    }

    let firstRun = true
    const visited = new Array(screen.length).fill(() => null).map(x => new Array(screen[0].length).fill(false))

    // Add starting point to queue for processing
    queue.push(point)

    while (queue.length > 0) {
        const point = queue.shift()!
        const [x, y] = point

        if (!visited[y][x]) {
            visited[y][x] = true

            const screenColor = screen[y][x]
            // Need to know if we're on the first pixel since we have to change the color of that one regardless
            // Use cache which should only be empty for the first pixel
            if (firstRun || screenColor === originalColor) {
                screen[y][x] = color
                queue.push(...getUnvisitedNearbyPoints(screen, point, visited))
            }
        }

        firstRun = false
    }

    return screen
}

const getUnvisitedNearbyPoints = (screen: number[][], point: IPoint, visited: boolean[][]): IPoint[] => {
    const yMin = 0
    const yMax = screen.length

    if (yMax === 0) {
        return []
    }

    const xMin = 0
    const xMax = screen[0].length

    if (xMax === 0) {
        return []
    }

    const [x, y] = point

    const nearby: IPoint[] = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1]
    ]

    return nearby
        // Point must be in-bounds and not visisted
        .filter(p => {
            const [px, py] = p
            return !(xMin > px
                || px >= xMax
                || yMin > py
                || py >= yMax)
                && !visited[py][px]
        })
}

/**
 * 9.9 n-queens problem
 */


/**
 * 9.10 Stack of boxes
 */
export interface IBox {
    width: number
    height: number
    depth: number
}

export const createStackR = (boxes: IBox[], bottom: IBox = null!): IBox[] => {
    let maxHeight = 0
    let maxStack: IBox[] = []

    boxes.forEach((box, i) => {
        if (canBeAbove(box, bottom)) {
            const otherBoxes = [...boxes]
            otherBoxes.splice(i, 1)

            const newStack = createStackR(otherBoxes, box)
            const newHeight = newStack.reduce((h, b) => { h += b.height; return h }, 0)
            if (newHeight > maxHeight) {
                maxHeight = newHeight
                maxStack = newStack
            }
        }
    })

    if (bottom !== null) {
        maxStack.unshift(bottom)
    }

    return maxStack
}

const canBeAbove = (box: IBox, bottom: IBox): boolean => {
    if (bottom === null) {
        return true
    }

    return box.width < bottom.width
        && box.height < bottom.height
        && box.depth < bottom.depth
}

export const createStack = (boxes: IBox[], bottom: IBox = null!, cache: Map<IBox, IBox[]> = new Map<IBox, IBox[]>()): IBox[] => {
    if (cache.has(bottom)) {
        return cache.get(bottom)!
    }

    let maxHeight = 0
    let maxStack: IBox[] = []

    boxes.forEach((box, i) => {
        if (canBeAbove(box, bottom)) {
            const otherBoxes = [...boxes]
            otherBoxes.splice(i, 1)

            const newStack = createStack(otherBoxes, box, cache)
            const newHeight = newStack.reduce((h, b) => { h += b.height; return h }, 0)
            if (newHeight > maxHeight) {
                maxHeight = newHeight
                maxStack = newStack
            }
        }
    })

    if (bottom !== null) {
        maxStack = [bottom, ...maxStack]
        cache.set(bottom, maxStack)
    }

    return maxStack
}
