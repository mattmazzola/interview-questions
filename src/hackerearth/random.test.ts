import { palindromePartitioning } from './random'

describe('randomquestions', () => {
    test('palindrome partitioning should return minimum number of cuts to segment string into palindromes', () => {
        expect(palindromePartitioning("aab")).toBe(1)
        expect(palindromePartitioning("abayxycelec")).toBe(2)
    })
})