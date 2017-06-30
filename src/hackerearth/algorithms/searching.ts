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