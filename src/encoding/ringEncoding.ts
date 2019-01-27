

const aCode = 'a'.charCodeAt(0)
const zCode = 'z'.charCodeAt(0)

export function decodeLetter (start: string, offset: number): string {
    if (start.length !== 1) {
        throw new Error(`start letter must be a single character. You passed: ${start}`)
    }

    const startCode = start.toLocaleLowerCase().charCodeAt(0)
    if (startCode > zCode) {
        throw new Error(`Starting character is not a letter. You passed: ${startCode}`)
    }

    let newLetterCode = startCode + offset
    if (newLetterCode > zCode) {
        newLetterCode = newLetterCode - (zCode - aCode + 1)
    }

    return String.fromCharCode(newLetterCode)
}

export type IEncoding = (string | number)[]

export function decode (encoding: IEncoding): string {
    return encoding.reduce((a, next) => {
        if (typeof next === 'string') {
            a.s += next
            return a
        }

        const letter = decodeLetter(a.prevChar, next)
        a.s += letter
        a.prevChar = letter
        return a
    }, { s: '', prevChar: 'a' }).s
}

export function encodeLetter (letter: string, previousLetter: string = 'a'): number {
    if (letter.length !== 1) {
        throw new Error(`Letter must be single character. You provided: ${letter}`)
    }
    if (previousLetter.length !== 1) {
        throw new Error(`Prevous letter must be single character. You provided: ${previousLetter}`)
    }

    const prevCode = previousLetter.toLowerCase().charCodeAt(0)
    const nextCode = letter.toLowerCase().charCodeAt(0)

    let number = nextCode - prevCode
    if (number <= 0) {
        number += zCode - aCode + 1
    }

    return number
}

export function encode (phrase: string): IEncoding {
    let previousLetter: string = 'a'
    return phrase.split('')
        .map(c => {
            const charCode = c.toLocaleLowerCase().charCodeAt(0)
            if (charCode < aCode || zCode < charCode) {
                return c
            }

            const letterOffset = encodeLetter(c, previousLetter)
            previousLetter = c
            return letterOffset
        })
}

export function wordWrap (xs: (string | number)[]): string{
    return xs.reduce((result, c) => {
        let s = typeof c === 'number' && result.rowLength !== 0 && result.last !== ' '
            ? `${result.s},${c}`
            : `${result.s}${c}`
        let rowLength = result.rowLength + 1
        if (rowLength > 25 && c === ' ') {
            s = `${s}\n`
            rowLength = 0
        }
        return {
            s,
            rowLength,
            last: c
        }
    }, {
        s: '',
        rowLength: 0,
        last: <string | number>''
    }).s
}