import { findWaterValues } from './watergraph'

describe('findWaterValues', ()  => {
    test('example 1', () => {
        // Arrange
        const chart = [2,3,1,4,2,3,5,3,1]
        const expectedWaterValues = [0,0,2,0,2,1,0,0,0]
        // Act
        const waterValues = findWaterValues(chart)

        // Assert
        expect(waterValues).toEqual(expectedWaterValues)
    })

    test('should return height of water for each column', () => {
        // Arrange
        const chart = [1,2,3,5,4,2,7,7,8,6,1,7,4,2,3,1]
        const expectedWaterValues = [0,0,0,0,1,3,0,0,0,1,6,0,0,1,0,0]
        // Act
        const waterValues = findWaterValues(chart)

        // Assert
        expect(waterValues).toEqual(expectedWaterValues)
    })
})