export const palindromePartitioning = (s: string): number => {
    const cuts = []
    let imin = 0
    let imax = s.length

    while (imin !== imax) {
        if (isPalindrome(s.substring(imin, imax))) {
            cuts.push(imax)
            imin = imax
            imax = s.length
        }
        else {
            imax--
        }
    }

    return cuts.length - 1
}

export interface IPalindrome {
    s: string
    start: number,
    end: number
}

export const isPalindrome = (s: string): boolean => {
    if (s.length <= 1) {
        return true
    }

    return (s[0] === s[s.length - 1]) && isPalindrome(s.substring(1, s.length - 1))
}
