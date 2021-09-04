import { INode, serialize } from "./optionTreeNodes"

describe('optionalTreeNodes', () => {
    test('serializer with simply contatenates text nodes', () => {
        const tree: INode = {
            type: "neutral",
            nodes: [
                {
                    type: "text",
                    text: "starting text "
                },
                {
                    type: "inline",
                    nodes: [
                        {
                            type: "text",
                            text: "$required",
                        }
                    ],
                    data: "required"
                },
                {
                    type: "text",
                    text: " end text"
                }
            ],
            text: undefined
        }

        const treeWithOptional: INode = {
            type: "neutral",
            nodes: [
                {
                    type: "text",
                    text: "starting text "
                },
                {
                    type: "inline",
                    nodes: [
                        {
                            type: "text",
                            text: "$required",
                        }
                    ],
                    data: "required"
                },
                {
                    type: "text",
                    text: " end text"
                },
                {
                    type: "optional",
                    nodes: [
                        {
                            type: "text",
                            text: "[ start optional "
                        },
                        {
                            type: "inline",
                            nodes: [
                                {
                                    type: "text",
                                    text: "$optional",
                                }
                            ],
                            data: "optional"
                        },
                        {
                            type: "text",
                            text: " end optional]"
                        }
                    ]
                },
                {
                    type: "text",
                    text: " very end text"
                }
            ]
        }

        const valueMap = new Map<string, string>([
            ["required", "x"],
            ["optional", "o"]
        ])

        const partialValueMap = new Map<string, string>([
            ["required", "x"]
        ])

        expect(serialize(tree, valueMap)).toEqual("starting text x end text")
        expect(serialize(treeWithOptional, valueMap)).toEqual("starting text x end text start optional o end optional very end text")
        expect(serialize(treeWithOptional, partialValueMap)).toEqual("starting text x end text very end text")
    })
})