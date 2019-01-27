import { copyField, getShips, totalHits, testField, IBattleField } from './battleship'

describe("Code Wars", () => {
    describe("Battleship", () => {
        describe("copyField", () => {
            test("given field copyField should duplicate it without sharing memory", () => {
                // Arrange
                const field = [
                    [1,2],
                    [3,4]
                ]
                
                // Act
                const field2 = copyField(field)
                field2[1][1] = 5
                
                // Assert
                expect(field2).not.toEqual(field)
            })
        })

        describe("totalHits", () => {
            test("given field return total number of hits", () => {
                // Arrange
                const field = [
                    [1,0,0],
                    [1,1,1],
                    [1,0,0],
                ]

                // Act + Assert
                expect(totalHits(field)).toBe(5)
            })
        })

        describe("getShips", () => {
            test("given ship amount and size return if field contains ship and a new field", () => {
                // Arrange
                const fieldNone = [
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                ]

                const fieldHorizontal = [
                    [0,0,0,0],
                    [1,1,1,0],
                    [0,0,0,0],
                    [0,0,0,0],
                ]

                const fieldVertical = [
                    [0,0,0,0],
                    [0,0,1,0],
                    [0,0,1,0],
                    [0,0,1,0],
                ]

                // Act + Assert
                expect(getShips(fieldNone, 1, 3)).toEqual({ has: false, field: fieldNone })
                expect(getShips(fieldHorizontal, 1, 3)).toEqual({ has: true, field: fieldNone })
                expect(getShips(fieldVertical, 1, 3)).toEqual({ has: true, field: fieldNone })
            })
        })

        describe("test", () => {
            test("given field return true if it has all ships", () => {
                // Arrange
                const fieldTrue: IBattleField = [
                    [0,1,0,1,0,1,0,1,0,0],
                    [1,1,0,1,1,0,1,1,0,0],
                    [1,1,1,0,1,1,1,0,0,0],
                    [1,1,1,1,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                ]

                const fieldFalse: IBattleField = [
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0],                    
                ]

                // Act + Assert
                expect(testField(fieldTrue)).toBe(true)
                expect(testField(fieldFalse)).toBe(false)
            })
        })
    })
})