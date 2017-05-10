/**
 * Given two sorted arrays
 * return array with the distinct elements between the both of them.
 */

export const findDistinct = (as: number[], bs: number[]): number[] => {
    let i = 0
    let j = 0
    let distinct: number[] = []

    while(i < as.length
        || j < bs.length)
    {
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
        else {
            tryPush(distinct, jValue)
            i++
            j++
        }
    }

    return distinct
}

const tryPush = (xs: number[], n: number): void => {
    let last:number | null = null

    if (xs.length > 0) {
        last = xs[xs.length - 1]
    }

    if (last !== n) {
        xs.push(n)
    }
}