/** https://www.codewars.com/kata/scramblies?utm_source=newsletter */
export function scrambles (s1: string, s2: string): boolean {
    const characterCountsS1 = getCharacterCounts(s1)
    const characterCountsS2 = getCharacterCounts(s2)

    return Object.entries(characterCountsS2).every(([c, count]) => {
        return characterCountsS1[c] >= count
    })
}

export function getCharacterCounts (s: string): { [s: string]: number } {
    return s
        .split('')
        .reduce((characters, c) => {
            if (!characters[c]) {
                characters[c] = 0
            }
            else {
                characters[c] += 1
            }

            return characters
        }, {} as { [s: string]: number })
}