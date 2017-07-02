/**
 * Monk Takes a Walk
 * https://www.hackerearth.com/practice/algorithms/searching/linear-search/practice-problems/algorithm/monk-takes-a-walk/
 */
const defaultVowels = ['a','e','i','o','u']

export const getVowelCount = (letters: string, vowels: string[] = defaultVowels): number => {
    return letters
        .split('')
        .reduce((count, letter) => {
            if (vowels.includes(letter.toLowerCase())) {
                count += 1
            }

            return count
        }, 0)
}

/**
 * Breakup App
 * https://www.hackerearth.com/practice/algorithms/searching/linear-search/practice-problems/algorithm/breakup-app/
 */

const defaultWeights: IUserWeights = {
    'G': 2,
    'M': 1
}

export interface IUserWeights {
    [x: string]: number
}

export interface INumbrWeights {
    [x: number]: number
}

export const getDate = (messages: string[], weights: IUserWeights = defaultWeights): number => {
    const allWeights: INumbrWeights = messages
        .map(fullMessage => {
            const [personIdentifier, message] = fullMessage.split(':')
            return {
                weight: weights[personIdentifier],
                numbers: message.split(' ').map(x => parseInt(x)).filter(x => x === x)
            }
        })
        .reduce((weights, parsedMessage) => {
            return parsedMessage.numbers.reduce((innerWeights: any, number: number) => {
                if (innerWeights[number]) {
                    innerWeights[number] += parsedMessage.weight
                }
                else {
                    innerWeights[number] = parsedMessage.weight
                }

                return innerWeights
            }, weights)
        }, {})
    
    return Object.keys(allWeights)
        .reduce((max: number, key: string) => {
            if (max === null || allWeights[parseInt(key)] > max) {
                max = parseInt(key)
            }

            return max
        }, 0)
}

/**
 * Min-Max
 * https://www.hackerearth.com/practice/algorithms/searching/linear-search/practice-problems/algorithm/min-max-8/
 */
export const minMax = (numbers: number[]): number[] => {
    const sortedNumbers = [...numbers].sort((a, b) => a - b)

    const min = sortedNumbers
        .filter((x, i) => i < numbers.length - 1)
        .reduce((a, b) => a + b)

    const max = sortedNumbers
        .filter((x, i) => i > 0)
        .reduce((a, b) => a + b)

    return [min, max]
}

/**
 * Repeated K Times
 * https://www.hackerearth.com/practice/algorithms/searching/linear-search/practice-problems/algorithm/repeated-k-times/
 */
export const repeatedKTimes = (numbers: number[], requiredRepetitions: number): number | undefined => {
    const numFrequency = numbers
        .reduce((numberFrequency: any, number) => {
            if (numberFrequency[number]) {
                numberFrequency[number] += 1
            }
            else {
                numberFrequency[number] = 1
            }

            return numberFrequency
        }, {})

    const sortedNumbers = Object.keys(numFrequency)
        .filter(key => numFrequency[key] === requiredRepetitions)
        .map(x => parseInt(x))
        .sort((a, b) => a - b)
        
    return (sortedNumbers.length > 0) ? sortedNumbers[0] : undefined
}

/**
 * Bishu and Soldiers
 * https://www.hackerearth.com/practice/algorithms/searching/binary-search/practice-problems/algorithm/bishu-and-soldiers/
 */
export const getKillCountAndSum = (soldiersPowers: number[], bishuPower: number) => {
    const sortedSoliderPowers = [...soldiersPowers].sort((a, b) => a - b)
    const lastIndexOfPowersLessThanPower = findLastIndexLessThanPower(sortedSoliderPowers, bishuPower)!
    const powersLessThanBishus = sortedSoliderPowers.filter((x, i) => i <= lastIndexOfPowersLessThanPower)
    const sumOfPowers = powersLessThanBishus.reduce((a, b) => a + b)

    return [powersLessThanBishus.length, sumOfPowers]
}

const findLastIndexLessThanPowerLinear = (numbers: number[], x: number): number => {
    let lastIndex = -1

    numbers.some((n, i) => {
        if (n > x) {
            return true
        }

        lastIndex = i
        return false
    })

    return lastIndex
}

const findLastIndexLessThanPower = (numbers: number[], number: number, minIndex: number = 0, maxIndex: number = numbers.length - 1): number | undefined => {
    if (numbers.length == 0) {
        return undefined
    }

    if (minIndex >= maxIndex) {
        return minIndex
    }

    const midIndex = Math.floor((minIndex + maxIndex) / 2)
    const mid = numbers[midIndex]

    if (mid === number) {
        return midIndex
    }

    if (number < mid) {
        return findLastIndexLessThanPower(numbers, number, minIndex, midIndex - 1)
    }

    if (number > mid) {
        return findLastIndexLessThanPower(numbers, number, midIndex + 1, maxIndex)
    }
}

/**
 * Counting Triangles
 * https://www.hackerearth.com/practice/algorithms/searching/binary-search/practice-problems/algorithm/counting-triangles/
 */
export const getUniqueTriangles = (triangles: number[][]): number => {
    const triangleFrequency = triangles
        .map(traingleSides => [...traingleSides].sort((a, b) => a - b).join(''))
        .reduce((uniqueTriangles: any, triangleSidesString) => {
            if (uniqueTriangles[triangleSidesString]) {
                uniqueTriangles[triangleSidesString] += 1
            }
            else {
                uniqueTriangles[triangleSidesString] = 1
            }

            return uniqueTriangles
        }, {})

    return Object.keys(triangleFrequency)
        .filter(key => triangleFrequency[key] === 1)
        .length
}

/**
 * The String Monster
 * https://www.hackerearth.com/practice/algorithms/searching/binary-search/practice-problems/algorithm/the-string-monster-july-easy/
 */
export const stringMonster = (availableStrings: string[], sleepString: string): boolean => {
    const characterFrequencies = availableStrings
        .map(s => getCharacterFrequency(s))
        .reduce((mergedFrequency, frequency) => {
            Object.keys(frequency)
                .forEach(key => {
                    if (mergedFrequency[key]) {
                        mergedFrequency[key] += frequency[key]
                    }
                    else {
                        mergedFrequency[key] = frequency[key]
                    }
                })

            return mergedFrequency
        }, {})

    const sleepCharacterFrequencies = convertFrequenceyToArray(getCharacterFrequency(sleepString))
    return sleepCharacterFrequencies
        .every(frequencyElement => frequencyElement.frequency <= characterFrequencies[frequencyElement.value])
}

const getCharacterFrequency = (s: string): { [x: string]: number } => {
    return s.split('').reduce((frequency: any, character) => {
        if (frequency[character]) {
            frequency[character] += 1
        }
        else {
            frequency[character] = 1
        }

        return frequency
    }, {})
}

interface IFrequencySet {
    [x: string]: number
}

interface IFrequencyElement {
    value: string,
    frequency: number
}

const convertFrequenceyToArray = (frequencySet: IFrequencySet): IFrequencyElement[] => {
    return Object.keys(frequencySet)
        .map(key =>
            ({
                value: key,
                frequency: frequencySet[key]
            }))
}

/**
 * Simple Game
 * https://www.hackerearth.com/practice/algorithms/searching/binary-search/practice-problems/algorithm/simple-game-22/
 */
export const simpleGame = (monkASet: number[], monkBSet: number[]): string => {
    const sortedMonkASet = [...monkASet].sort((a, b) => a - b)
    const sortedMonkBSet = [...monkBSet].sort((a, b) => a - b)

    const monkAScore = getScore(sortedMonkASet, sortedMonkBSet)
    const monkBScore = getScore(sortedMonkBSet, sortedMonkASet)

    if (monkAScore > monkBScore) {
        return `Monk ${monkAScore}`
    }
    else if (monkBScore > monkBScore) {
        return `!Monk ${monkBScore}`
    }
    else {
        return `Tie`
    }
}

const getScore = (as: number[], bs: number[]): number => {
    return as
        .reduce((score, value) => {
            score += getV(bs, value)
            return score
        })
}

const getV = (numbers: number[], x: number): number => {
    return getCountOfSmaller(numbers, x) * getCountOfLarger(numbers, x)
}

export const getCountOfSmaller = (numbers: number[], x: number): number => {
    if (numbers.length === 0) {
        return 0
    }

    if (x < numbers[0]) {
        return 0
    }

    if (x >= numbers[numbers.length - 1]) {
        return numbers.length
    }

    return getCountOfSmallerSearch(numbers, x)!
}

const getCountOfSmallerSearch = (numbers: number[], number: number, minIndex: number = 0, maxIndex: number = numbers.length - 1): number | undefined => {
    if (numbers.length == 0) {
        return undefined
    }

    if (minIndex >= maxIndex) {
        return minIndex
    }

    const midIndex = Math.floor((minIndex + maxIndex) / 2)
    const mid = numbers[midIndex]

    if (mid === number) {
        return midIndex - 1
    }

    if (number < mid) {
        return getCountOfSmallerSearch(numbers, number, minIndex, midIndex - 1)
    }

    if (number > mid) {
        return getCountOfSmallerSearch(numbers, number, midIndex + 1, maxIndex)
    }
}

export const getCountOfLarger = (numbers: number[], x: number): number => {
    if (numbers.length === 0) {
        return 0
    }

    if (x < numbers[0]) {
        return numbers.length
    }

    if (x >= numbers[numbers.length - 1]) {
        return 0
    }

    return numbers.length - 1 - getCountOfLargerSearch(numbers, x)!
}

const getCountOfLargerSearch = (numbers: number[], number: number, minIndex: number = 0, maxIndex: number = numbers.length - 1): number | undefined => {
    if (numbers.length == 0) {
        return undefined
    }

    if (minIndex >= maxIndex) {
        return maxIndex
    }

    const midIndex = Math.floor((minIndex + maxIndex) / 2)
    const mid = numbers[midIndex]

    if (mid === number) {
        return midIndex
    }

    if (number < mid) {
        return getCountOfLargerSearch(numbers, number, minIndex, midIndex - 1)
    }

    if (number > mid) {
        return getCountOfLargerSearch(numbers, number, midIndex + 1, maxIndex)
    }
}