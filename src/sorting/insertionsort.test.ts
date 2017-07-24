import { insertionSort, insertionSortInplace } from './insertionsort'

describe('Sorting', () => {
    describe('Insertion Sort', () => {
        test('given empty array return empty array', () => {
            expect(insertionSort([])).toEqual([])
            expect(insertionSortInplace([])).toEqual([])
        })

        test('given array of numbers sort ascending', () => {
            expect(insertionSort([5,2,8,5,78,456,234,789])).toEqual([2,5,5,8,78,234,456,789])
            expect(insertionSortInplace([5,2,8,5,78,456,234,789])).toEqual([2,5,5,8,78,234,456,789])
        })
    })
})