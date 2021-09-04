import { INode, findPaths, findPathsWithFilter, findPathsWithTotalValueSlower } from './graphpathvalue'

const tree: INode<number> = {
    value: 6,
    left: {
        value: 3,
        left: {
            value: 7,
            left: null,
            right: null
        },
        right: {
            value: 1,
            left: null,
            right: null
        }
    },
    right: {
        value: 2,
        left: null,
        right: {
            value: 1,
            left: null,
            right: {
                value: 1,
                left: null,
                right: null
            }
        }
    }
}


describe('findPaths', () => {
    test('returns paths whose sum equals given value', () => {
        const paths = findPaths(tree)

        expect(paths).toEqual([
            [6, 3, 7],
            [6, 3, 1],
            [6, 2, 1, 1]
        ])
    })
})

describe('findPathsWithTotalValueSlower', () => {
    test('returns paths whose sum equals given value', () => {
        const paths = findPathsWithTotalValueSlower(tree, 10)

        expect(paths).toEqual([
            [6, 3, 1],
            [6, 2, 1, 1]
        ])
    })
})

describe('findPathsWithFilter', () => {
    test('returns paths whose sum equals given value', () => {
        const paths = findPathsWithFilter(tree, node => node.value < 3)

        expect(paths).toEqual([
            [6, 2, 1, 1]
        ])
    })
})
