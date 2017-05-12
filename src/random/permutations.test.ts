import { permutations } from './permutations'


describe('permutations', () => {
    test('permutations of single charater are single character', () => {
        expect(permutations('a')).toEqual(['a'])
    })

    test('permutations of ab are ab, bc', () => {
        expect(permutations('ab')).toEqual(['ab', 'ba'])
    })

    test('permutations of three letters are permutations of two plus the extra inserted at each place', () => {
        expect(permutations('abc')).toEqual(['abc', 'bac', 'bca', 'acb', 'cab', 'cba'])
    })
})