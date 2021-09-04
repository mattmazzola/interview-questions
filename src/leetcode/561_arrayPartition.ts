/**
 * Given an array of 2n integers, your task is to group these integers into n pairs of integer, say (a1, b1), (a2, b2), ..., (an, bn) which makes sum of min(ai, bi) for all i from 1 to n as large as possible.
 */
export const arrayPartition = (xs: number[]) => {
    const sorted = xs.sort((a, b) => a - b)
    const paired = pair(sorted)

    return paired.reduce((a, b) => {
        return a + Math.min(b.a, b.b)
    }, 0)
}

const pair = (xs: number[]) => {
    const ys: { a: number, b: number }[] = []

    for (let i = 0; i < xs.length; i += 2) {
        ys.push({
            a: xs[i],
            b: xs[i + 1]
        })
    }

    return ys
}