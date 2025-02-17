import { minCostClimbingStairs } from "./minCostClimbingStairs"

describe('Minimum Cost Climbing Stairs', () => {
    test('Given an empty array, return 0', () => {
        expect(minCostClimbingStairs([])).toEqual(0)
    })

    test('Given stairs with one step, return the cost of that step', () => {
        expect(minCostClimbingStairs([10])).toEqual(10)
    })

    test('Given stairs with two steps, return the minimum cost of the two steps', () => {
        expect(minCostClimbingStairs([10, 15])).toEqual(15)
    })

    test('Given stairs with three steps, return the minimum cost to reach the top', () => {
        expect(minCostClimbingStairs([10, 0, 20])).toEqual(20)
    })

    test('Given stairs with four steps, return the minimum cost to reach the top', () => {
        expect(minCostClimbingStairs([1, 2, 1, -1, 4])).toEqual(5)
    })
})
