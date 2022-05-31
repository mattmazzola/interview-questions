/**
 * Set Game
 * Find all sets
 * 
 * https://www.setgame.com/set/puzzle
 * 
 * A SET consists of 3 cards win which each of the cards' features. looked at one-by-one, are the same on each card , or, or different on each ard.
 * In other words, the shape must be all the same on all 3 cards, or different on each of the 3 cards.
 */

export function findSets(board: Board): Set[] {
    const cardCoordinates = flattenBoard(board)
    const triplets = getTriplets(cardCoordinates)
    const sets = triplets.filter(triplet => isSet(triplet.map(t => t.card)))

    return sets
}

type Board = Card[][]
type Triplet = [CardCoordinate, CardCoordinate, CardCoordinate]
type Set = Triplet
type Coordinate = [number, number]

type CardCoordinate = {
    card: Card,
    coordinate: Coordinate
}

export function flattenBoard(board: Board): CardCoordinate[] {
    const maxRowsIndex = board.length
    if (maxRowsIndex === 0) {
        return []
    }

    const maxColsIndex = board[0].length

    const cards: CardCoordinate[] = []

    for (let i = 0; i < maxRowsIndex; i += 1) {
        for (let j = 0; j < maxColsIndex; j += 1) {
            const card = board[i][j]
            if (card) {
                cards.push({
                    card,
                    coordinate: [i,j]
                })
            }
        }
    }

    return cards
}

export function getTriplets(cardCoordinates: CardCoordinate[]): Triplet[] {
    const triplets: Triplet[] = []

    return triplets
}

const propertyAccessors: ((c: Card) => Shape | Shading | Color | number)[] = [
    c => c.shape,
    c => c.shading,
    c => c.color,
    c => c.number,
]

export function isSet(cards: Card[]): boolean {
    let isCardsASet = propertyAccessors.every(propertyAccessor => {
        const cardsProps = cards.map(c => propertyAccessor(c))
        const propsSet = new Set<ReturnType<typeof propertyAccessor>>([...cardsProps])

        const areAllPropertiesTheSame = propsSet.size === 1
        const areAllPropertiesDifferent = propsSet.size === 3

        return areAllPropertiesTheSame
            || areAllPropertiesDifferent
    }) 

    return isCardsASet
}

enum Shape {
    Squiggle,
    Ovals,
    Diamond,
}

enum Color {
    RED,
    PURPLE,
    GREEN,
}

enum Shading {
    SOLID,
    STRIPED,
    OUTLINED,
}

type Card = {
    shape: Shape
    color: Color
    shading: Shading
    number: number
}

function rand(range: number, min = 0) {
    return Math.floor(Math.random() * range) + min
}

function randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = Object.keys(anEnum)
        .map(n => Number.parseInt(n))
        .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
    const randomIndex = rand(enumValues.length)
    const randomEnumValue = enumValues[randomIndex]

    return randomEnumValue
}

export function getRandomCard(): Card {
    const card: Card = {
        color: randomEnum(Color),
        shape: randomEnum(Shape),
        shading: randomEnum(Shading),
        number: rand(3, 1)
    }

    return card
}

export function generateCards(width = 4, height = 3): Card[] {
    const numCards = width * height
    const cards = Array.from({ length: numCards }, _ => getRandomCard())

    return cards
}

export function generateBoard(width = 4, height = 3): Board {
    const board: Board = []

    // For each row, generate row and add to rows
    for (let i = 0; i < height; i += 1) {
        const row: Card[] = []
        // For each column, generate card and add to row
        for (let j = 0; j < width; j += 1) {
            const card = getRandomCard()

            row.push(card)
        }

        board.push(row)
    }

    return board
}
