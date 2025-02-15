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
    boxes.sort((a, b) => b[0] * b[1] - a[0] * a[1])

    return boxes[0][2]
}
