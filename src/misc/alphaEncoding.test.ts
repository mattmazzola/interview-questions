import { convertListOfNumbersToNumber, encode } from './alphaEncoding'

describe("alphaEncoding", () => {
    describe("convertNumbersToNumbers", () => {
        test("given list of numbers convert to number", () => {
            expect(convertListOfNumbersToNumber([1,2,3,4])).toBe(1234)
            expect(convertListOfNumbersToNumber([3,2,6,1])).toBe(3261)
        })
    })

    describe("encode", () => {
        test("convert letters to number", () => {
            expect(encode('BEAN')).toBe(25114)
        })
    })
})