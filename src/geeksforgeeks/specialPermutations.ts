/** Get permutations where no number can be in original position */
/** https://www.geeksforgeeks.org/count-derangements-permutation-such-that-no-element-appears-in-its-original-position/ */
export function specialPermutations (xs: number[]): number {
    if (xs.length <= 1) {
        console.log("xs: ", xs)
        return 1
    }

    const [first, ...rest] = xs

    return rest.reduce((sum, nextNum) => {
        const remaining = [first, ...rest.filter(x => x !== nextNum)]
        console.log("xs: ", xs, "first: ", first, "num: ", nextNum, "remaining: ", remaining)
        return sum += permutations(remaining)
    }, 0)
}

export function permutations (xs: number[]): number {
    if (xs.length <= 1) {
        return 1
    }

    return xs.reduce((total, num) => {
        const others = xs.filter(x => x !== num)

        return total += permutations(others)
    }, 0)
}