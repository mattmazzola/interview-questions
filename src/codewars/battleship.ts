/** https://www.codewars.com/kata/battleship-field-validator?utm_source=newsletter */

export type IBattleField = number[][]

export interface IFieldResult {
    has: boolean
    field: IBattleField
}

export type IShipRequirement = [number, number]

const defaultShipRequirements: IShipRequirement[] = [
    [1, 4],
    [2, 3],
    [3, 2],
    [4,1],
]

export function testField (field: IBattleField, ships: IShipRequirement[] = defaultShipRequirements): boolean {
    // Check total
    const expectedHits = ships.reduce((total, [number, size]) => {
        total += number * size
        return total
    }, 0)

    if (totalHits(field) !== expectedHits) {
        return false
    }

    const battleshipField = getShips(field, ships[0][0], ships[0][1])
    if (!battleshipField.has) {
        return false
    }

    const cruiserField = getShips(battleshipField.field, ships[1][0], ships[1][1])
    if (!cruiserField.has) {
        return false
    }

    const destroyersFeild = getShips(cruiserField.field, ships[2][0], ships[2][1])
    if (!cruiserField.has) {
        return false
    }

    const subsResult = getShips(destroyersFeild.field, ships[3][0], ships[3][1])
    if (!subsResult) {
        return false
    }

    return true
}

export function getShips (field: IBattleField, amount: number, size: number): IFieldResult {
    let newField = copyField(field)
    let shipsFound = 0
    let currentSize = 0

    // Find ship within rows
    for(let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[0].length; j++) {
            // console.log(`field[${i}][${j}]: ${field[i][j]}`)
            if (field[i][j]) {
                currentSize++

                // If current size is same size as intended ship we found a ship
                // Increase the ships found tracker and reset current size for next turn
                if (currentSize === size) {
                    shipsFound++
                    currentSize = 0

                    // Take ship out of new field
                    for (let k = 0; k < size; k++) {
                        newField[i][j-k] = 0
                    }
                }

                // console.log(shipsFound, currentSize)
            }
            else {
                currentSize = 0
            }
        }

        // Reset for every new row
        currentSize = 0

        if (shipsFound === amount) {
            return {
                has: true,
                field: newField
            }
        }
    }    

    // Find ship within rows
    for (let i = 0; i < field[0].length; i++) {
        for (let j = 0; j < field.length; j++) {
            // console.log(`field[${j}][${i}]: ${field[j][i]}`)
            if (field[j][i]) {
                currentSize++

                // If current size is same size as intended ship we found a ship
                // Increase the ships found tracker and reset current size for next turn
                if (currentSize === size) {
                    shipsFound++
                    currentSize = 0
                    // console.log(`ship found! `, shipsFound)

                    // Take ship out of new field
                    for (let k = 0; k < size; k++) {
                        newField[j-k][i] = 0
                    }
                }
                // console.log(shipsFound, currentSize)
            }
            else {
                currentSize = 0
            }
        }
        // Reset for every new column
        currentSize = 0

        if (shipsFound === amount) {
            return {
                has: true,
                field: newField
            }
        }
    }

    return {
        has: false,
        field
    }
}

export function copyField (field: IBattleField): IBattleField {
    const newField: IBattleField = Array.from(Array(field.length), (_, i) =>
        Array.from(Array(field[0].length), (_,j) => field[i][j]))

    return newField
}

export function totalHits (field: IBattleField): number {
    return field.reduce((total, row) => {
        const rt = row.reduce((rowTotal, cell) => {
            if (cell) {
                rowTotal += 1
            }
            return rowTotal
        }, 0)

        return total + rt
    }, 0)
}