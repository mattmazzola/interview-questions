import * as models from './models'
import * as ulitlities from './utilities'
import { deleteNode } from './deleteNode'

describe(`delete node`, () => {
    test(`given list and node to delete return new list without node`, () => {
        // Arrange
        const node: models.INode<number> = {
            value: 20,
            next: {
                value: 30,
                next: {
                    value: 40,
                    next: null
                }
            }
        }

        const list: models.INode<number> = {
            value: 10,
            next: {
                value: 15,
                next: node
            }
        }

        // Act / Assert
        expect(ulitlities.getNodeValues(deleteNode(list, node)!)).toEqual([10,15,30,40])
    })
})