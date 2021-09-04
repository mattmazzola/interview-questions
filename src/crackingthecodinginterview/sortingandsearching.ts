/**
 * 11.1 Merge B into A
 */
export const mergeBintoA = (a: number[], b: number[], lastA: number): number[] => {
    const c: number[] = []
    let ia = lastA - 1
    let ib = b.length - 1
    let imerged = a.length - 1

    while (ib >= 0) {
        if (ia >= 0 && a[ia] >= b[ib]) {
            a[imerged] = a[ia]
            ia--
        }
        else {
            a[imerged] = b[ib]
            ib--
        }

        imerged--
    }

    return a
}

/**
 * 11.2 Given strings, sort them so all anagrams are adjacent
 */
export const sortAnagrams = (strings: string[]): string[] => {
    const maps = strings
        .map(s => ({
            s,
            charCountMap: getCharCounts(s)
        }))

    const sorted = maps
        .sort((a, b) => {
            const eq = areMapsEqual(a.charCountMap, b.charCountMap)
            // console.log({ a, b })
            return eq
                ? -1
                : 1
        })

    return sorted.map(x => x.s)
}

const getCharCounts = (s: string): Record<string, number> => {
    return s
        .split('')
        .reduce<Record<string, number>>((charCounts, c) => {
            charCounts[c] = (charCounts[c] ?? 0) + 1
            return charCounts
        }, {})
}

const areMapsEqual = <T2>(a: Record<string, T2>, b: Record<string, T2>): boolean => {
    return Object.entries(a)
        .every(([key, value]) => {
            return b[key] === value
        })
}

/**
 * 11.2.2 Same as above but instead of using character counts just sort the strings
 */
export const sortAnagrams2 = (anagrams: string[]): string[] => {
    return anagrams
        .map(s => ({
            originalString: s,
            sortedString: s.split('').sort((a, b) => a.localeCompare(b)).join('')
        }))
        .sort((a, b) => a.sortedString.localeCompare(b.sortedString))
        .map(x => x.originalString)
}

/**
 * 11.2.3 Same as above, but use map for all anagrams instead of sorting larger array
 */
export const sortAnagrams3 = (anagrams: string[]): string[] => {
    return Array.from(anagrams
        .map(s => ({
            originalString: s,
            sortedString: s.split('').sort((a, b) => a.localeCompare(b)).join('')
        }))
        .reduce((map, x) => {
            const strings = map.has(x.sortedString)
                ? [...map.get(x.sortedString)!, x.originalString]
                : [x.originalString]

            map.set(x.sortedString, strings)
            return map
        }, new Map<string, string[]>())
        .values())
        .reduce((a, b) => [...a, ...b])
}

/**
 * 11.3 Given array of sorted integers which has been rotated, find index of value
 */
export const findRotated = (numbers: number[], value: number, min: number = 0, max: number = numbers.length - 1): number | undefined => {
    if (numbers === null || numbers.length === 0) {
        return undefined
    }

    if (min > max) {
        return undefined
    }

    const midIndex = Math.floor((min + max) / 2)
    const midValue = numbers[midIndex]

    if (midValue === value) {
        return midIndex
    }

    const minValue = numbers[min]
    const maxValue = numbers[max]

    const searchLeft = () => findRotated(numbers, value, min, midIndex)
    const searchRight = () => findRotated(numbers, value, midIndex + 1, max)

    // If left side is sorted
    if (minValue < midValue) {
        // If value is within sorted area
        if (minValue <= value && value < midValue) {
            return searchLeft()
        }
        // Right side contains rotation and might contain value
        else {
            return searchRight()
        }
    }
    // Right side must be sorted
    else if (midValue < maxValue) {
        // If value is within sorted area
        if (midValue < value && value <= maxValue) {
            return searchRight()
        }
        else {
            return searchLeft()
        }
    }
    else if (minValue === midValue) {
        if (midValue !== maxValue) {
            return searchRight()
        }
        else {
            const leftResult = searchLeft()
            return (leftResult !== -1)
                ? leftResult
                : searchRight()
        }
    }

    return undefined
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

    if (min > max) {
        return undefined
    }

    let compareIndex = Math.floor((max + min) / 2)
    let compareValue = strings[compareIndex]
    let imin = compareIndex - 1
    let imax = compareIndex + 1

    // Expand outwards from midpoint until one of the ends reachs non-empty string and use that as compare value
    while (compareValue === "") {
        // If both indexes have moved past end of range, entire thing is empty strings
        if (imin < min && imax > max) {
            return undefined
        }

        if (imin >= min && strings[imin] !== "") {
            compareIndex = imin
            break
        }
        imin--

        if (imax <= max && strings[imax] !== "") {
            compareIndex = imax
            break
        }
        imax++
    }

    compareValue = strings[compareIndex]
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