/**
 * There are a number of spherical balloons spread in two-dimensional space. For each balloon, provided input is the start and end coordinates of the horizontal diameter. Since it's horizontal, y-coordinates don't matter and hence the x-coordinates of start and end of the diameter suffice. Start is always smaller than end. There will be at most 104 balloons.
 *
 * An arrow can be shot up exactly vertically from different points along the x-axis. A balloon with xstart and xend bursts by an arrow shot at x if xstart ≤ x ≤ xend. There is no limit to the number of arrows that can be shot. An arrow once shot keeps travelling up infinitely. The problem is to find the minimum number of arrows that must be shot to burst all balloons.
 */

export const mininumArrowsToBurstBallonsGreedy = (balloons: number[][]): number => {
    if (!balloons || balloons.length === 0) {
        return 0
    }
    
    let minEnd = Number.MAX_VALUE

    balloons.sort(([baMin, baMax], [bbMin, bbMax]) => baMin - bbMin)

    return balloons
        .reduce((minArrows, [start, end]) => {
            // If next balloon is not overlapping with current group of balloons
            // Use arrow to shoot existing group and use new arrow for next group
            // Reset minEnd to this balloons end,
            // Otherwise, balloon can be included within the group and popped with existing arrow
            if (start > minEnd) {
                minArrows++
                minEnd = end
            }
            else {
                minEnd = Math.min(minEnd, end)
            }

            return minArrows
        }, 0) + 1
}

export const mininumArrowsToBurstBallons = (balloons: number[][]): number => {
    const balloonFrequencyMap = getBalloonFrequencyMap(balloons)
    let sortedBalloonFrequencies = sortedBalloonFrequencyMap(balloonFrequencyMap)
    let arrows = 0

    while (sortedBalloonFrequencies.length > 0) {
        const position = sortedBalloonFrequencies[0]
        const balloonsHit = [...balloonFrequencyMap[position]]

        balloonsHit.forEach(balloon => {
            reduceFrequencies(balloonFrequencyMap, balloon)
        })

        delete balloonFrequencyMap[position]
        
        sortedBalloonFrequencies = sortedBalloonFrequencyMap(balloonFrequencyMap)
        arrows++
    }

    return arrows
}


export const getBalloonFrequencyMap = (balloons: number[][]): { [x: number]: number[][] } => {
    return balloons.reduce((map: { [x: number]: number[][] }, balloon) => {
        const [min, max] = balloon

        for(let i = min; i <= max; i++) {
            if (!map[i]) {
                map[i] = [balloon]
            }
            else {
                map[i].push(balloon)
            }
        }
        return map
    }, {})
}

export const reduceFrequencies = (balloonFrequency: { [x: number]: number[][] }, balloon: number[]): void => {
    const [min, max] = balloon

    for(let i = min; i <= max; i++) {
        const existingBalloons = balloonFrequency[i]
        const balloonIndex = existingBalloons.indexOf(balloon)

        if (balloonIndex === -1) {
            throw new Error(`Did not find balloon at expected position: ${i}. Balloon [${min}, ${max}]`)
        }

        existingBalloons.splice(balloonIndex, 1)
        balloonFrequency[i] = existingBalloons
    }
}

export const sortedBalloonFrequencyMap = (balloonFrequency: { [x: number]: number[][] }): number[] => {
    return Object.keys(balloonFrequency)
        .map(k => ({
            position: parseInt(k),
            count: balloonFrequency[parseInt(k)].length
        }))
        .filter(x => x.count !== 0)
        .sort((a, b) => b.count - a.count)
        .map(x => x.position)
}
