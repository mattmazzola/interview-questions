export const travelingMonk = (c: number[], l: number[]): number => {
    let minCost = Number.MAX_VALUE

    return c.reduce((totalCost, costPerLiter, i) => {
        minCost = Math.min(minCost, costPerLiter)
        totalCost += minCost * l[i]
        return totalCost
    }, 0)
}

export const cj17 = (s: string): string => {
    let chars = s.split('')
    for (let i = 0; i < chars.length; i++) {
        const char = chars[i]
        if (char === '?') {
            let isAdjacentA = false

            // if previous character is 'a'
            if (i > 0 && chars[i - 1] === 'a') {
                isAdjacentA = true
            }

            // if next charater is 'a'
            if (i < chars.length - 1 && chars[i + 1] === 'a') {
                isAdjacentA = true
            }

            if (isAdjacentA) {
                chars[i] = 'b'
            }
            else {
                chars[i] = 'a'
            }
        }
    }

    return chars.join('')
}