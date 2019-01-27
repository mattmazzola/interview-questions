import { specialPermutations } from './specialPermutations'


xdescribe("special permutations", () => {
    test("given a list of numbers return the number of special permutations of that list", () => {
        const lists = [
            {
                list: [1],
                answer: 1
            },
            {
                list: [1,2],
                answer: 2
            },
            {
                list: [1,2,3],
                answer: 4
            },
            {
                list: [1,2,3,4],
                answer: 9
            }
        ]

        lists.forEach(({ list, answer }) => {
            expect(specialPermutations(list)).toBe(answer)
        })
    })
})