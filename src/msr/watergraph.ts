/**
 * Given a bar graph represented as array on integers. Imagine water is poured on top
 * of the bars and compute a new array where representing the height of the water on top of each bar
 * 
 * Example:
 * Input: 
 * 
 * 8                       #
 * 7                   # # #     #
 * 6                   # # # #   #
 * 5             #     # # # #   #     
 * 4             # #   # # # #   # #   
 * 3           # # #   # # # #   # #   #
 * 2         # # # # # # # # #   # # # # 
 * 1       # # # # # # # # # # # # # # # # 
 *        [1,2,3,5,4,2,7,7,8,6,1,7,4,2,3,1]
 * 
 * Pour water on top until it fills gaps
 * 
 * 8                       #
 * 7                   # # # o o #
 * 6                   # # # # o #
 * 5             # o o # # # # o #     
 * 4             # # o # # # # o # #   
 * 3           # # # o # # # # o # # o #
 * 2         # # # # # # # # # o # # # # 
 * 1       # # # # # # # # # # # # # # # # 
 *        [1,2,3,5,4,2,7,7,8,6,1,7,4,2,3,1]
 * 
 * should return
 * 
 *        [0,0,0,0,1,3,0,0,0,1,6,0,0,1,0,0]
 */

export const findWaterValues = (xs: number[]): number[] => {
    const maxesToLeft = xs.map(maxes())
    const maxesToRight = xs.slice().reverse().map(maxes()).reverse()

    return xs.map((x, i) => Math.min(maxesToLeft[i], maxesToRight[i]) - x)
}

export const maxes = (): (x: number, i: number, xs: number[]) => any => {
    let currentMax = 0
    return (u: number, j, us) => {
        currentMax = Math.max(currentMax, u)
        return currentMax
    }
}



