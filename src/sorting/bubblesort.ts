export const bubbleSort = (ns: number[]): number[] => {
    const numbers = ns.slice()

    for (let i = numbers.length - 1; i >= 0; i--) {
        for (let j = 0; j <= i; j++) {
            if (j < numbers.length - 1) {
                if (numbers[j] > numbers[j + 1]) {
                    const temp = numbers[j + 1]
                    numbers[j + 1] = numbers[j]
                    numbers[j] = temp
                }
            }
        }
    }

    return numbers
}