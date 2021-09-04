import debug from 'debug'

const logger = debug('arrays:finddistinct')

/**
 * Given two sorted arrays
 * return array with the distinct elements between the both of them.
 */
export const findDistinct = (as: number[], bs: number[]): number[] => {
    let i = 0
    let j = 0
    let distinct: number[] = []
    logger(as)
    logger(bs)

    while (i < as.length
        || j < bs.length) {
        let iValue = as[i]
        let jValue = bs[j]

        if (iValue < jValue) {
            tryPush(distinct, iValue)
            i++
        }
        else if (jValue < iValue) {
            tryPush(distinct, jValue)
            j++
        }
        // Values must be equal so it doesn't matter which we push, but increment both indices
        else {
            tryPush(distinct, jValue)
            i++
            j++
        }

        logger(distinct, i, j)
    }

    return distinct
}

const tryPush = (xs: number[], n: number): void => {
    let last: number | null = null

    if (xs.length > 0) {
        last = xs[xs.length - 1]
    }

    if (last !== n) {
        xs.push(n)
    }
}