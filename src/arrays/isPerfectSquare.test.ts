import { isPerfectSquare } from "./isPerfectSquare"

describe("Is Perfect Square", () => {
    test("should return true for perfect squares", () => {
        expect(isPerfectSquare(1)).toBe(true)
        expect(isPerfectSquare(4)).toBe(true)
        expect(isPerfectSquare(9)).toBe(true)
        expect(isPerfectSquare(16)).toBe(true)
        expect(isPerfectSquare(25)).toBe(true)
        expect(isPerfectSquare(36)).toBe(true)
        expect(isPerfectSquare(49)).toBe(true)
        expect(isPerfectSquare(64)).toBe(true)
        expect(isPerfectSquare(81)).toBe(true)
        expect(isPerfectSquare(100)).toBe(true)
    })

    test("should return false for non-perfect squares", () => {
        expect(isPerfectSquare(2)).toBe(false)
        expect(isPerfectSquare(3)).toBe(false)
        expect(isPerfectSquare(5)).toBe(false)
        expect(isPerfectSquare(6)).toBe(false)
        expect(isPerfectSquare(7)).toBe(false)
        expect(isPerfectSquare(8)).toBe(false)
        expect(isPerfectSquare(10)).toBe(false)
        expect(isPerfectSquare(11)).toBe(false)
        expect(isPerfectSquare(12)).toBe(false)
        expect(isPerfectSquare(13)).toBe(false)
        expect(isPerfectSquare(14)).toBe(false)
        expect(isPerfectSquare(15)).toBe(false)
    })
}
)
