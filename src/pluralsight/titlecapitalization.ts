const lowerCaseWords = [
    'a',
    'the',
    'to',
    'at',
    'in',
    'with',
    'and',
    'but',
    'or'
]

export const titleCapitalize = (title: string): string => {
    
    return title
        .toLowerCase()
        .split(' ')
        .map((word, i, xs) => {
            if (i == 0 || i == xs.length - 1 || lowerCaseWords.indexOf(word) === -1) {
                return capitalize(word)
            }

            return word
        })
        .join(' ')
}

const capitalize = (word: string): string => {
    return word.substring(0,1).toUpperCase() + word.substring(1).toLowerCase()
}