import * as React from 'react'
import CodeSnippet from 'components/CodeSnippet/CodeSnippet'
import * as styles from './Demo.css'

const DemoSrc = require('!raw-loader!components/Demo')
const CodeSnippetSrc = require('!raw-loader!components/CodeSnippet/CodeSnippet')
const CodeSnippetCss = require('!raw-loader!components/CodeSnippet/CodeSnippet.css')

function Demo() {
    return (
        <div className={styles.Container}>
            <h1 className={styles.PageTitle}>
                Components
            </h1>
            <h2 className={styles.ComponentTitle}>
                Demo
            </h2>
            <CodeSnippet code={DemoSrc} />
            <h2 className={styles.ComponentTitle}>
                Code Snippet - TSX
            </h2>
            <CodeSnippet code={CodeSnippetSrc} />
            <h2 className={styles.ComponentTitle}>
                Code Snippet - CSS
            </h2>
            <CodeSnippet code={CodeSnippetCss} />
        </div>
    )
}

export default Demo
