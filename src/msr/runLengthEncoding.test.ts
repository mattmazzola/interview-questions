import { createRunLengthEncodingStream, expandRunLengthEncoding } from './runLengthEncoding'

describe('Run Length Encoding', () => {
    describe('createRunLengthEncodingStream', () => {
        test('given empty array return empty', () => {
            // Arrange
            const input: (string | number)[] = []
            const expected: (string | number)[] = []

            // Act
            const actualGenerator = createRunLengthEncodingStream(input)
            const actual = [...actualGenerator]

            // Assert
            expect(actual).toEqual(expected)
        })

        test('given simple sequence return sequence', () => {
            // Arrange
            const input: (string | number)[] = ['A', 8]
            const expected: (string | number)[] = ['A', 8]

            // Act
            const actualGenerator = createRunLengthEncodingStream(input)
            const actual = [...actualGenerator]

            // Assert
            expect(actual).toEqual(expected)
        })

        test('given complex sequence return sequence', () => {
            // Arrange
            const input: (string | number)[] = ['A', 8, 'B', 0, 'C', 2, 'D', 4]
            const expected: (string | number)[] = ['A', 8, 'B', 0, 'C', 2, 'D', 4]

            // Act
            const actualGenerator = createRunLengthEncodingStream(input)
            const actual = [...actualGenerator]

            // Assert
            expect(actual).toEqual(expected)
        })
    })

    describe('expandRunLengthEncoding', () => {
        test('given empty array return empty', () => {
            // Arrange
            const input: (string | number)[] = []
            const expected: (string | number)[] = []

            // Act
            const rleGenerator = createRunLengthEncodingStream(input)
            const expandedRleEncoding = expandRunLengthEncoding(rleGenerator)
            const actual = [...expandedRleEncoding]

            // Assert
            expect(actual).toEqual(expected)
        })

        test('given RLE sequence array return expanded sequence', () => {
            // Arrange
            const input: (string | number)[] = ['A', 8]
            const expected: (string | number)[] = ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A',]

            // Act
            const rleGenerator = createRunLengthEncodingStream(input)
            const expandedRleEncoding = expandRunLengthEncoding(rleGenerator)
            const actual = [...expandedRleEncoding]

            // Assert
            expect(actual).toEqual(expected)
        })

        test('given complex RLE sequence array return expanded sequence', () => {
            // Arrange
            const input: (string | number)[] = ['A', 8, 'B', 0, 'C', 2, 'D', 4]
            const expected: (string | number)[] = ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'C', 'C', 'D', 'D', 'D', 'D',]

            // Act
            const rleGenerator = createRunLengthEncodingStream(input)
            const expandedRleEncoding = expandRunLengthEncoding(rleGenerator)
            const actual = [...expandedRleEncoding]

            // Assert
            expect(actual).toEqual(expected)
        })

        test('given ODD RLE (incomplete pair) sequence expand should throw error', () => {
            // Arrange
            const input: (string | number)[] = ['A', 8, 'B']
            const expected: (string | number)[] = ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A',]

            // Act
            const rleGenerator = createRunLengthEncodingStream(input)
            const expandedRleEncoding = expandRunLengthEncoding(rleGenerator)

            // Assert
            expect(() => {
                [...expandedRleEncoding]
            }).toThrow()
        })
    })
})