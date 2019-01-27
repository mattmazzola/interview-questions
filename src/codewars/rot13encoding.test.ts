import { rot13 } from './rot13encoding'

describe("Code Wars", () => {
    describe("ROT13 Encoding", () => {
        test("given string return new string ecoded in ROT13 and vice/versa", () => {
            // Arrange
            const pairs = [
                [
                    "Uryyb",
                    "Hello",
                ], [
                    "EBG13 rknzcyr.",
                    "ROT13 example.",
                ], [
                    "Guvf vf zl svefg EBG13 rkprepvfr!",
                    "This is my first ROT13 excercise!",
                ],
            ]

            // Act + Assert
            pairs.forEach(([decoded, encoded]) => {
                expect(rot13(decoded)).toBe(encoded)
            })
        })
    })
})