export function binarySearch<T>(xs: T[], x: T, min = 0, max = xs.length - 1): number {
    if (min > max) {
        return -1
    }

    const mid = min + Math.floor((max - min) / 2)
    if (xs[mid] === x) {
        return mid
    }

    if (x < xs[mid]) {
        return binarySearch(xs, x, min, mid - 1)
    }
    else {
        return binarySearch(xs, x, mid + 1, max)
    }
}
