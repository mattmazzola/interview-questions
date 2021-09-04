export const insertionSortInplace = (numbers: number[]): number[] => {
    numbers = [...numbers]

    for (let i = 1; i < numbers.length; i++) {
        let number = numbers[i]
        let j = i - 1

        while (j >= 0 && numbers[j] > number) {
            numbers[j + 1] = numbers[j]
            j--
        }

        numbers[j + 1] = number
    }

    return numbers
}

export const insertionSort = (numbers: number[]): number[] => {
    if (numbers.length <= 1) {
        return numbers
    }

    const first = numbers[0]
    const tail = numbers.slice(1)
    const sorted: number[] = [first]

    while (tail.length > 0) {
        const number = tail.pop()!

        let j = 0
        while (j < sorted.length && sorted[j] < number) {
            j++
        }

        sorted.splice(j, 0, number)
    }

    return sorted
}