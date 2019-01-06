// TODO: Read something about parsers

export type ITokenType = 'unknown' | 'entity' | 'control'
    | 'string' | 'stringEncloser' | 'whitespace'
    | 'comment' | string

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

        if (type === 'whitespace') {
            if (acc[acc.length - 1] && acc[acc.length - 1].type === 'whitespace') {
                acc[acc.length - 1].text += ' '
            } else {
                acc.push({ type: 'whitespace', text: ' ' })
            }
        }
        const subTokens: ILineToken[] = []
        if (type === 'stringEncloser') {
            const wordTokens = splitWordToTokens(word)
            wordTokens.forEach(wordToken => {
                const prev = subTokens[subTokens.length - 1]
                if (isString && !prev) {
                    acc[acc.length - 1].text += wordToken.text
                    acc[acc.length - 1].type = wordToken.type === 'stringEncloser'
                        ? 'string'
                        : acc[acc.length - 1].type
                } else if (isString && prev) {
                    prev.text += wordToken.text
                    prev.type = wordToken.type === 'stringEncloser'
                        ? 'string'
                        : prev.type
                } else {
                    subTokens.push(wordToken)
                }
                if (wordToken.type === 'stringEncloser') {
                    isString = !isString
                }
            })
            acc = [ ...acc, ...subTokens ]
        } else if (!isString && word) {
            acc.push({ type, text: word })
        }
        if (isString && type !== 'stringEncloser') {
            acc[acc.length - 1].text += word
        }
        if (index !== line.length - 1 && type !== 'whitespace') {
            if (isString) {
                acc[acc.length - 1].text += ' '
            } else {
                acc.push({ type: 'whitespace', text: ' ' })
            }
        }
        return acc
    }, [])
    return tokens
}

export function splitWordToTokens(word: string) {
    const tokens: ILineToken[] = [{ type: 'unknown', text: '' }]
    const chars = [ ...word ]
    chars.forEach(char => {
        if (stringSeparators.includes(char)) {
            tokens.push({ type: 'stringEncloser', text: char })
            tokens.push({ type: 'unknown', text: '' })
        } else {
            tokens[tokens.length - 1].text += char
        }
    })
    return tokens.filter(token => token.text)
}

function getTokenType(word: string) {
    let type: ITokenType = 'unknown'
    if (entities.includes(word)) {
        type = 'entity'
    }
    if (controls.includes(word)) {
        type = 'control'
    }
    if ([...word].some(char => stringSeparators.includes(char))) {
        type = 'stringEncloser'
    }
    if (word.startsWith('//') || word.startsWith('/*')) {
        type = 'comment'
    }
    if (word === '' || word === ' ') {
        type = 'whitespace'
    }
    return type
}
