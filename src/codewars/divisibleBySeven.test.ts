import { divisibleBySeven } from './divisibleBySeven'

xdescribe("Code Wars", () => {
    describe("Divisible By Seven", () => {
        test("given binary number return true if divisible by 7 false otherwise", () => {
            const numbers = [
                "0111",
                "1110",
                "00010101",
                "00011100",
                "00100011",
                "00101010",
                "00110001",
                "00111000",
                "00111111",
                "01000110",
                "01001101",
                "01010100",
                "01011011",
                "01100010",
            ]

            numbers.forEach(n => {
                expect(divisibleBySeven(n)).toBe(true)
            })

        })
    })
})