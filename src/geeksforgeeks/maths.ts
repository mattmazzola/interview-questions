export const recursiveSequence = (n: number): number => {
    if (n === 1) {
        return 1
    }

    const maxNumber = getMax(n)
    const value = Array.apply(null, new Array(n))
        .map((x: any, i: number) => maxNumber - i)
        .reduce((a: number, b: number) => a * b)

    return value + recursiveSequence(n - 1)
}

const getMax = (n: number): number => {
    let max = 0
    let m = n
    while (m > 0) {
        max += m--
    }

    return max
}

export const numberGame = (n: number): number => {
    const values = (<number[]>Array.apply(null, new Array(n)))
        .map((x,i) => i + 1)

    const commonDemoninator = values.reduce((a,b) => a * b)

    let i = 0
    for(i = 1; i <= commonDemoninator; i++) {
        if (values.every(value => (i % value) === 0)) {
            break
        }
    }

    return i
}

export const fillArrayBy1s = (xs: number[]): number => {
    if (xs.length === 0) {
        return 0
    }

    const maxLengthOfSequential0s = xs.reduce((max, x) => {
        if (x === 0) {
            max++
        }
        else {
            max = 0
        }

        return max
    }, 0)

    return Math.ceil(maxLengthOfSequential0s / 2)
}

export const validateTrack = (track: number[]): boolean => {
    return (track.length >= 3) && hasEqualBalanceOf(track) && has1asMid(track) && hasEqualDistantTracks(track)
}

const has1asMid = (xs: number[]): boolean => {
    if (xs.length === 1) {
        return false
    }

    const mid = Math.floor(xs.length / 2)
    return xs[mid] === 1
}

const hasEqualBalanceOf = (xs: number[]): boolean => {
    return (xs.length % 2) === 1
}

const hasEqualDistantTracks = (xs: number[]): boolean => {
    const mid = Math.floor(xs.length / 2)
    const expectedChange = (xs[0] - 1)/mid

    return xs.every((x, i, ys) => {
        if (i === ys.length - 1) {
            return true
        }
        else if (i < mid) {
            return (x - ys[i+1]) === expectedChange
        }
        
        return (ys[i+1] - x) === expectedChange
    })
}
