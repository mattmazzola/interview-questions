/** https://www.codewars.com/kata/prime-streaming-pg-13?utm_source=newsletter */

export function *generatePrimes (limit: number = 100): IterableIterator<number> {
    yield 2
    yield 3

    let number = 4
    while (number < limit) {
        const isPrime = getPrime(number)
        if (isPrime) {
            yield number
        }

        number++
    }

    return number
}

export function getPrimes (limit: number = 100): number[] {
    return [...generatePrimes(limit)]
}

/**
 * Return true if number is prime false otherwise
 * @param n Number
 */
export function getPrime (n: number): boolean {
    if (n % 2 === 0) {
        return false
    }
    
    const possibleDivisors = Array.from(Array(n), (_, i) => i + 1).slice(1, -1)
    // console.log(`possibleDivisors: `, possibleDivisors)
    return possibleDivisors
        .every(i => {
            const div = n / i
            const divFloor = Math.floor(n / i)

            // console.log(`${i}: `, div, divFloor)
            if (div !== divFloor) {
                return true
            }

            return false
        })
}