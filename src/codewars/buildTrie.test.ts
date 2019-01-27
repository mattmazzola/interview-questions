import { trie, trie2 } from './buildTrie'

describe('buildTrie', () => {
    test('test', () => {
        expect(trie("test")).toBeTruthy()
    })

    test('test2', () => {
        expect(trie2("test")).toBeTruthy()
    })
})