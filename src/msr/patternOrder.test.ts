import { patternOrder } from './patternOrder'

describe('Pattern Order', () => {
    describe('patternOrder()', () => {
        test('given empty string return false', () => {
            // Arrange
            const givenString = ''
            const pattern = 'wa'
            const expected = false

            // Act
            const actual = patternOrder(givenString, pattern)

            // Assert
            expect(actual).toEqual(expected)
        })

        test('given empty pattern return false', () => {
            // Arrange
            const givenString = 'how are you?'
            const pattern = ''
            const expected = false

            // Act
            const actual = patternOrder(givenString, pattern)

            // Assert
            expect(actual).toEqual(expected)
        })

        test('given string with pattern return true', () => {
            // Arrange
            const givenString = 'how are you?'
            const pattern = 'wa'
            const expected = true

            // Act
            const actual = patternOrder(givenString, pattern)

            // Assert
            expect(actual).toEqual(expected)
        })

        test('given A and pattern A return true', () => {
            // Arrange
            const givenString = 'A'
            const pattern = 'A'
            const expected = true

            // Act
            const actual = patternOrder(givenString, pattern)

            // Assert
            expect(actual).toEqual(expected)
        })

        test('given AB and pattern A return true', () => {
            // Arrange
            const givenString = 'AB'
            const pattern = 'A'
            const expected = true

            // Act
            const actual = patternOrder(givenString, pattern)

            // Assert
            expect(actual).toEqual(expected)
        })

        test('given ABC and pattern AC return true', () => {
            // Arrange
            const givenString = 'ABC'
            const pattern = 'AC'
            const expected = true

            // Act
            const actual = patternOrder(givenString, pattern)

            // Assert
            expect(actual).toEqual(expected)
        })

        test('given ABC nad pattern CA return false', () => {
            // Arrange
            const givenString = 'ABC'
            const pattern = 'CA'
            const expected = false

            // Act
            const actual = patternOrder(givenString, pattern)

            // Assert
            expect(actual).toEqual(expected)
        })

        describe('the order of pattern may only occur once', () => {
            test('given ABCAB and pattern AB return false', () => {
                // Arrange
                const givenString = 'ABCAB'
                const pattern = 'AB'
                const expected = false

                // Act
                const actual = patternOrder(givenString, pattern)

                // Assert
                expect(actual).toEqual(expected)
            })

            test('given ABCAB and pattern ABAB return true', () => {
                // Arrange
                const givenString = 'ABCAB'
                const pattern = 'ABAB'
                const expected = true

                // Act
                const actual = patternOrder(givenString, pattern)

                // Assert
                expect(actual).toEqual(expected)
            })
        })
    })
})