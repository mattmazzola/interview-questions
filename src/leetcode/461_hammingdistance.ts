export const hammingDistance = (x: number, y: number) => {
    const base = 2
    let xRemainder = x
    let yRemainder = y
    let numDifferences = 0

    while (xRemainder > 0 || yRemainder > 0) {
        const xR = xRemainder % base
        const yR = yRemainder % base

        if (xR != yR) {
            numDifferences++
        }

        xRemainder = Math.floor(xRemainder / base)
        yRemainder = Math.floor(yRemainder / base)
    }

    return numDifferences
}