import * as React from 'react'
import CodeSnippet from 'components/CodeSnippet/CodeSnippet'
import * as styles from './Demo.css'

const src = require('!raw-loader!components/CodeSnippet/CodeSnippet')

function Demo() {
    return (
        <div className={styles.Container}>
            <h1 className={styles.PageTitle}>Components</h1>
            <h2 className={styles.ComponentTitle}>Code Snippet</h2>
            <CodeSnippet code={src} />
        </div>
    )
}

export default Demo
