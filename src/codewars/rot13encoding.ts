/** https://en.wikipedia.org/wiki/ROT13 */
export function rot13 (s: string): string {
    const aCode = 'a'.charCodeAt(0)
    const zCode = 'z'.charCodeAt(0)

    return s.split('')
        .map(c => {
            if (c === ' ') {
                return c
            }

            const lowerC = c.toLocaleLowerCase()
            const lowerCode = lowerC.charCodeAt(0)
            const isLower = c === lowerC

            if (lowerCode < aCode || lowerCode > zCode) {
                return c
            }

            let newCode = lowerCode + 13
            if (newCode > zCode) {
                newCode = newCode - (zCode +1 - aCode)
            }

            const newC = String.fromCharCode(newCode)
            const newCasedC = isLower
                ? newC
                : newC.toLocaleUpperCase()
            
            return newCasedC
        })
        .join('')
}
