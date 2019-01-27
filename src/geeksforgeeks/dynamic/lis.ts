/** https://www.geeksforgeeks.org/longest-increasing-subsequence-dp-3/ */

export function lisNumber (numbers: number[]): number {
    if (numbers.length <= 1) {
        return 1
    }

    return numbers.reduce((max, _, i) => {
        return Math.max(max, lisNumber(numbers.slice(i + 1)))
    }, 0)
}


export function lis (numbers: number[]): number[][] {
    console.log("lis: ", numbers)
    if (numbers.length <= 1) {
        return [numbers]
    }

    const terms: number[][] = []
    for (let j = 0; j < numbers.length - 1; j++) {
        const number = numbers[j]
        terms.push([number])
        const lis2 = lis(numbers.slice(j + 1))

        terms.concat(lis2.map(xs => {
            const first = xs[0]
            return number < first
                ? [number, ...xs]
                : xs
        }))
    }

    console.log("lis ret: ", terms)
    return terms
}

export function lisTab (numbers: number[]): number {
    
    const lis = Array(numbers.length).fill(0)
    console.log("numbers: ", numbers)
    console.log("lis: ", lis)
    lis[0] = 1

    for (let i = 1; i < numbers.length; i++) {
        let max = 1
        for (let j = i; j < numbers.length; j++) {
            max = Math.max(max, lis[j])
        }

        lis[i] = max
        console.log(`lis[${i}] = ${max}`)
    }

    return lis.reduce((max, value) => {
        return Math.max(max, value)
    }, 1)
}