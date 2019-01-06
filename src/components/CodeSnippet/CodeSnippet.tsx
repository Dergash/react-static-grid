import * as React from 'react'
import * as styles from './CodeSnippet.css'
import { splitLineToTokens, splitWordToTokens } from './tsx-parser'

interface ICodeSnippetProps {
    code: string,
    language?: 'plaintext' | 'typescriptreact'
}

function CodeSnippet(props: ICodeSnippetProps) {
    const lines = props.code.split('\n')
    const lineNumberWidth = getLineNumberWidth(lines.length)

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
        const wordTokens = splitWordToTokens(token.text)
        return wordTokens.map(wordToken => {
            if (wordToken.type === 'string') {
                return <span className={styles.String}>{wordToken.text}</span>
            }
            return wordToken.text
        })
    })
}

export default CodeSnippet
