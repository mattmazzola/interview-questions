/** https://www.codewars.com/kata/regular-expression-check-if-divisible-by-0b111-7?utm_source=newsletter */

/**
 * 1    7   0111
 * 2    14  1110
 * 3    21  00010101
 * 4    28  00011100
 * 5    35  00100011
 * 6    42  00101010
 * 7    49  00110001
 * 8    56  00111000
 * 9    63  00111111
 * 10   70  01000110
 * 11   77  01001101
 * 12   84  01010100
 * 13   91  01011011
 * 14   98  01100010
 */
export function divisibleBySeven (s: string): boolean {
    if (s === '') {
        return false
    }

    if (!/^([01]$)/.test(s)) {
        return false
    }

    if (s === '0') {
        return false
    }

    s = s.trim()

    const n = parseInt(s, 2)
    const divs = n % 7 === 0 

    return divs
}