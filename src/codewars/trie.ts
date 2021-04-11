/** https://www.codewars.com/kata/build-a-trie */
/** Build a Trie from given strings */

export interface ITrie {
    [s: string]: ITrie | null
}

export function trie (...strings: string[]): ITrie {
    if (strings.length === 0) {
        return {}
    }

    const words = strings
        .map(s => s.trim())
        .filter(s => s.length > 0)

    return words.reduce((trie, word) => {
        createTrie(trie, word, 1)
        return trie
    }, {})
}

const createTrie = (trie: ITrie, word: string, splitIndex: number): ITrie | null => {
    // If at end of word mark terminal
    if (splitIndex === word.length) {
        trie[word] = { '<S>': {} }
        return trie
    }
    
    const prefix = word.slice(0,splitIndex)
    if(trie[prefix]) {
        trie[prefix] = createTrie(trie[prefix]!, word, splitIndex + 1)
    }
    else {
        trie[prefix] = createTrie({}, word, splitIndex + 1)
    }

    return trie
}

type TrieData = {
    [k: string]: TrieData
}

export class Trie {
    private static terminalString = '<S>'
    data: TrieData = {}
    
    insert(s: string) {
        let currentTrie = this.data

        const chars = s.split('')

        for(const [index, char] of chars.entries()) {
            const isLastChar = index === (chars.length - 1)

            // if char does not exist, add char with reference to empty trie
            if (!currentTrie[char]) {
                currentTrie[char] = {}
            }

            // Update current trie for next char
            currentTrie = currentTrie[char]

            if (isLastChar) {
                currentTrie[Trie.terminalString] = {}
            }
        }
    }
}