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

/**
 * Painting the Fence
 * http://practice.geeksforgeeks.org/problems/painting-the-fence/0
 * 
 * Given a fence with n posts and k colors, find out the number of ways of painting the fence such that at most 2 adjacent posts have the same color. Since answer can be large return it modulo 10^9 + 7.
 * 
 * @param n Number of fence posts
 * @param k Number of colors
 */
export const getWaysOfPaintingFence = (n: number, k: number, firstPost: boolean = true): number => {
    // console.log(`Arguments: n: ${n}, k: ${k}, first: ${firstPost}`)

    if (n <= 0) {
        // console.log(`Return 0`)
        return 0
    }

    const availableColors = firstPost ? k : k - 1
    if (n === 1) {
        // console.log(`Return ${availableColors}`)
        return availableColors
    }

    let waysOfPaintingRemainderFence = getWaysOfPaintingFence(n - 1, k, false)
    if (n >= 2) {
        waysOfPaintingRemainderFence += getWaysOfPaintingFence(n - 2, k, false)
    }

    // TODO: Why use 'k' here instead of 'availableColors' ?
    // Because the previous post color could have been anything so thus we're also allows to use any?
    const totalWays = k * waysOfPaintingRemainderFence
    // console.log(`Return: ${totalWays} = availableColors: ${k} * waysOfPaintingRemainderFence: ${waysOfPaintingRemainderFence}`)

    return totalWays
}