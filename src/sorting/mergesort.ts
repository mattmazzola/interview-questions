export const mergeSort = (xs: number[]): number[] => {
    if (xs.length <= 1) {
        return xs
    }

    const mid = Math.floor(xs.length / 2)
    const left = mergeSort(xs.slice(0, mid))
    const right = mergeSort(xs.slice(mid))

    return merge(left, right)
}

export const merge = (xs: number[], ys: number[]): number[] => {
    const merged: number[] = []
    
    let ix = 0
    let iy = 0
    while (ix < xs.length && iy < ys.length) {
        if (xs[ix] > ys[iy]) {
            merged.push(ys[iy])
            iy++
        }
        else {
            merged.push(xs[ix])
            ix++
        }
    }

    if (ix < xs.length) {
        merged.push(...xs.slice(ix))
    }
    else if (iy < ys.length) {
        merged.push(...ys.slice(iy))
    }

    return merged
}