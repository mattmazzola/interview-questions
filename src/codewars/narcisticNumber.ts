/** Return true if digits of a number to the power equal to lengh of number sum is equal to origial number */
/** https://www.codewars.com/kata/narcissistic-numbers */

export default function isNarcisticNumber(n: number): boolean {
    const digits = n.toString()
        .split('')
        .map(stringDigit => parseInt(stringDigit, 10))

    const power = digits.length
    const total = digits.reduce((sum, digit) => sum + Math.pow(digit, power), 0)
    const isNarcisticNumber = total === n

    return isNarcisticNumber
}