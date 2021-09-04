/** https://www.codechef.com/problems/COINS */

export function coinsToDollars(n: number): number {
    const n2 = Math.floor(n / 2)
    const n3 = Math.floor(n / 3)
    const n4 = Math.floor(n / 4)
    const dollars = n2 + n3 + n4

    return Math.max(n, dollars)
}