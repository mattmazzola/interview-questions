import { hopping } from './hopping'

describe('hopping', () => {
    test('hopping nothing to be false', () => {
        expect(hopping([], 4)).toBe(false)
    })
})