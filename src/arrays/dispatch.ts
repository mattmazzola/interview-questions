/**
 * Given N arrays return M arrys wher each array is concatenations of slices of the two
 * 
 * Input:
 * [A,B,C]
 * [D,E,F]
 * [G,H,I]
 * ..,
 * 
 * Output:
 * [A,D,E,F]
 * [A,B,D,E,F]
 * [A,B,C,D,E,F]
 * [A,G,H,I]
 * [A,B,G,H,I]
 * [A,B,C,G,H,I]
 * [D,A,B,C]
 * [D,E,A,B,C]
 * [D,E,F,A,B,C]
 * [D,G,H,I]
 * [D,E,G,H,I]
 * [D,E,F,G,H,I]
 * ...
 */

export function dispatch<T>(xs: T[][]): T[][] {
    return xs
        .flatMap((x, i, ys) => {
            const others = ys.filter((_, j) => j !== i)
            return others
                .flatMap((other) => {
                    // for each item in array
                    return x.map((_, k) => {
                        // slice array until item
                        const first = x.slice(0, k + 1)
                        const second = other
                        return [...first, ...second]
                    })
                })
        })
}