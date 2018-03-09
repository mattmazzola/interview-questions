/**
 * Given graph which contains nodes of different types: neutral, data, optional, and text(leaf) nodes
 * 
 * The tree will be serialized via in order traversal; however, on data nodes the value will be replaced by the given data
 * On optional nodes, they will only be included in serialization if the data nodes inside it have given values
 * 
 * E.g.
 * 
 * function (node: any, valueMap: Map<string, string>): string
 * 
 * "Some text with $required data" + [["required", "Required Value"]]
 * "Some text with Required Value data"
 * 
 * "Some text with $required data[ and $optional data]" + [["required", "Required Value"]]
 * "Some text with Required Value data"
 * 
 * "Some text with $required data[ and $optional data]" + [["required", "Requird Value"], ["optional", "Optional Value"]]
 * "Some text with Required Value data and Optional Value"
 * 
 *          ------------------------ Root-----------------------
 *        /                   |              |                   \
 *     Text                  Data          Text        --------Optional-----
 *    'Some text with '   (required)     ' data'      /           |         \
 *                            |                     Text        Data       Text
 *                           Text                  ' and'    (optional)    ' data'
 *                        ($required)                             |
 *                                                              Text
 *                                                           ($optional)
 */

// Note: Node cannot have both text and nodes
// could use discriminated union, but whateva
export interface INode {
    type: "text" | "inline" | "optional" | "neutral"
    nodes?: INode[]
    text?: string
    data?: string // id
}

export function serialize(node: any, valuesMap: Map<string, string>) {
    const processedTree = removeOptionalNodes(node, Array.from(valuesMap.keys()))
    return serializeNode(processedTree, valuesMap)
}


export function getIds(node: any): string[] {
    const ids: string[] = []

    if (node.type === "inline") {
        ids.push(node.data)
    }

    if (node.nodes) {
        const childIds = node.nodes
            .map((n: any) => getIds(n))
            .reduce((totalIds: string[], nodeIds: string[]) => [...totalIds, ...nodeIds], [])

        ids.push(...childIds)
    }

    return ids
}

export function removeOptionalNodes(node: any, ids: string[]): any | undefined {
    if (node.type === "optional") {
        const optionalIds = getIds(node)
        const hasValues = optionalIds.every(i => ids.includes(i))
        return hasValues ? node : undefined
    }

    if (node.nodes) {
        node.nodes = node.nodes
            .map((n: any) => removeOptionalNodes(n, ids))
            .filter((n: any) => n)
    }

    return node
}

export function serializeNode(node: any, valuesMap: Map<string, string>) {
    if (node.type === "text") {
        return node.text
    }

    if (node.type === "inline") {
        return valuesMap.get(node.data)
    }
    
    const s = node.nodes.map((n: any) => serializeNode(n, valuesMap)).join('')

    return node.type === "optional"
        ? s.slice(1, -1)
        : s
}