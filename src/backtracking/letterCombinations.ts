const digitToLetters: { [key: string]: string } = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz',
}

export function letterCombinationsRecursive(digits: string): string[] {
    if (!digits) {
        return []
    }

    const results: string[] = []

    function backtrack(combination: string, nextDigits: string) {
        if (nextDigits.length == 0) {
            results.push(combination)
        }
        else {
            for (const letter of digitToLetters[nextDigits[0]]) {
                backtrack(combination + letter, nextDigits.slice(1))
            }
        }
    }

    // Start backtracking with empty combination and the full digit string
    backtrack("", digits)

    return results
}

export function letterCombinations(digits: string): string[] {
    if (!digits) {
        return []
    }

    const results: string[] = []
    const stack: {
        combination: string,
        nextDigits: string
    }[] = [{ combination: "", nextDigits: digits }]

    while (stack.length > 0) {
        const { combination, nextDigits } = stack.shift()!

        // If there are no digits left, we have reached end, add the combination
        if (nextDigits.length === 0) {
            results.push(combination)
        }
        else {
            for (const letter of digitToLetters[nextDigits[0]]) {
                stack.push({
                    combination: combination + letter,
                    nextDigits: nextDigits.slice(1)
                })
            }
        }
    }

    return results
}
