import { unionFind } from './unionFind'
import { ISimpleGraph, IVertex } from './models'

interface ITestItem<T> {
    item: T
    answer: boolean
}

describe("Union-Find", () => {
    test("given a graph return true if it has a cycle false if it doesnt", () => {

        // Arrnage
        const verticies: IVertex[] = [
            { id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }
        ]

        const testItems: ITestItem<ISimpleGraph>[] = [
            {
                item: {
                    verticies: verticies.slice(0, 3),
                    edges: [
                        { start: verticies[0], end: verticies[1] },
                        { start: verticies[1], end: verticies[2] },
                        { start: verticies[2], end: verticies[0] }
                    ],
                },
                answer: true
            },
            {
                item: {
                    verticies: verticies.slice(0, 5),
                    edges: [
                        { start: verticies[0], end: verticies[2] },
                        { start: verticies[0], end: verticies[1] },
                        { start: verticies[1], end: verticies[3] },
                        { start: verticies[1], end: verticies[4] },
                        { start: verticies[3], end: verticies[4] },
                    ]
                },
                answer: true
            },
            {
                item: {
                    verticies: verticies.slice(0, 5),
                    edges: [
                        { start: verticies[0], end: verticies[1] },
                        { start: verticies[1], end: verticies[2] },
                        { start: verticies[2], end: verticies[3] },
                        { start: verticies[3], end: verticies[4] },
                    ]
                },
                answer: false
            }
        ]

        // Act  / Assert   
        testItems.forEach(testItem => {
            expect(unionFind(testItem.item)).toBe(testItem.answer)
        })
    })
})