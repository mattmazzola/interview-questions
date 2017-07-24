export const quickSort = (xs: number[], l: number = 0, r: number = xs.length - 1): number[] => {
    if (xs.length <= 1) {
        return xs
    }

    const [i,j] = partition(xs, l, r)

    if (l < j) {
        quickSort(xs, l, j)
    }

    if (i < r) {
        quickSort(xs, i, r)
    }
    
    return xs
}

const partition = (xs: number[], l: number, r: number) => {
    const pivot = xs[Math.floor((r + l) / 2)]
    
    while (l <= r) {
        while (xs[l] < pivot) {
            l++
        }
        while (xs[r] > pivot) {
            r--
        }

        if (l <= r) {
            [xs[l], xs[r]] = [xs[r], xs[l]]
            l++
            r--
        }
    }

    return [l,r]
}

const swap = (xs: number[], i: number, j: number) => {
    [xs[j], xs[i]] = [xs[i], xs[j]]
}

export const quickSortNoSwap = (xs: number[]): number[] => {
    if (xs.length <= 1) {
        return xs
    }

    const [pivot, ...tail] = xs
    const smaller = tail.filter(x => x < pivot)
    const larger = tail.filter(x => x > pivot)

    return [...quickSortNoSwap(smaller), pivot, ...quickSortNoSwap(larger)]
}