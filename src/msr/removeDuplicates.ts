/**
 * Remove duplicates in sorted int array
 * 
 * Write a function that takes an input array containing sorted integers and returns an array with all duplicates removed.
 */

export function removeDuplicates(sortedNumbers: number[]): number[] {
    let previousValue: number | undefined = undefined
    const duplicates: [number, number][] = []
    const duplicateMarker = -1

    // Get duplicates
    for(const [i,n] of sortedNumbers.entries()) {
        if (previousValue && n === previousValue) {
            duplicates.push([i,n])
            // Mark duplicates
            sortedNumbers[i] = duplicateMarker
        }

        previousValue = n
    }

    sortedNumbers = sortedNumbers.filter(n => n != duplicateMarker)

    // Add duplicates to end
    sortedNumbers.push(...duplicates.map(([_,v]) => v))

    return sortedNumbers
}