import { profit, profit2 } from './winebottles'

describe('winebottles', () => {
    test('should return maximum profit based on selling wine bottles', () => {
        // Arrange
        const bottles = [2,3,5,1,4]
        
        expect(profit(bottles)).toBe(50)
    })

    test('should return maximum profit2 based on selling wine bottles', () => {
        // Arrange
        const bottles = [2,3,5,1,4]
        const cache: number[][] = Array(bottles.length).fill(null)
            .map((x: number) => Array(bottles.length).fill(-1))

        expect(profit2(bottles, 0, bottles.length - 1, cache)).toBe(50)
    })
})