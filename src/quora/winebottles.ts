/**
 * https://www.quora.com/Are-there-any-good-resources-or-tutorials-for-dynamic-programming-besides-the-TopCoder-tutorial
 */

export const profit = (bottles: number[], year: number = 1, start: number = 0, end: number = bottles.length - 1): number => {
    if (start > end) {
        return 0
    }

    const profitIfLeftSold = (bottles[start] * year) + profit(bottles, year + 1, start + 1, end)
    const profitIfRightSold = profit(bottles, year + 1, start, end - 1) + (bottles[end] * year)

    return Math.max(profitIfLeftSold, profitIfRightSold)
}

export const profit2 = (bottles: number[], start: number = 0, end: number = bottles.length - 1, cache: number[][]): number => {
    if (start > end) {
        return 0
    }

    if (cache[start][end] !== -1) {
        return cache[start][end]
    }

    const year = bottles.length - (end - start + 1) + 1
    const profitIfLeftSold = (bottles[start] * year) + profit2(bottles, start + 1, end, cache)
    const profitIfRightSold = profit2(bottles, start, end - 1, cache) + (bottles[end] * year)

    cache[start][end] = Math.max(profitIfLeftSold, profitIfRightSold)

    return cache[start][end]
}