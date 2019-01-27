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
    // console.log("splitIndex: ", splitIndex, "word: ", word, "length: ", word.length)
    if (splitIndex === word.length) {
        trie[word] = null
        return trie
    }
    const prefix = word.slice(0,splitIndex)
    const remaining = word.slice(splitIndex)

    if (remaining.length === 0) {
        // console.log("remaning: ", remaining, "return {}")
        trie[prefix] = {}
        return trie
    }

    if(trie[prefix]) {
        trie[prefix] = createTrie(trie[prefix]!, word, splitIndex + 1)
    }
    else {
        trie[prefix] = createTrie({}, word, splitIndex + 1)
    }

    // console.log("trie: ", trie)
    // console.log("word: ", word)
    // console.log("splitIndex: ", splitIndex)
    // console.log("prefix: ", prefix)
    // console.log("remaining: ", remaining)

    return trie
}


export function trie2 (...strings: string[]): ITrie {
    if (strings.length === 0) {
        return {}
    }

    const words = strings
        .map(s => s.trim())
        .filter(s => s.length > 0)

    return words.reduce((trie, word) => {
        const prefix = word.slice(0, 1)
        const remaining = word.slice(1).split('')
        createTrie2(trie, prefix, remaining)
        return trie
    }, {})
}

const createTrie2 = (trie: ITrie, prefix: string, remaining: string[]): ITrie => {
    // console.log("trie: ", trie, "prefix: ", prefix, "remaining: ", remaining)
    if (remaining.length == 0) {
        trie[prefix] = null
        return trie
    }
    
    const nextPrefix = remaining.slice(0, 1)[0]
    const nextRemaining = remaining.slice(1)
    // console.log("prefix: ", prefix, "remaning: ", remaining)
    if(trie[prefix]) {
        trie[prefix] = createTrie2(trie[prefix]!, nextPrefix, nextRemaining)
    }
    else {
        trie[prefix] = createTrie2({}, nextPrefix, nextRemaining)
    }

    return trie
}