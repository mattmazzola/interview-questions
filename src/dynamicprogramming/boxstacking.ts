/**
 * Given n boxes [(L1, W1, H1), (L2, W2, H2), ... (Ln, Wn, Hn)] where box i has
 * length Li, width Wi and height Hi, find the height of the tallest possible stack.
 *
 * Box (Li, Wi, Hi) can be placed on top of box (Lj, Wj, Hj) if and only if Li < Lj and Wi < Wj.
 */

export type Box = [number, number, number]

export function tallestStack(boxes: Box[]): number {
    // If the array is empty, return 0
    if (boxes.length === 0) {
        return 0
    }

    // Sort boxes by area in descending order
    // boxes.sort((a, b) => b[0] * b[1] - a[0] * a[1])

    // For each box, get a list of boxes that can be placed on top of it
    const boxToStackableBoxes = new Map<Box, Box[]>()
    for (const box of boxes) {
        boxToStackableBoxes.set(box, [])

        for (const otherBox of boxes) {
            // Skip it not self
            if (box === otherBox) {
                continue
            }

            // If otherBox can be placed on top of box, add it to the list
            const [bl, bw] = box
            const [ol, ow] = otherBox
            if (bl > ol && bw > ow) {
                boxToStackableBoxes.get(box)!.push(otherBox)
            }
        }
    }

    // Build a map between box and the height of the tallest stack that can be built with it
    const boxToStackHeight = new Map<Box, number>()
    for (const box of boxes) {
        const [,, bh] = box
        boxToStackHeight.set(box, bh)
    }

    // For each box, find the tallest stack that could be build with other boxes that can be placed on top of it
    for (const box of boxes) {
        for (const stackableBox of boxToStackableBoxes.get(box)!) {
            const [,, bh] = box
            boxToStackHeight.set(box, Math.max(boxToStackHeight.get(box)!, boxToStackHeight.get(stackableBox)! + bh))
        }
    }

    // Return the height of the tallest stack
    return Math.max(...boxToStackHeight.values())
}
