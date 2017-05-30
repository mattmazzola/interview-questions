import { quickSort, quickSortNoSwap } from './quicksort'

test('quicksort should return sorted array', () => {
    expect(quickSort([4,2,6,5,3,9])).toEqual([2,3,4,5,6,9])
})

test('quickSortNoSwap shoul also sort, but slightly slower since it has to go through N elements and alocate new arrays', () => {
    expect(quickSortNoSwap([4,2,6,5,3,9])).toEqual([2,3,4,5,6,9])
})