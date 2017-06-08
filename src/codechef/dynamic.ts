/**
 * Minimum steps to one, Given number N and 3 possible operations, divide by 2, divide by 3, or subtract 1, give minimum possible 
 */
export const minimumStepsToOne = (n: number, cache: number[] = Array.apply(null, new Array(n))): number => {
    if (n === 1) {
        return 0
    }

    if (cache[n]) {
        return cache[n]
    }

    const possibleSolutions: number[] = []

    if (n % 2 === 0) {
        possibleSolutions.push(minimumStepsToOne(n/2, cache))
    }
    if (n % 3 === 0) {
        possibleSolutions.push(minimumStepsToOne(n/3, cache))
    }

    possibleSolutions.push(minimumStepsToOne(n - 1, cache))

    const bestSolution = Math.min(...possibleSolutions)

    return cache[n] = 1 + bestSolution
}

export const minimumStepsToOneDp = (n: number): number => {
    const cache: number[] = Array.apply(null, new Array(n+1))

    cache[1] = 0

    for(let i = 2; i <= n; i++) {
        cache[i] = 1 + cache[i - 1]
        if (n % 2 === 0) {
            cache[i] = Math.min(cache[i], 1 + minimumStepsToOne(n/2))
        }
        if (n % 3 === 0) {
            cache[i] = Math.min(cache[i], 1 + minimumStepsToOne(n/3))
        }
    }

    return cache[n]
}

export const longestIncreasingSubsequenceDp = (xs: number[]): number => {
    const cache: number[] = Array.apply(null, new Array(xs.length)).map((x: any) => 1)

    let j = 0, i = 1

    for (i = 1; i < xs.length; i++) {
        for (j = 0; j < i; j++) {
            // If element at i is greater than element at j we have addition to existing sequence
            if (xs[i] > xs[j]) {
                cache[i] = Math.max(cache[i], cache[j] + 1)
            }
        }
    }

    let maxLength = 1
    for (let k = 0; k < cache.length; k++) {
        maxLength = Math.max(maxLength, cache[k])
    }

    return maxLength
}


