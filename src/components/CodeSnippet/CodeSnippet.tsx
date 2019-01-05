import * as React from 'react'
import * as styles from './CodeSnippet.css'

interface ICodeSnippetProps {
    code: string,
    language?: 'plaintext' | 'typescriptreact'
}

type ITokenType = 'text' | 'entity' | 'control' | 'string' | 'type' | 'comment'

interface ILineToken {
    type: ITokenType,
    text: string
}

function CodeSnippet(props: ICodeSnippetProps) {
    const lines = props.code.split('\n')
    const lineNumberWidth = getLineNumberWidth(lines.length)
    // lines.forEach(processLine)
    return (
        <div className={styles.Container}>
            { lines
            .filter((line, index) => (index === lines.length - 1 && !line) === false)
            .map((line, index) =>
                <div className={styles.Line}>
                    <div className={styles.LineNumber} style={lineNumberWidth}>
                        {index}
                    </div>
                    <pre className={styles.LineCode}>
                        {renderLine(line) || '\n'}
                    </pre>
                </div>
            )}
        </div>
    )
}

function getLineNumberWidth(lines: number) {
    return { minWidth: 8 + lines.toString().length * 8 }
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

function splitLineToTokens(line: string) {
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

function renderLine(line: string) {
    const tokens = splitLineToTokens(line)
    return tokens.map(token => {
        if (token.type === 'entity') {
            return <span className={styles.Entity}>{token.text}</span>
        }
        if (token.type === 'control') {
            return <span className={styles.Control}>{token.text}</span>
        }
        if (token.type === 'string') {
            return <span className={styles.String}>{token.text}</span>
        }
        if (token.type === 'comment') {
            return <span className={styles.Comment}>{token.text}</span>
        }
        return renderWord(token.text)
    })
}

function renderWord(word: string) {
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
    return tokens.map(token => {
        if (token.type === 'string') {
            return <span className={styles.String}>{token.text}</span>
        }
        return token.text
    })
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

export default CodeSnippet
