import { Box, tallestStack } from "./boxstacking"

describe('Box Stacking', () => {
    test('given an empty array, should return 0', () => {
        // Arrange
        const boxes: Box[] = []

        // Act
        const result = tallestStack(boxes)

        // Assert
        expect(result).toEqual(0)
    })

    test('given an array with one box, should return the height of the box', () => {
        // Arrange
        const boxes: Box[] = [[1, 2, 3]]

        // Act
        const result = tallestStack(boxes)

        // Assert
        expect(result).toEqual(3)
    })

    test('given an array with multiple boxes, should return the height of the tallest stack', () => {
        // Arrange
        const boxes: Box[] = [
            [1, 2, 3],
            [2, 3, 4],
            [3, 4, 5],
        ]

        // Act
        const result = tallestStack(boxes)

        // Assert
        expect(result).toEqual(12)
    })
})
