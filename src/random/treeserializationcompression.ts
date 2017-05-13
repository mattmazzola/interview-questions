/**
 * Given a binary tree write two functions; one to save it to file and another to load it form the file
 * The tree would be sufficiently large such as a billions nodes
 */

export interface INode<T> {
    value: T
    left: INode<T> | null
    right: INode<T> | null
}

/**
 * Simulate file by saving to string within object that can be passed by reference instead of by value
 */
export interface IFile {
    value: string
    index: number
}

export const save = <T>(root: INode<T>, file: IFile = { value: "", index: 0 }): IFile => {
    file.value += `${root.value},`

    if (root.left) {
        save(root.left, file)
    }
    else {
        file.value += `null,`
    }

    if (root.right) {
        save(root.right, file)
    }
    else {
        file.value += `null,`
    }

    return file
}

export const restore = (file: IFile): INode<number> | null => {
    const rootValue = readUntil(file, ',')

    if (rootValue === 'null') {
        return null
    }

    const root: INode<number> = {
        value: parseInt(rootValue),
        left: restore(file),
        right: restore(file)
    }

    return root
}

export const readUntil = (file: IFile, s: string): string => {
    let i = file.index
    while (file.value.charAt(i) !== s) {
        i++
    }

    const value = file.value.slice(file.index, i)
    file.index = i + 1

    return value
}