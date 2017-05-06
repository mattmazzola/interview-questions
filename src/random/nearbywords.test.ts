import { nearByWords } from './nearbywords'

describe('nearByWords', () => {
    test('should return all near by words', () => {
        expect(nearByWords("gi")).toEqual(["go", "hi"])
    })
})