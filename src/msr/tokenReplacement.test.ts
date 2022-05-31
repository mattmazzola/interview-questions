import { expandStringFn, expandStringFn2 } from './tokenReplacement'

describe('Token Expansion', () => {
    describe('expandStringFn', () => {
        test('given no substitutions there should be no transformation', () => {
            // Arrange
            const input = '${greeting}'
            const substitutions: [string, string][] = []
            const expected = '${greeting}'

            // Act
            const expandString = expandStringFn(substitutions)
            const actual = expandString(input)

            // Assert
            expect(actual).toEqual(expected)
        })

        test('given repeated tokens should replace all of them (also only fills tokens with substitutions)', () => {
            // Arrange
            const input = '${first} ${first} ${second}'
            const substitutions: [string, string][] = [
                ['${first}', 'Token'],
            ]

            const expected = 'Token Token ${second}'

            // Act
            const expandString = expandStringFn(substitutions)
            const actual = expandString(input)

            // Assert
            expect(actual).toEqual(expected)
        })

        test('given multiple nested substitutions should expand all of them', () => {
            // Arrange
            const input = '${first} ${second}'
            const substitutions: [string, string][] = [
                ['${first}', 'First ${third}'],
                ['${second}', 'Second ${third}'],
                ['${third}', 'Third'],
            ]

            const expected = 'First Third Second Third'

            // Act
            const expandString = expandStringFn(substitutions)
            const actual = expandString(input)

            // Assert
            expect(actual).toEqual(expected)
        })

        test('"Hello Miss Alvarez" example', () => {
            // Arrange
            const input = '${greeting}'
            const substitutions: [string, string][] = [
                ['${greeting}', 'Hello ${name}'],
                ['${name}', '${title} ${family_name}'],
                ['${title}', 'Miss'],
                ['${family_name}', 'Alvarez'],
            ]

            const expected = 'Hello Miss Alvarez'

            // Act
            const expandString = expandStringFn(substitutions)
            const actual = expandString(input)

            // Assert
            expect(actual).toEqual(expected)
        })
    })

    describe('expandStringFn2', () => {
        test('"Hello Miss Alvarez" example', () => {
            // Arrange
            const input = '${greeting}'
            const substitutions: [string, string][] = [
                ['${greeting}', 'Hello ${name}'],
                ['${name}', '${title} ${family_name}'],
                ['${title}', 'Miss'],
                ['${family_name}', 'Alvarez'],
            ]

            const expected = 'Hello Miss Alvarez'

            // Act
            const expandString = expandStringFn2(substitutions)
            const actual = expandString(input)

            // Assert
            expect(actual).toEqual(expected)
        })
    })
})