import { reshape } from './566_reshapeTheMatrix'

test('reshape should return new matrix', () => {
    // Arrange
    const input = [
        [1,2],
        [3,4]
    ]
    const expected = [
        [1,2,3,4]
    ]

    // Act
    const newMatrix = reshape(input, 1, 4)

    // Assert
    expect(newMatrix).toEqual(expected)
})

test('reshape should handle inputs with single row', () => {
    // Arrange
    const input = [
        [1],[2],[3],[4]
    ]
    const expected = [
        [1,2],
        [3,4]
    ]

    // Act
    const newMatrix = reshape(input, 2, 2)

    // Assert
    expect(newMatrix).toEqual(expected)
})