import * as React from 'react'
import * as styles from './CodeSnippet.css'

interface ICodeSnippetProps {
    code: string
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
                        {line || '\n'}
                    </pre>
                </div>
            )}
        </div>
    )
}

function getLineNumberWidth(lines: number) {
    return { minWidth: 8 + lines.toString().length * 8 }
}

export default CodeSnippet
