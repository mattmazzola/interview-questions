export const fizzBuzz = (max: number = 100): (number | string)[] => {
    const numbers: (number | string)[] = []

    for(let i = 1; i <= max; i++) {
        if (i % 15 === 0) {
            numbers.push('fizzbuzz')
        }
        else if (i % 3 === 0) {
            numbers.push('fizz')
        }
        else if (i % 5 === 0) {
            numbers.push('buzz')
        }
        else {
            numbers.push(i)
        }
    }

    return numbers
}