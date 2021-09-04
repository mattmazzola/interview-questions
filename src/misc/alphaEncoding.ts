/** https://www.spoj.com/problems/ACODE/ */
/** Decode a given phrase by converting to numerical ascii value and return all the possible original phrases */

export function encode(s: string): number {
    const n = s.split('')
        .map(c => convertStringToAsciiNumber(c).toString())
        .join('')

    return parseInt(n, 10)
}

const max = 26
export function decode(x: number): string[] {
    // console.log("- start: ", x)
    if (x < 11) {
        const r = [convertNumberToString(x)]
        // console.log("under 11: ", r)
        return r
    }

    const xs = x.toString()
        .split('')
        .map(c => parseInt(c, 10))

    const firstNumber = xs[0]
    // console.log("firstNumber: ", firstNumber)
    const afterFirst = convertListOfNumbersToNumber(xs.slice(1))
    // console.log("afterFirst: ", afterFirst)

    const firstStrings = decode(afterFirst)
        .map(s => convertNumberToString(firstNumber) + s)

    let phrases = [...firstStrings]

    const doubleDigitNumber = convertListOfNumbersToNumber(xs.slice(0, 2))
    if (doubleDigitNumber <= max) {
        const remaning = xs.slice(2)
        // console.log("under max: ", x, "remaning: ", remaning, "doubleDigit: ", doubleDigitNumber)
        if (remaning.length <= 0) {
            phrases = [...phrases, convertNumberToString(doubleDigitNumber)]
        }
        else {
            const afterDoubleDigitNumber = convertListOfNumbersToNumber(remaning)
            // console.log("afterDoubleDigitNumber: ", afterDoubleDigitNumber)

            const secondStrings = decode(afterDoubleDigitNumber)
                .map(s => convertNumberToString(doubleDigitNumber) + s)

            phrases = [...phrases, ...secondStrings]
        }
    }

    // console.log("phrases: ", phrases)

    return phrases
}

export function convertListOfNumbersToNumber(xs: number[]): number {
    // console.log("convert: ", xs)
    return parseInt(xs.map(x => x.toString()).join(''), 10)
}

export function convertStringToAsciiNumber(c: string): number {
    return c.toUpperCase().charCodeAt(0) - 64
}

export function convertNumberToString(n: number): string {
    return String.fromCharCode(n + 64)
}