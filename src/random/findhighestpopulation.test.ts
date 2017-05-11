import { IPerson, findYearWithHighestPopulation } from './findhighestpopulation'

describe('findYearWithHighestPopulation', () => {
    test('should return year with highest population', () => {
        // Arrange
        const people: IPerson[] = [
            {
                birthYear: 2000,
                deathYear: 2004
            },
            {
                birthYear: 2001,
                deathYear: 2005,
            },
            {
                birthYear: 2002,
                deathYear: 2006
            },
            {
                birthYear: 2003,
                deathYear: 2007
            },
            {
                birthYear: 2004,
                deathYear: 2008
            },
            {
                birthYear: 2005,
                deathYear: 2009
            },
            {
                birthYear: 2002,
                deathYear: 2009
            },
            {
                birthYear: 2003,
                deathYear: 2005
            }
        ]

        const expected = 2004

        // Act
        const actual = findYearWithHighestPopulation(people)

        // Assert
        expect(actual).toEqual(expected)
    })
})