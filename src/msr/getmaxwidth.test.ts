import { getMaxWidth, INode } from './getmaxwidth'

describe('MSR', () => {
    describe('Get max width of tree', () => {
        test('given tree return max width', () => {
            // Arrange
            const tree: INode<number> = {
                value: 10,
                left: {
                    value: 5,
                    left: {
                        value: 2,
                        left: {
                            value: 1,
                            left: null,
                            right: null
                        },
                        right: null
                    },
                    right: {
                        value: 7,
                        left: {
                            value: 6,
                            left: null,
                            right: null
                        },
                        right: {
                            value: 8,
                            left: null,
                            right: null
                        }
                    }
                },
                right: {
                    value: 15,
                    left: {
                        value: 12,
                        left: null,
                        right: null
                    },
                    right: {
                        value: 18,
                        left: null,
                        right: null
                    }
                }
            }

            // Act / Assert
            expect(getMaxWidth(tree)).toBe(4)
        })
    })
})