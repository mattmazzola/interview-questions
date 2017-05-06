import { titleCapitalize } from './titlecapitalization'

describe('titlecapitalization', () => {
    test('given value should return different with pi', () => {
        const titles = [
            {
                input: "i love solving problems and it is fun",
                output: "I Love Solving Problems and It Is Fun"
            },
            {
                input: "wHy DoeS A biRd Fly?",
                output: "Why Does a Bird Fly?"
            }
        ]

        titles.forEach(title => {
            expect(titleCapitalize(title.input)).toBe(title.output)
        })
    })
})
