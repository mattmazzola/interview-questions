/** https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/ */
export default function lcs (a: string, b: string): string | null {
    return lcsInternal(a, b)
        .reduce<string>((max, lcs) => {
            if (lcs.length > max.length) {
                max = lcs
            }
            
            return max
        }, "")
}

export function lcsInternal (a: string, b: string): string[] {
    // console.log("a: ", a)
    // console.log("b: ", b)

    if (a.length === 0 || b.length === 0) {
        return []
    }

    const aLast = a[a.length - 1]
    const bLast = b[b.length - 1]
    const aMinusLast = a.slice(0, a.length - 1)
    const bMinusLast = b.slice(0, b.length - 1)

    let result = []
    if (aLast === bLast) {
        const result2 = lcsInternal(
            aMinusLast,
            bMinusLast
        )
        
        result = [
            ...result2,
            ...result2.map(s => `${s}${aLast}`),
            aLast
        ]
    }
    else {
        result = [
            ...lcsInternal(aMinusLast, b),
            ...lcsInternal(a, bMinusLast)
        ]
    }

    // console.log("result: ", result)
    return result
}

export function lcs2 (a: string, b: string): number {
    // console.log("a: ", a)
    // console.log("b: ", b)

    if (a.length === 0 || b.length === 0) {
        return 0
    }
    else {
        const lastA = a[a.length - 1]
        const lastB = b[b.length - 1]
        const newA = a.slice(0, a.length - 1)
        const newB = b.slice(0, b.length - 1)

        if (lastA === lastB) {
            // console.log(`1 + lcs2(${newA}, ${newB})`)
            return 1 + lcs2(newA, newB)
        }
        else {
            return Math.max(
                lcs2(a, newB),
                lcs2(newA, b)
            )
        }
    }
}

export function lcs3 (a: string, b: string): number {
    const matrix: number[][] = Array.from(Array(a.length + 1), () => Array(b.length + 1).fill(0))
    // console.log("a ", a)
    // console.log("b ", b)
    // console.log("start: ", matrix)

    for (let i = 0; i <= a.length; i++) {
        for (let j = 0; j <= b.length; j++) {
            // console.log("i: ", i)
            // console.log("j: ", j)
            if (i === 0 || j === 0) {
                // console.log("i or j === 0")
                matrix[i][j] = 0
            }
            else if (a[i - 1] === b[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1] + 1
                // console.log(`${a[i - 1]} === ${b[j - 1]}`)
                // console.log(`${matrix[i][j]}`)
            }
            else {
                const a1 = matrix[i][j - 1]
                const b1 = matrix[i - 1][j]
                matrix[i][j] = Math.max(
                    a1,
                    b1
                )
                // console.log(`Math.max(${a1}, ${b1}) = ${matrix[i][j]}`)
            }
            // console.log("result: ", matrix[i][j])
        }
    }
    // console.log("matrix: ", matrix)

    return matrix[a.length][b.length]
}

export function memoize (f: Function): Function {
    const cache: any = {}

    return (...args: string[]) => {
        const serializedArgs = JSON.stringify(args)
        if (cache[serializedArgs]) {
            return cache[serializedArgs]
        }

        return cache[serializedArgs] = f(...args)
    }
}