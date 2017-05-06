import { piMatch } from './pimatch'

describe('pimatch', () => {
    test('given value should return different with pi', () => {
        expect(piMatch(3149)).toBe(-82.5)
    })
})
