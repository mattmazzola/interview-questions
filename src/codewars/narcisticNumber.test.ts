import isNarcisticNumber from './narcisticNumber'

describe('isNarcistic', () => {
    test("153 is true", () => {
        expect(isNarcisticNumber(153)).toBe(true)
    })

    test("1533 is false", () => {
        expect(isNarcisticNumber(1533)).toBe(false)
    })
})