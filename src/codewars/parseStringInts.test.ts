import { parseStringInts } from './parseStringInts'

describe('Code Wars', () => {
    xdescribe("parseStringInt", () => {
        test("given a string translate it to an integer", () => {
            expect(parseStringInts("one")).toBe(1)
            expect(parseStringInts("twenty")).toBe(20)
            expect(parseStringInts("two hundred forty-six")).toBe(246)
        })
    })
})