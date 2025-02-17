/**
 * You are given integer array cost where cost[i] is the cost of ith step on a staircase.
 * Once you pay the cost, you can either climb one or two steps.
 *
 * You can either start from the step with index 0, or the step with index 1.
 *
 * Return the minimum cost to reach the top of the floor.
 */

export function minCostClimbingStairs(cost: number[]): number {
    // Initialize dynamic programming array, minimum cost per stair
    const dp = Array.from<number>({ length: cost.length }).fill(0)

    // Base cases
    dp[0] = cost[0]
    dp[1] = cost[1]

    // Fill in the dp array
    for (let i = 2; i < cost.length; i++) {
        dp[i] = cost[i] + Math.min(dp[i - 1], dp[i - 2])
    }

    // Return the minimum cost to reach the top
    return Math.min(dp[cost.length - 1], dp[cost.length - 2])
}
