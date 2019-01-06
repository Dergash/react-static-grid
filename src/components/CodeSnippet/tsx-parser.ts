export type ITokenType = 'text' | 'entity' | 'control' | 'string' | 'type' | 'comment'

export interface ILineToken {
    type: ITokenType,
    text: string
}

const entities = [
    'var', 'let', 'const',
    'function', 'class',
    'interface', 'type'
]

const controls = [
    'import', 'as', 'from',
    'if', 'else',
    'return',
    'export', 'default'
]

const stringSeparators = ['\'', '\"', '\`']

const spaceToken: ILineToken = { type: 'text', text: ' ' }

export function splitLineToTokens(line: string) {
    let isComment = false
    let isString = false
    const tokens = line.split(' ').reduce((acc: ILineToken[], word, index) => {
        let type: ITokenType = getTokenType(word.trim())
        if (type === 'comment') {
            isComment = true
        }
        if (isComment) {
            type = 'comment'
        }
        if (type === 'string') {
            isString = !isString
        }
        if (isString) {
            type = 'string'
        }
        acc.push({ type, text: word })
        if (index !== line.length - 1) {
            acc.push(spaceToken)
        }
        return acc
    }, [])
    return tokens
}

export function splitWordToTokens(word: string) {
    const tokens = [{ type: 'text', text: '' }]
    let index = 0
    let isString = false
    const chars = [ ...word ]
    chars.forEach((char) => {
        if (stringSeparators.includes(char)) { // TODO: should match specific open/close pair
            index++
            isString = !isString
        }
        if (tokens.length - 1 !== index) {
            tokens.push({ type: isString ? 'string' : 'text', text: char })
        } else {
            tokens[index].text += char
        }
    })
    return tokens
}

function getTokenType(word: string) {
    let type: ITokenType = 'text'
    if (entities.includes(word)) {
        type = 'entity'
    }
    if (controls.includes(word)) {
        type = 'control'
    }
    if (stringSeparators.includes(word[0]) && stringSeparators.includes(word[word.length - 1])) {
        type = 'string'
    }
    if (word.startsWith('//') || word.startsWith('/*')) {
        type = 'comment'
    }
    return type
}
