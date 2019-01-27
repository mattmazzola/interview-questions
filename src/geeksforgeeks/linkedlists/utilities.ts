import * as models from './models'

export function getNodeValues <T>(list: models.INode<T>): T[] {
    if (list === null) {
        return []
    }

    const values: T[] = []

    let current: models.INode<T> | null = list
    do {
        values.push(current.value)
        current = current.next
    }
    while (current != null)

    return values
}

export function createFromString (s: string): models.INode<string> {
    let first: models.INode<string> | null = null
    
    s.split('')
        .reduce<models.INode<string> | null>((last, c) => {
            const node: models.INode<string> = {
                value: c,
                next: null
            }

            if (last === null) {
                last = node
                first = last
            }
            else {
                last.next = node
            }

            return node
        }, null)

    return first!
}