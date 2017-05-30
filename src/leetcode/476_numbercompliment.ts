export const findComplement = (x: number) => {
    // 5 => [1,0,1]
    const binary = convertTo(x, 2)
    // 101 => 010
    const complimented = binary.map(b => b === 0 ? 1 : 0)
    // [0,1,0] => 1 * 2 ^ 1
    const value = complimented.reduce((a, b, i, xs) => {
        a += b * Math.pow(2, i)
        return a
    }, 0)

    return value
}

const convertTo = (x: number, base: number = 2): number[] => {
    let values: number[] = []
    let quotient = x

    while(quotient > 0) {
        const remainder = quotient % base
        quotient = Math.floor(quotient / base)
        values.push(remainder)
    }

    return values
}