import { decodeLetter, decode, encodeLetter, encode } from './ringEncoding'

describe("TIRR", () => {
    describe("Ring Encoding/Decoding", () => {
        describe("decoding", () => {
            test("given letter and offset return new letter", () => {
                expect(decodeLetter('a', 1)).toBe('b')
                expect(decodeLetter('a', 26)).toBe('a')
                expect(decodeLetter('a', 25)).toBe('z')
                expect(decodeLetter('z', 2)).toBe('b')
            })

            test("given array of encoded values decoded them", () => {
                expect(decode([1, 1])).toEqual('bc')
                expect(decode([25, 25, 25])).toEqual('zyx')
                expect(decode([1, 2, 3])).toEqual('bdg')
            })
        })

        describe("encoding", () => {
            test("given letter and previous letter return number", () => {
                expect(encodeLetter('a')).toBe(26)
                expect(encodeLetter('b')).toBe(1)
                expect(encodeLetter('a', 'a')).toBe(26)
                expect(encodeLetter('a', 'b')).toBe(25)
                expect(encodeLetter('a', 'z')).toBe(1)
            })

            test("given a phrase return array of encoded characters it", () => {
                expect(encode(`Abc`)).toEqual([26, 1, 1])
                expect(encode(`zyx`)).toEqual([25, 25, 25])
                expect(encode(`This work?`)).toEqual([19, 14, 1, 10, ' ', 4, 18, 3, 19, '?'])
            })
        })
    })
})