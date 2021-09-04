/** https://www.codewars.com/kata/parseint-reloaded?utm_source=newsletter  */

export type IStringNumber = { [s: string]: number }
export const numbers: IStringNumber = {
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'ten': 10,
    'eleven': 11,
    'twelve': 12,
    'thirteen': 13,
    'fourteen': 14,
    'fifteen': 15,
    'sixteen': 16,
    'seventeen': 17,
    'eighteen': 18,
    'nineteen': 19,
    'twenty': 20
}

export const tens: IStringNumber = {
    'thirty': 30,
    'fourty': 40,
    'fifty': 50,
    'sixty': 60,
    'seventy': 70,
    'eighty': 80,
    'ninety': 90,
}

export const powers: IStringNumber = {
    'hundred': Math.pow(10, 2),
    'thousand': Math.pow(10, 3),
    'million': Math.pow(10, 6)
}

export function parseStringInts(s: string): number {
    let stringNumbers: string[] = s.includes(' ')
        ? s.split(' ')
            .filter(word => word !== 'and')
        : [s]

    // Split hyphenated words
    stringNumbers = stringNumbers
        .map(word => word.split('-'))
        .reduce((flat, words) => [...flat, ...words])

    console.log("numbers: ", stringNumbers)

    return stringNumbers.reduceRight((total, word) => {
        let n = 0

        console.log("word: ", word)
        if (numbers[word]) {
            n = numbers[word]
        }
        else if (tens[word]) {
            n = tens[word]
        }
        else if (powers[word]) {
            n = powers[word]
        }

        return total += n
    }, 0)
}