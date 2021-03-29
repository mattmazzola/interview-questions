
/**
 * Given string and pattern
 * if order of characters in pattern occurs within the string.
 * Any characters NOT respecting the order given 
 */
export function patternOrder(s: string, pattern: string): boolean {
    if (!s || !pattern) {
        return false
    }

    const chars = s.split('')
    const patternChars = pattern.split('')
    const patternSet = new Set([...patternChars])

    let expectedPatternIndex = 0

    for (const char of chars) {

        // If character is in pattern
        if (patternSet.has(char)) {
            if (expectedPatternIndex > pattern.length - 1) {
                return false
            }

            const expectedChar = patternChars[expectedPatternIndex]
            // If we found character in pattern, but not expected character then string is not following pattern order
            if (char !== expectedChar) {
                return false
            }

            // Increase index for next expected character
            expectedPatternIndex += 1
        }

    }

    return true
}