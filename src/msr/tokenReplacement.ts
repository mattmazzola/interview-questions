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
export function expandString(input: string, substitutions: [string, string][]): string {

    let output = input

    let tokens = findTokens(output, substitutions)
    while (tokens.length > 0) {
        for(const token of tokens) {
            const tokenValue = getTokenValue(token, substitutions)
            output = replaceToken(output, token, tokenValue)
        }

        tokens = findTokens(output, substitutions)
    }

    return output
}

function findTokens(input: string, substitutions: [string, string][]): string[] {
    const tokens = substitutions.map(([token]) => token)
    const foundTokens = tokens.filter(t => input.includes(t))
    
    return foundTokens
}

function getTokenValue(token: string, substitutions: [string, string][]): string {
    const substitution = substitutions.find(([sToken]) => sToken === token)
    if (!substitution) {
        throw new Error(`Substitution for token ${token} was not found`)
    }

    const [_, value] = substitution

    return value
}

function escapeRegex(s: string) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function replaceToken(input: string, token: string, value: string): string {
    const escapedToken = escapeRegex(token)
    const newString = input.replace(new RegExp(escapedToken, 'g'), value)
    return newString
}