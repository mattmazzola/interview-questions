import * as RDP from './recursionanddynamicprogramming'

describe('Cracking The Coding Interview', () => {
    describe('Recursion and Dynamic Programming', () => {
        describe('9.1 get stair climb permutations', () => {
            test('given 0 stairs permutations should be []', () => {
                expect(RDP.getStairPermutations(0)).toEqual([])
            })

            test('given n stairs return permutations to walk stairs', () => {
                expect(RDP.getStairPermutations(2)).toEqual([
                    [2],
                    [1, 1]
                ])
                expect(RDP.getStairPermutations(3)).toEqual([
                    [3],
                    [2, 1],
                    [1, 2],
                    [1, 1, 1]
                ])
                expect(RDP.getStairPermutations(4)).toEqual([
                    [3, 1],
                    [2, 2],
                    [2, 1, 1],
                    [1, 3],
                    [1, 2, 1],
                    [1, 1, 2],
                    [1, 1, 1, 1]
                ])
            })
        })

        describe('9.2 Given x, y grid, get all paths robot can take to get to x,y', () => {
            test('given empty grid, return no paths', () => {
                expect(RDP.getRobotPaths(0, 0)).toEqual([])
            })

            test('given grid, return paths robot can take to get to end', () => {
                expect(RDP.getRobotPaths(2, 1)).toEqual([
                    [[0, 0], [1, 0]]
                ])

                expect(RDP.getRobotPaths(2, 2)).toEqual([
                    [[0, 0], [1, 0], [1, 1]],
                    [[0, 0], [0, 1], [1, 1]]
                ])

                expect(RDP.getRobotPaths(3, 2)).toEqual([
                    [[0, 0], [1, 0], [2, 0], [2, 1]],
                    [[0, 0], [1, 0], [1, 1], [2, 1]],
                    [[0, 0], [0, 1], [1, 1], [2, 1]]
                ])
            })
        })

        describe('9.3 Find magic index (i === x)', () => {
            test('given array without magic index return undefined', () => {
                expect(RDP.findMagicIndex([1, 2, 3])).toBe(undefined)
            })

            test('given empty array return undefined', () => {
                expect(RDP.findMagicIndex([])).toBe(undefined)
            })

            test('given array with magic index return magic index', () => {
                expect(RDP.findMagicIndex([-2, -1, 0, 1, 4, 6, 7])).toBe(4)
            })
        })

        describe('9.4 Get subsets of a set', () => {
            test('given empty set return empty set', () => {
                expect(RDP.getSubsets([])).toEqual([])
            })

            test('given set return subsets', () => {
                expect(RDP.getSubsets([1])).toEqual([])
                expect(RDP.getSubsets([1, 2])).toEqual([[1], [2]])
                expect(RDP.getSubsets([1, 2, 3])).toEqual([
                    [1, 2],
                    [2, 3],
                    [1],
                    [2],
                    [2],
                    [3]
                ])
            })
        })

        describe('9.5 Get permutations of a string', () => {
            test('given empty string return single permutation', () => {
                expect(RDP.getPermutations('')).toEqual([''])
            })

            test('given 1 character string return 1 permutation', () => {
                expect(RDP.getPermutations('a')).toEqual(['a'])
            })

            test('given string of N characters return permutations', () => {
                expect(RDP.getPermutations('ab')).toEqual(['ab', 'ba'])
                expect(RDP.getPermutations('abc')).toEqual(['abc', 'bac', 'bca', 'acb', 'cab', 'cba'])
            })
        })

        describe('9.6 Get permutations of parentheses', () => {
            test('given 0 pairs return empty set', () => {
                expect(RDP.parenthesesPairs(0)).toEqual([])
            })

            test('given 1 pair return single pair', () => {
                expect(RDP.parenthesesPairs(1)).toEqual(['()'])
            })

            test('given n pairs return permutations', () => {
                expect(RDP.parenthesesPairs(2)).toEqual(['(())', '()()'])
                expect(RDP.parenthesesPairs(3)).toEqual(['((()))', '(()())', '()(())', '()()()', '(())()'])
            })
        })

        describe('9.7 Fill screen with color', () => {
            test('given screen of 0 width or height return the screen since no points will be valid', () => {
                expect(RDP.fillColor([], [1, 1], 1)).toEqual([])
            })

            test('given screen and point surrounded by other colors return screen with only the point updated', () => {
                // Arrange
                const screen: number[][] = [
                    [1, 1, 1],
                    [1, 0, 1],
                    [1, 1, 1]
                ]

                const expected: number[][] = [
                    [1, 1, 1],
                    [1, 2, 1],
                    [1, 1, 1]
                ]

                // Act
                RDP.fillColor(screen, [1, 1], 2)

                // Assert
                expect(screen).toEqual(expected)
            })

            test('given screen and point fill all adjacent points that are same color with new color', () => {
                // Arrange
                const screen: number[][] = [
                    [1, 1, 0, 1],
                    [1, 0, 0, 0],
                    [1, 1, 1, 1],
                ]

                const expected: number[][] = [
                    [1, 1, 2, 1],
                    [1, 2, 2, 2],
                    [1, 1, 1, 1],
                ]

                // Act
                RDP.fillColor(screen, [1, 1], 2)

                // Assert
                expect(screen).toEqual(expected)
            })

            test('given screen and point fill all adjacent points that are same color with new color', () => {
                // Arrange
                const screen: number[][] = [
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 0, 1, 1, 1, 1, 0, 1],
                    [1, 0, 0, 1, 1, 1, 0, 1],
                    [1, 0, 0, 0, 0, 1, 0, 1],
                    [1, 1, 1, 1, 0, 0, 0, 1],
                    [1, 1, 0, 1, 1, 0, 0, 1],
                    [1, 1, 1, 1, 1, 0, 1, 1],
                    [1, 1, 0, 0, 0, 0, 1, 1],
                ]

                const expected: number[][] = [
                    [1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 2, 1, 1, 1, 1, 2, 1],
                    [1, 2, 2, 1, 1, 1, 2, 1],
                    [1, 2, 2, 2, 2, 1, 2, 1],
                    [1, 1, 1, 1, 2, 2, 2, 1],
                    [1, 1, 0, 1, 1, 2, 2, 1],
                    [1, 1, 1, 1, 1, 2, 1, 1],
                    [1, 1, 2, 2, 2, 2, 1, 1],
                ]

                // Act
                RDP.fillColor(screen, [1, 1], 2)

                // Assert
                expect(screen).toEqual(expected)
            })
        })

        describe('9.10 Max stack of boxes', () => {
            test('given 0 boxes return empty stack', () => {
                expect(RDP.createStackR([])).toEqual([])
                expect(RDP.createStack([])).toEqual([])
            })

            test('given 1 box return box', () => {
                // Arrange
                const boxes: RDP.IBox[] = [
                    {
                        depth: 10,
                        height: 10,
                        width: 10
                    }
                ]

                expect(RDP.createStackR(boxes)).toEqual(boxes)
                expect(RDP.createStack(boxes)).toEqual(boxes)
            })

            test('given N boxes return height of max stack', () => {
                // Arrange
                const box = (width: number, height: number, depth: number): RDP.IBox => ({ depth, width, height })

                const boxes: RDP.IBox[] = [
                    box(10, 10, 10),
                    box(9, 9, 9),
                    box(5, 7, 7),
                    box(4, 8, 8),
                    box(3, 3, 3)
                ]
                const expected = [...boxes]
                expected.splice(2, 1)

                // Act

                // Assert
                expect(RDP.createStackR(boxes)).toEqual(expected)
                expect(RDP.createStack(boxes)).toEqual(expected)
            })
        })
    })
})