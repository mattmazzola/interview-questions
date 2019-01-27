/** https://www.codewars.com/kata/dependency-injection?utm_source=newsletter */

interface IDependencies {
    [k: string]: Function
}
export class DI {
    private deps: IDependencies = {}

    constructor(deps: IDependencies) {
        this.deps = deps
    }

    inject(fn: Function): Function {
        const argsRegEx = /function[\s]*\(\s*(.+)\)/
        const argsMatch = fn.toString().match(argsRegEx)
        if (!argsMatch) {
            return fn
        }

        const args = argsMatch[1].split(',').map(s => s.trim())
        const fns = args.map(depString => {
            const f = this.deps[depString]
            if (!f) {
                throw new Error(`You specified dependency: ${depString} but none was found.`)
            }

            return f
        })
        
        return fn.apply(null, fns)
    }
}