import { fizzBuzz } from './fizzbuzz'

describe('fizzBuzz', () => {
    test('should print out fizz for multiples of 3, buzz for multiples of 5 and fizzbuzz for multiples of both', () => {
        expect(fizzBuzz(10)).toEqual([1, 2, 'fizz', 4, 'buzz', 'fizz', 7, 8, 'fizz', 'buzz'])
    })
})