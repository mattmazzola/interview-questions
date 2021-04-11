import { trie, Trie } from './trie'

describe('Code Wars', () => {
    describe('Trie', () => {
        test('given empty string trie should be empty', () => {
            // Actual
            const input: string[] = []
            const expected = {}

            // Act
            const trie = new Trie()
            for (const word of input) {
                trie.insert(word)
            }

            // Assert
            expect(trie.data).toEqual(expected)
        })

        test('given small word should include each character and end in terminal string', () => {
            // Actual
            const input: string[] = [
                'test'
            ]
            const expected = { t: { e: { s: { t: { '<S>': {} } } } } }

            // Act
            const trie = new Trie()
            for (const word of input) {
                trie.insert(word)
            }

            // Assert
            expect(trie.data).toEqual(expected)
        })

        test('given multiple words should include each character and end in terminal string', () => {
            // Actual
            const input: string[] = [
                'test',
                'tester',
                'trie',
                'two',
            ]
            const expected = {
                t: {
                    e: {
                        s: {
                            t: {
                                '<S>': {},
                                e: { r: { '<S>': {} } }
                            }
                        }
                    },
                    r: { i: { e: { '<S>': {} } } },
                    w: { o: { '<S>': {} } }
                }
            }

            // Act
            const trie = new Trie()
            for (const word of input) {
                trie.insert(word)
            }

            // Assert
            expect(trie.data).toEqual(expected)
        })
    })

    describe('create trie', () => {
        test('given multiple words should include each character and end in terminal string', () => {
            // Actual
            const input: string[] = [
                'test',
                'tester',
                'trie',
                'two',
            ]
            const expected = {
                t: {
                    te: {
                        tes: {
                            test: { 
                                '<S>': {},
                                teste: {
                                    tester: { '<S>': {} }
                                }
                            }
                        }
                    },
                    tr: {
                        tri: {
                            trie: { '<S>': {} }
                        }
                    },
                    tw: {
                        two: { '<S>': {} }
                    }
                }
            }

            // Act
            const trie2 = trie(...input)

            // Assert
            expect(trie2).toEqual(expected)
        })
    })
})