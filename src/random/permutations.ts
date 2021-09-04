export const permutations = (s: string): string[] => {
    if (s.length === 1) {
        return [s]
    }

    const head = s.slice(0, 1)
    const tail = s.slice(1)

    const tailPermutations = permutations(tail)

    return tailPermutations.map(permutation => {
        const ps = permutation
            .split('')
            .map((char, i, chars) => {
                const copy = [...chars]
                copy.splice(i, 0, head)
                return copy.join('')
            })

        ps.push(`${permutation}${head}`)

        return ps
    })
        .reduce((a, b) => a.concat(b))
}