import * as React from 'react'
import AppBar from 'components/AppBar/AppBar'
import CodeSnippet from 'components/CodeSnippet/CodeSnippet'
import * as styles from './Demo.css'

const DemoSrc = require('!raw-loader!components/Demo')

function Demo() {
    return (
        <div className={styles.Container}>
            <AppBar color="rgb(51, 51, 51)" title="Components" />
            <h2 className={styles.ComponentTitle}>
                Demo
            </h2>
            <CodeSnippet code={DemoSrc} />
        </div>
    )
}

export default Demo
