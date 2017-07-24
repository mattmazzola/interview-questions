import { bubbleSort } from './bubblesort'

describe('Sorting', () => {
    describe('Bubble Sort', () => {
        test('given array of numbers, sort in ascending order', () => {
            expect(bubbleSort([1,4,3,6,9,56,0,2,4,87])).toEqual([0,1,2,3,4,4,6,9,56,87])
        })
    })
})