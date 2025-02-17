import { letterCombinations, letterCombinationsRecursive } from './letterCombinations'

describe('Letter Combinations of a Phone Number', () => {
    test('Given an empty string, return an empty array', () => {
        expect(letterCombinationsRecursive("")).toEqual([])
    })

    test('Given a string of digits, return all possible letter combinations', () => {
        expect(letterCombinations("23")).toEqual([
            "ad", "ae", "af",
            "bd", "be", "bf",
            "cd", "ce", "cf",
        ])
    })

    test('Given a string of digits, return all possible letter combinations', () => {
        expect(letterCombinations("22")).toEqual([
            "aa", "ab", "ac",
            "ba", "bb", "bc",
            "ca", "cb", "cc",
        ])
    })

    test('Given a string of digits, return all possible letter combinations', () => {
        expect(letterCombinationsRecursive("234")).toEqual([
            "adg", "adh", "adi",
            "aeg", "aeh", "aei",
            "afg", "afh", "afi",
            "bdg", "bdh", "bdi",
            "beg", "beh", "bei",
            "bfg", "bfh", "bfi",
            "cdg", "cdh", "cdi",
            "ceg", "ceh", "cei",
            "cfg", "cfh", "cfi",
        ])
    })
})
