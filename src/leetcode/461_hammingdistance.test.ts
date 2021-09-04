import { hammingDistance } from './461_hammingdistance'

describe('hammingDistance', () => {
    test('x = 1, y = 4, should output 4', () => {
        expect(hammingDistance(1, 4)).toBe(2)
    })
})