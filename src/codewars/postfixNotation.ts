/** https://www.codewars.com/kata/infix-to-postfix-converter?utm_source=newsletter */
/**https://en.wikipedia.org/wiki/Shunting-yard_algorithm */

export interface INode {
    value: string
    left: INode | null | undefined
    right: INode | null | undefined
}

export interface IToken {
    type: TokenType
    value: string
}

export enum TokenType {
    Number,
    Operator,
    LeftParenthesis,
    RightParenthesis
}

export function convertAlgebriacToPostfix(s: string): string {
    return s
}

export interface IOperatorOptions {
    associativity: IAssociativity
    precedence: IPrecedence
}

export enum IAssociativity {
    Left,
    Right
}

export type IPrecedence = number

export const associativity: { [x: string]: string } = {
    "^": "right",
    "*": "left",
    "/": "left",
    "+": "left",
    "-": "left"
}

export const precendence: { [x: string]: number } = {
    "^": 4,
    "*": 3,
    "/": 3,
    "+": 2,
    "-": 2
}

export function tokenizer(s: string): IToken[] {
    return s.split('')
        .map(c => {
            if (c === '(') {
                return {
                    type: TokenType.LeftParenthesis,
                    value: c
                }
            }
            else if (c === ')') {
                return {
                    type: TokenType.RightParenthesis,
                    value: c
                }
            }
            else if (associativity[c] != null) {
                return {
                    type: TokenType.Operator,
                    value: c
                }
            }

            return {
                type: TokenType.Number,
                value: c
            }
        })
}

export function peek<T>(xs: T[]): T {
    return xs.slice(-1)[0]
}

export function addNode(xs: INode[], value: string): void {
    const right = xs.pop()
    const left = xs.pop()

    xs.push({
        value,
        left,
        right
    })
}
export function parseTree(s: string): INode {
    console.log('s: ', s)
    const outputTree: INode[] = []
    const operatorStack: string[] = []

    const tokens = s.split('')

    tokens.forEach(t => {
        if (t === '(') {
            operatorStack.push(t)
        }
        else if (t === ')') {
            // Pop everything util the opening parenthesis and discard perenthesis
            while (peek(operatorStack) !== '(') {
                addNode(outputTree, operatorStack.pop()!)
            }
            operatorStack.pop()
        }
        else if (associativity[t] != null) {
            const topOperator = peek(operatorStack)
            // If stack contains operators
            if (topOperator) {
                // If current operator is left associative and lower or equal precendence than last operator
                // flush the stack of operators on to the queue
                if ((associativity[t] === 'left'
                    && precendence[t] <= precendence[topOperator])
                    || (associativity[t] === 'right'
                        && precendence[t] < precendence[topOperator])) {
                    addNode(outputTree, operatorStack.pop()!)
                }
            }

            operatorStack.push(t)
        }
        else {
            outputTree.push({
                value: t,
                left: null,
                right: null
            })
        }

        // console.log(`output: `, outputTree)
        // console.log(`operator: `, operatorStack)
    })

    while (operatorStack.length > 0) {
        addNode(outputTree, operatorStack.pop()!)
    }

    return outputTree[0]
}

export function toRpn(node: INode): string {
    if (node.left == null && node.right == null) {
        return node.value
    }

    return `${toRpn(node.left!)}${toRpn(node.right!)}${node.value}`
}

export function parse(s: string): string {
    // console.log('s: ', s)
    const outputQueue: string[] = []
    const operatorStack: string[] = []

    const tokens = s.split('')

    tokens.forEach(t => {
        if (t === '(') {
            operatorStack.push(t)
        }
        else if (t === ')') {
            // Pop everything util the opening parenthesis and discard perenthesis
            while (peek(operatorStack) !== '(') {
                outputQueue.push(operatorStack.pop()!)
            }
            operatorStack.pop()
        }
        else if (associativity[t] != null) {
            const topOperator = peek(operatorStack)
            // If stack contains operators
            if (topOperator) {
                // If current operator is left associative and lower or equal precendence than last operator
                // flush the stack of operators on to the queue
                if ((associativity[t] === 'left'
                    && precendence[t] <= precendence[topOperator])
                    || (associativity[t] === 'right'
                        && precendence[t] < precendence[topOperator])) {
                    outputQueue.push(operatorStack.pop()!)
                }
            }

            operatorStack.push(t)
        }
        else {
            outputQueue.push(t)
        }

        // console.log(`output: `, outputQueue)
        // console.log(`operator: `, operatorStack)
    })

    const rpn = [
        ...outputQueue,
        ...[...operatorStack].reverse()
    ].join('')

    return rpn
}
