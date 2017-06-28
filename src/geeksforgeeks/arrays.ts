/**
 * Minimum Number in a sorted rotated array
 * http://practice.geeksforgeeks.org/problems/minimum-number-in-a-sorted-rotated-array/0
 * 
 * A sorted array is rotated at some unknown point, find the minimum element in it in O(logn). All the elements in the array are distinct.
 */
export const findMinimum = (numbers: number[]): number | undefined => {
    const rotationIndex = findRotation(numbers)
    return rotationIndex === undefined ? undefined : numbers[rotationIndex]
}

/**
 * Given rotated sorted array of distinct values, return the index where the rotation occurs (max meats min)
 */
export const findRotation = (numbers: number[], minIndex: number = 0, maxIndex: number = numbers.length - 1): number | undefined => {
    if (numbers.length == 0) {
        return undefined
    }

    // If array has not been rotated return 0
    if (numbers[0] < numbers[numbers.length - 1]) {
        return 0
    }

    if (minIndex >= maxIndex) {
        return minIndex
    }

    const midIndex = Math.floor((maxIndex + minIndex) / 2)
    const [leftMin, leftMax, rightMin, rightMax] = [numbers[minIndex], numbers[midIndex], numbers[midIndex+1], numbers[maxIndex]]

    let searchLeft = false

    if (leftMax < leftMin) {
        searchLeft = true
    }
    else if (rightMax < rightMin) {
        searchLeft = false
    }
    else if (leftMax < rightMin) {
        searchLeft = true
    }
    else {
        searchLeft = false
    }

    const newMinIndex = searchLeft ? minIndex : midIndex + 1
    const newMaxIndex = searchLeft ? midIndex : maxIndex

    return findRotation(numbers, newMinIndex, newMaxIndex)
}

export const binarySearch = (x: number, numbers: number[], minIndex: number = 0, maxIndex: number = numbers.length - 1): number | undefined => { 
    if (minIndex >= maxIndex) {
        return (x === numbers[minIndex]) ? minIndex : undefined
    }

    const midIndex = Math.floor((maxIndex + minIndex) / 2)
    const mid = numbers[midIndex]

    if (mid === x) {
        return midIndex
    }
    else if (x < mid) {
        return binarySearch(x, numbers, minIndex, midIndex - 1)
    }
    else {
        return binarySearch(x, numbers, midIndex + 1, maxIndex)
    }
}