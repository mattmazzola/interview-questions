/** https://www.codewars.com/kata/number-of-proper-fractions-with-denominator-d */
/** How many proper fractions can you make with given number as denominator? */

export function properFractions (d: number): string[] {
    if (d <= 1) {
        return []
    }

    const numerators = Array.from(new Array(d - 1), (_, i) => i + 1)

    // console.log("denom: ", d)
    return numerators
        .map(n => ({ num: n, dem: d, string: `${n}/${d}`}))
        .filter(x => gcd(x.num, x.dem) === 1)
        .map(x => x.string)
}

export function gcd (n: number, d: number): number {
    const possibleCommonDenominators = Array.from(new Array(n), (_, i) => i + 1)
    // console.log(`numbers: `, possibleCommonDenominators)
    let gcd = 1

    possibleCommonDenominators.forEach(factor => {
        const divD = d % factor
        const equalD = 0 === divD
        const divN = n % factor
        const equalN = 0 === divN
        // console.log("pair:")
        // console.log(`d ${d} / ${factor} = ${equalD}`)
        // console.log(`n ${n} / ${factor} = ${equalN}`)

        // If both numerator and denominator are whole numbers the factor is a common denominator
        if (equalD && equalN) {
            gcd = factor
        }
    })

    // console.log("n: ", n, "d: ", d, "gcd: ", gcd)

    return gcd
}