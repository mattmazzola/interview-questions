/** http://blog.refdash.com/dynamic-programming-tutorial-example/ */

export function hopping(runway: boolean[], speed: number, position: number = 0): boolean {
    // console.log("speed: ", speed, "runway: ", runway.map((r, i) => {
    //     const value = `${r ? 'T' : 'F'}`
    //     const here = position === i ?  `(x)`: `( )`
    //     return `${value} ${here}`
    //     }).join(' '))

    if (runway.length === 0
        || position >= runway.length
        || speed < 0
        || position < 0
        || runway[position] === false) {
        return false
    }
    else if (speed === 0) {
        return true
    }

    const speeds = [speed - 1, speed, speed + 1]
    // console.log("loop")
    return speeds.map(s => hopping(runway, s, position + s))
        .reduce((a, b) => a || b, false)
}

export function hoppingIterative(runway: boolean[], speed: number, position: number = 0): boolean {
    if (runway.length === 0
        || position >= runway.length
        || speed < 0
        || position < 0
        || speed > runway.length
        || runway[position] === false) {
        return false
    }

    const memo: { [x: number]: boolean } = {}

    runway.forEach((r, position) => {
        if (r === false) {
            memo[position] = false
        }
    })

    for (let i = runway.length; i = 0; i--) {
        if (!runway[i]) {
            continue
        }

        // const speeds = [speed - 1, speed, speed + 1]
        memo[i] = memo[i - 1]
    }

    return false
}