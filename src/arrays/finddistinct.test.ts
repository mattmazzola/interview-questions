import { findDistinct } from './finddistinct'

describe('findDistinct', () => {
    test('should return distinct values between two sorted arrays', () => {
        // Arrange
        const as = [1,1,2,4,6,6,8,8,9]
        const bs = [1,2,2,4,4,5,10,11]
        const expected = [1,2,4,5,6,8,9,10,11]

        // Act
        const distinct = findDistinct(as, bs)

        // Assert
        expect(distinct).toEqual(expected)
    })

    test('should return distinct values between two sorted arrays, example 2 ?', () => {
        // Arrange
        const as = [1,2,3]
        const bs = [1,2,2,4,4,5,10,11]
        const expected = [1,2,3,4,5,10,11]

        // Act
        const distinct = findDistinct(as, bs)

        // Assert
        expect(distinct).toEqual(expected)
    })
})