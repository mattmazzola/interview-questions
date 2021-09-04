import { travelingMonk, cj17 } from './basics'
describe('greedy', () => {
    test('traveling monk should return minimal cost to get to coderland', () => {
        expect(travelingMonk([5, 1], [1, 2])).toBe(7)
    })

    test('cj17 robot must return first in alphabetical order the word', () => {
        expect(cj17("?ba??b")).toEqual("ababab")
        expect(cj17("?bab??")).toEqual("ababab")
    })
})