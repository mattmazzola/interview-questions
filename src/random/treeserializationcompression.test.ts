import { INode, save, restore } from './treeserializationcompression'

const tree: INode<number> = {
    value: 3,
    left: {
        value: 9,
        left: {
            value: 102,
            left: null,
            right: null
        },
        right: {
            value: 1002244,
            left: null,
            right: null
        }
    },
    right: {
        value: 908,
        left: {
            value: 32345,
            left: null,
            right: null
        },
        right: {
            value: 984,
            left: null,
            right: null
        }
    }
}

const expectedString = `3,9,102,null,null,1002244,null,null,908,32345,null,null,984,null,null,`

describe('save', () => {
    test('given tree should return correctly serialized string', () => {
        // Arrange

        // Act
        const treeFile = save(tree)

        // Assert
        expect(treeFile.value).toEqual(expectedString)
    })
})

describe('restore', () => {
    test('asdfas qweropuqwpoeru', () => {
        // Arrange

        // Act
        const restoredTree = restore({ value: expectedString, index: 0 })

        // Assert
        expect(restoredTree).toEqual(tree)
    })
})