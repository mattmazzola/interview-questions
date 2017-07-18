/**
 * 11.1 Merge B into A (A has buffer at end but not usd here)
 */
export const mergeBintoA = (a: number[], b: number[]): number[] => {
    if (a.length === 0 || b.length === 0) {
        return a
    }

    const c: number[] = []
    let ia = 0
    let ib = 0

    while (ia < a.length) {
        if (a[ia] >= b[ib]) {
            a.splice(ia, 0, b[ib])
            ia++
            ib++
        }
        else {
            ia++
        }
    }

    return a
}

/**
 * 11.2 Given strings, sort them so all anagrams are adjacent
 */
export const sortAnagrams = (strings: string[]): string[] => {
    const sorted = strings
        .map(s => ({
            s,
            count: getCharCount(s)
        }))
        .sort((a, b) => areMapsEqual(a.count, b.count) ? -1 : 1)

    return sorted.map(x => x.s)
}

const getCharCount = (s: string): Map<string, number> => {
    return s
        .split('')
        .reduce((map, c) => {
            if (map.has(c)) {
                map.set(c, map.get(c)! + 1)
            }
            else {
                map.set(c, 0)
            }

            return map
        }, new Map<string, number>())
}

const areMapsEqual = <T1, T2>(a: Map<T1, T2>, b: Map<T1, T2>): boolean => {
    return Array.from(a).every(([key, value]) => b.has(key) && b.get(key) === value)
}

/**
 * 11.3 Given array of distinct integers which has been rotated, find index of value
 */
export const findRotated = (numbers: number[], value: number): number | undefined => {
    if (numbers === null || numbers.length === 0) {
        return undefined
    }

    if (numbers.length === 1) {
        return (numbers[0] === value) ? 0 : undefined
    }

    const rotationIndex = findRotationPoint(numbers)

    if (rotationIndex > 0) {
        if (numbers[0] <= value && value <= numbers[rotationIndex - 1]) {
            return binarySearch(numbers, value, 0, rotationIndex - 1)
        }
        else if (numbers[rotationIndex] <= value && value <= numbers[numbers.length - 1]) {
            return binarySearch(numbers, value, rotationIndex, numbers.length - 1)
        }
        else {
            return undefined
        }
    }
    else {
        return binarySearch(numbers, value, 0, numbers.length)
    }
}

const findRotationPoint = (numbers: number[]): number => {
    let point = 0

    for (let i = 0; i < numbers.length - 1; i++) {
        if (numbers[i] > numbers[i + 1]) {
            point = i + 1
            break
        }
    }

    return point
}

const binarySearch = (numbers: number[], value: number, min: number, max: number): number | undefined => {
    if (min > max) {
        return (numbers[min] === value) ? min : undefined
    }

    const midIndex = Math.floor((min + max) / 2)
    const mid = numbers[midIndex]

    if (value === mid) {
        return midIndex
    }

    if (value < mid) {
        return binarySearch(numbers, value, min, midIndex)
    }
    else {
        return binarySearch(numbers, value, midIndex + 1, max)
    }
}

/**
 * 11.4 Answerd in test?
 */

/**
 * 11.5 Given array of strings containing empty strings, find given string
 */
export const findString = (strings: string[], value: string): number | undefined => {
    const filtered = strings.map((s, i) => ({ s, i })).filter(x => x.s.length > 0).filter(x => x.s === value)
    return (filtered.length === 1) ? filtered[0].i : undefined
}

/**
 * 11.5 but faster because divide and conquer.
 * it's like binary search but has to search until it finds non emtpy string to make assertion about next search
 */
export const findStringBinarySearch = (strings: string[], value: string, min: number = 0, max: number = strings.length - 1): number | undefined => {
    if (value === "") {
        return undefined
    }

    if (min >= max) {
        return (strings[min] === value) ? min : undefined
    }

    let compareIndex = Math.floor((max + min) / 2)
    let compareValue = strings[compareIndex]
    let imin = compareIndex - 1
    let imax = compareIndex + 1

    // Expand outwards from midpoint until one of the ends reachs non-empty string and use that as compare value
    while (compareValue === "") {
        if (strings[imin] !== "") {
            compareIndex = imin
            compareValue = strings[imin]
            break
        }
        imin--

        if (strings[imax] !== "") {
            compareIndex = imax
            compareValue = strings[imax]
            break
        }
        imax++
    }

    const compare = compareValue.localeCompare(value)

    if (compare === 0) {
        return compareIndex
    }

    if (compare > 0) {
        return findStringBinarySearch(strings, value, min, imin)
    }
    else {
        return findStringBinarySearch(strings, value, imax, max)
    }
}

/**
 * 11.6 Given sorted matrix find value
 */
export const findMatrixValue = (matrix: number[][], value: number): [number, number] | undefined => {
    if (matrix.length === 0) {
        return undefined
    }

    if (matrix[0].length === 0) {
        return undefined
    }

    let irow: number = undefined!

    const foundRow = matrix.some((row, i) => {
        const [rowmin, rowmax] = [row[0], row[row.length - 1]]
        if (rowmin <= value && value <= rowmax) {
            irow = i
            return true
        }

        return false
    })

    if (!foundRow) {
        return undefined
    }

    const col = binarySearch(matrix[irow], value, 0, matrix[irow].length - 1)

    return (col !== undefined) ? [irow, col] : undefined
}

/**
 * 11.7 Given list of peoples' measurements
 */
export interface IPerson {
    height: number
    weight: number
}

export const circusTower = (people: IPerson[]): IPerson[] => {
    if (people.length === 0) {
        return []
    }

    const sortedByHeight = people.slice(0).sort((a, b) => b.height - a.height)
    const sortedByWeight = people.slice(0).sort((a, b) => b.weight - a.weight)

    const tallestByHeight = sortedByHeight.filter((x, i, xs) => (i === 0) ? true : (x.height < xs[i - 1].height) && (x.weight < xs[i - 1].weight))
    const tallestByWeight = sortedByWeight.filter((x, i, xs) => (i === 0) ? true : (x.height < xs[i - 1].height) && (x.weight < xs[i - 1].weight))

    return (tallestByHeight.reduce((totalHeight, person) => totalHeight += person.height, 0) > tallestByWeight.reduce((totalHeight, person) => totalHeight += person.weight, 0))
        ? tallestByHeight
        : tallestByWeight
}

/**
 * 11.8 Given stream of readers
 */
export class Reader {
    numbers: number[] = []
    indexMap: number[] = []

    track(n: number): void {
        const index = binarySearchClosest(this.numbers, n)
        this.numbers.splice(index, 0, n)
        this.indexMap.splice(n, 0, index)
    }

    getRankofNumber(n: number): number {
        const index = this.indexMap[n]
        if (index) {
            return index + 1
        }

        return binarySearchClosest(this.numbers, n)
    }
}

const binarySearchClosest = (numbers: number[], value: number, min: number = 0, max: number = numbers.length - 1): number => {
    if (min >= max) {
        return min
    }

    const mid = Math.floor((max + min) / 2)
    const midValue = numbers[mid]

    if (value === midValue) {
        return mid
    }
    if (value < midValue) {
        return binarySearchClosest(numbers, value, min, mid)
    }
    else {
        return binarySearchClosest(numbers, value, mid + 1, max)
    }
}