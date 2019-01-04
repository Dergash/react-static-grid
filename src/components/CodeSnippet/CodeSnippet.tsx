import * as React from 'react'
import * as styles from './CodeSnippet.css'

interface ICodeSnippetProps {
    code: string
}

function CodeSnippet(props: ICodeSnippetProps) {
    const lines = props.code.split('\n')
    return (
        <div contentEditable className={styles.Container}>
            {lines.map(line => <div>{line}</div>)}
        </div>
    )
}

export default CodeSnippet
