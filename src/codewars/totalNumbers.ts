/** https://www.codewars.com/kata/55b195a69a6cc409ba000053 */
export function totalIncDec(x: number): number {
    if (x < 0) {
        return 0
    }
    if (x === 0) {
        return 1
    }

    const max = Math.pow(10, x)
    let total = 0

    for(let i = 0; i < max; i++) {
        const result = isChanging(i, NumberType.Increasing) || isChanging(i, NumberType.Decreasing)
        if (result) {
            total += 1
        }
    }
    return total
}

export enum NumberType {
    Increasing,
    Decreasing
}

export function isChanging (x: number, type: NumberType = NumberType.Increasing) {
    const numbers = x
        .toString().split('').map(x => parseInt(x, 10))

    return numbers.every((n, i, xs) => {
        if (i === 0) {
            return true
        }

        const previous = xs[i - 1] 
        return type === NumberType.Increasing
            ? n >= previous
            : n <= previous
    })
}