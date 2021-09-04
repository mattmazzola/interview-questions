/**
 * Given list of people with their birth and death years,
 * find the year with the highest population
 */

declare type IYearHash = { [x: string]: number }

export interface IPerson {
    birthYear: number
    deathYear: number
}

export interface IYear {
    minBirthYear: number,
    maxDeathYear: number
}

export const findYearWithHighestPopulation = (people: IPerson[]): number => {
    const minMaxYear: IYear = people.reduce((minMax: IYear, person: IPerson) => {
        minMax.minBirthYear = Math.min(minMax.minBirthYear, person.deathYear)
        minMax.maxDeathYear = Math.max(minMax.maxDeathYear, person.deathYear)
        return minMax
    }, { minBirthYear: people[0].birthYear, maxDeathYear: people[0].deathYear })

    const yearsFromFirstBirthToLastDeath: number[] = Array(minMaxYear.maxDeathYear + 1 - minMaxYear.minBirthYear).fill(0)

    people.forEach(person => {
        yearsFromFirstBirthToLastDeath[person.birthYear - minMaxYear.minBirthYear]++
        yearsFromFirstBirthToLastDeath[person.deathYear - minMaxYear.minBirthYear]--
    })

    let lastNumberOfPeople = 0
    const yearsWithNumberOfPeople: number[] = yearsFromFirstBirthToLastDeath.map((changeInPeople, i) => {
        if (changeInPeople === 0) {
            return lastNumberOfPeople
        }
        else {
            lastNumberOfPeople += changeInPeople
            return lastNumberOfPeople
        }
    })

    let highestPeople = 0
    let highestYearIndex = 0
    yearsWithNumberOfPeople.forEach((people, i) => {
        if (people > highestPeople) {
            highestPeople = people
            highestYearIndex = i
        }
    })

    return highestYearIndex + minMaxYear.minBirthYear
}