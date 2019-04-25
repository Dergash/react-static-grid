import * as React from 'react'
import AppBar from 'components/AppBar/AppBar'
import Navigation from 'components/Navigation/Navigation'
import CodeSnippet from 'components/CodeSnippet/CodeSnippet'
import StaticLayoutGridDemo from './StaticLayoutGrid/StaticLayoutGridDemo'
import * as styles from './Demo.css'

const DemoSrc = require('!raw-loader!examples/Demo')
const CodeSnippetSrc = require('!raw-loader!components/CodeSnippet/CodeSnippet')
const StaticLayoutGridSrc = require('!raw-loader!examples/StaticLayoutGrid/StaticLayoutGridDemo')

function Demo() {
    const [ component, setComponent ] = React.useState('Static Layout Grid')
    const items = ['Code Snippet', 'Static Layout Grid']
    return (
        <div className={styles.Container}>
            <AppBar color="rgb(51, 51, 51)" title="Components" />
            <Navigation items={items} onClick={setComponent} />
            <div className={styles.Content}>
                <section className={styles.Section}>
                    <h4 className={styles.ComponentTitle}>
                        {component}
                    </h4>
                </section>
                <section className={styles.Section}>
                    { component === 'Code Snippet'
                        && <CodeSnippet code={DemoSrc} />
                    }
                    { component === 'Static Layout Grid'
                        && <StaticLayoutGridDemo  />
                    }
                </section>
                <section>
                    <h4 className={styles.ComponentTitle}>
                        Source
                    </h4>
                    { component === 'Code Snippet' && <CodeSnippet code={CodeSnippetSrc} /> }
                    { component === 'Static Layout Grid' && <CodeSnippet code={StaticLayoutGridSrc} /> }
                </section>
            </div>
        </div>
    )
}

export default Demo
