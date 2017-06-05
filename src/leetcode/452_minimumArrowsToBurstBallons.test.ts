import { mininumArrowsToBurstBallonsGreedy } from './452_minimumArrowsToBurstBallons'

describe('minimum arrows', () => {
    test('given empty should return 0', () => {
        expect(mininumArrowsToBurstBallonsGreedy([])).toBe(0)
    })

    test('given array with balloons in same position should return 1', () => {
        expect(mininumArrowsToBurstBallonsGreedy([[1,10],[1,10],[1,10]])).toBe(1)
    })

    test('given certain set of ballons should return minimum number of arrows to pop all balloons', () => {
        // Arrange
        const input = [
            [10,16],[2,8],[1,6],[7,12]
        ]

        // Act
        const count = mininumArrowsToBurstBallonsGreedy(input)

        // Assert
        expect(count).toBe(2)
    })
})