/**
 * Given an integer n, return true if it is a perfect square, otherwise false.
 * A perfect square is an integer that is the square of an integer.
 */
export function isPerfectSquare(n: number): boolean {
    if (n < 2) {
        return true
    }

    let min = 1
    let max = n

    while (min < max) {
        let mid = Math.floor((min + max) / 2)
        let square = mid * mid
        if (square === n) {
            return true
        } else if (square < n) {
            min = mid + 1
        } else {
            max = mid
        }
    }

    return false

}
