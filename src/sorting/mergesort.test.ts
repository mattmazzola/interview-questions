import { mergeSort } from './mergesort'

test('merge sort should sort the list', () => {
    expect(mergeSort([5, 4, 7, 9, 8, 3, 4, 1])).toEqual([1, 3, 4, 4, 5, 7, 8, 9])
})