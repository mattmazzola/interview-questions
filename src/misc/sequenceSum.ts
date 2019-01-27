/** https://www.youtube.com/watch?v=zKwwjAkaXLI */

export function sequenceSum (xs: number[], sum: number): boolean {
    if (sum < 0
        || xs.length === 0 && sum !== 0) {
        // console.log("ss: false")
        return false
    }
    
    if (sum === 0) {
        // console.log("ss: 0")
        return true
    }
    
    return xs.some(number => {
        const others = xs.filter(x => x !== number)
        // console.group()
        // console.log("xs: ", JSON.stringify(xs).padEnd(10, ' '), "sum: ", sum, "number: ", number, "others: ", JSON.stringify(others).padEnd(8, ' '), "newSum: ", sum - number)
        const reult = sequenceSum(others, sum - number)
        // console.groupEnd()
        return reult
    })
}

