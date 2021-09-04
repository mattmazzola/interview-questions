/**
 * Given string get all words that may be intended if you include permutations of nearby letters
 */

const nearByCharacterMap: { [x: string]: string[] } = {
    'g': ['f', 'g', 'h'],
    'i': ['u', 'i', 'o']
}


const nearByCharacters = (c: string): string[] => {
    const nearBy = nearByCharacterMap[c]

    return nearBy ? nearBy : [c]
}

const getPermutations = (xs: string[][]): string[] => {
    if (!Array.isArray(xs)) {
        return []
    }

    if (xs.length === 1) {
        return xs[0]
    }

    const [head, ...tail] = xs

    return head
        .map(c => getPermutations(tail).map(permutation => c + permutation))
        .reduce((a, b) => a.concat(b), [])
}

const words: string[] = [
    'go',
    'hi'
]

const isWord = (s: string): boolean => {
    return (words.indexOf(s) !== -1)
}

export const nearByWords = (s: string): string[] => {
    if (!s || s.length <= 0) {
        return []
    }

    const characterSets = s
        .split('')
        .map(nearByCharacters)

    const permutations = getPermutations(characterSets)

    return permutations
        .filter(isWord)
}