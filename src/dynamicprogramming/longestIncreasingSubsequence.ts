/**
 * Longest Increasing Subsequence (LIS) Problem
 *
 * For a given array of integers, find the length of the longest subsequence such that all elements of the subsequence are sorted in increasing order.
 */

export function longestIncreasingSubsequence(array: number[]): number {
    // If the array is empty, return 0
    if (array.length === 0) {
        return 0
    }

    const indexToSmallerIndices = new Map<number, number[]>()

    // For each element in the array,
    // find all the indices of elements that are smaller than it which those can be part of the increasing subsequence
    for (let i = 0; i < array.length; i += 1) {
        indexToSmallerIndices.set(i, [])

        for (let j = 0; j < i; j++) {
            if (array[j] < array[i]) {
                indexToSmallerIndices.get(i)!.push(j)
            }
        }
    }

    // For each element in the array,
    // find the longest increasing subsequence that ends with it
    const longestIncreasingSubsequence = new Array(array.length).fill(1)
    for (let i = 0; i < array.length; i += 1) {
        for (const j of indexToSmallerIndices.get(i)!) {
            longestIncreasingSubsequence[i] = Math.max(longestIncreasingSubsequence[i],longestIncreasingSubsequence[j] + 1)
        }
    }

    // Return the length of the longest increasing subsequence
    return Math.max(...longestIncreasingSubsequence)
}
