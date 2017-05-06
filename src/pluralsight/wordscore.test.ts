import { wordScore } from './wordscore'

describe('wordscore', () => {
    test('given string should output score of letters', () => {
        const words = [
            {
                input: "XRay Machine",
                expected: 20
            },
            {
                input: "Jabbt",
                expected: 13
            }
        ]

        words.forEach(word => {
            expect(wordScore(word.input)).toEqual(word.expected)
        })
    })
})