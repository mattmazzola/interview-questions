/**
 * Imagine we’re working on a system that handles strings that can contain placeholder tokens.
 * Write a function string ExpandString(string input) that expands the tokens. 
 * Be aware that the tokens can contain other tokens.
 * 
 * Example : expand the input “${greeting}” 
 * Given the following substitutions : 
 * ${greeting} => Hello ${name} 
 * ${name} => ${title} ${family_name} 
 * ${title} => Miss 
 * ${family_name} => Alvarez 
 * 
 * ...this should return “Hello Miss Alvarez”. 
 * 
 * Assume you have the following helper functions available : 
 * 
 * // Returns empty list if no tokens in input 
 * List<string> FindTokens(string input);   
 * 
 * string GetTokenValue(string token); 
 * 
 * // Replaces all instances of “token” in “s” with “value” and returns the result. 
 * string ReplaceToken(string s, string token, string value); 
 */

type Substitution = [string, string]

export function expandStringFn(substitutions: Substitution[]) {
    const findTokens = findTokensFn(substitutions)
    const getTokenValue = getTokenValueFn(substitutions)

    return (input: string): string => {
        let output = input
        let tokens = findTokens(output)

        while (tokens.length > 0) {
            for (const token of tokens) {
                const tokenValue = getTokenValue(token)
                output = replaceToken(output, token, tokenValue)
            }

            tokens = findTokens(output)
        }

        return output
    }
}

function findTokensFn(substitutions: Substitution[]) {
    return (input: string,): string[] => {
        const tokens = substitutions.map(([token]) => token)
        const foundTokens = tokens.filter(t => input.includes(t))

        return foundTokens
    }
}

function getTokenValueFn(substitutions: Substitution[]) {
    return (token: string,): string => {
        const substitution = substitutions.find(([sToken]) => sToken === token)
        if (!substitution) {
            throw new Error(`Substitution for token ${token} was not found`)
        }

        const [_, value] = substitution

        return value
    }
}

function replaceToken(input: string, token: string, value: string): string {
    const escapedToken = escapeRegex(token)
    const newString = input.replace(new RegExp(escapedToken, 'g'), value)
    return newString
}

function escapeRegex(s: string) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}