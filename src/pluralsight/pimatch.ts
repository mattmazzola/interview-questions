const pi = 314
const minLength = 3
const minValue = Math.pow(10, minLength - 1)
const maxLength = 12
const maxValue = Math.pow(10, maxLength - 1)

export const piMatch = (n: number): number => {
    if (n < 100) {
        return 0
    }

    if (n > maxValue) {
        throw new Error(`Invalid number. Number must be less than 12 digits. You passed: ${n}`)
    }

    const numbers = getNumbers(n)

    const differences = numbers.reduce((sum, n) => {
        sum += n - pi
        return sum
    }, 0)

    return differences / numbers.length
}

const getNumbers = (n: number): number[] => {
    const numbers: number[] = []
    const nString = n.toString()
    
    for(let i = 0; i <= nString.length - 3; i++) {
        const number = parseInt(nString.substring(i, i+3))
        numbers.push(number)
    }

    return numbers
}

