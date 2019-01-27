import * as ll from './index'

describe("linked lists", () => {
    describe(`compared strings`, () => {
        test(`given to identical strings return 0`, () => {
            const s1 = ll.utilities.createFromString("idential")

            expect(ll.compareStrings(s1, s1)).toBe(0)
        })

        test(`given two difference strings return compare value`, () => {
            // Arrange
            const s1 = ll.utilities.createFromString("apple")
            const s2 = ll.utilities.createFromString("applz")
            const s3 = ll.utilities.createFromString(`apble`)
    
            // Act + Assert
            expect(ll.compareStrings(s1, s2)).toBe(-1)
            expect(ll.compareStrings(s1, s3)).toBe(1)
        })
    })

    describe(`add to linked lists of numbers`, () => {
        test(`given two linked lists add the numbers`, () => {
            // Arrange
            const ll1: ll.models.INode<number> = {
                value: 1,
                next: {
                    value: 2,
                    next: {
                        value: 3,
                        next: null
                    }
                }
            }
            
            const ll2: ll.models.INode<number> = {
                value: 4,
                next: {
                    value: 5,
                    next: {
                        value: 6,
                        next: null
                    }
                }
            }

            // Act + Assert
            expect(ll.addTwoNumbers(ll1, ll2)).toBe(579)

        })
    })
})