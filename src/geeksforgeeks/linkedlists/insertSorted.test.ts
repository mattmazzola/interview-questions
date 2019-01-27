import * as models from './models'
import * as utilities from './utilities'
import { insertInSorted } from './insertSorted'

const list: models.INode<number> = {
    value: 10,
    next: {
        value: 20,
        next: {
            value: 30,
            next: {
                value: 40,
                next: null
            }
        }
    }
}

const nodeValues: number[] = [10,20,30,40]
const expectedValues: number[] = [10,13,20,30,40]

describe(`insert node into sorted linked list`, () => {
    test(`given a linked list return array of values`, () => {
        expect(utilities.getNodeValues(list)).toEqual(nodeValues)
    })
    test(`given sorted linked list and node return new list with node inserted`, () => {
        expect(utilities.getNodeValues(insertInSorted(list, { value: 13, next: null }))).toEqual(expectedValues)
    })
})