import * as React from 'react'
import AppBar from 'components/AppBar/AppBar'
import Navigation from 'components/Navigation/Navigation'
import CodeSnippet from 'components/CodeSnippet/CodeSnippet'
import StaticLayoutGrid from 'components/StaticLayoutGrid/StaticLayoutGrid'
import { IColumn } from 'components/StaticLayoutGrid/StaticLayoutGridHead'
import * as gridData from 'data/responsiveBreakpoints.json'
import * as styles from './Demo.css'

const DemoSrc = require('!raw-loader!components/Demo')
const CodeSnippetSrc = require('!raw-loader!components/CodeSnippet/CodeSnippet')
const StaticLayoutGridSrc = require('!raw-loader!components/StaticLayoutGrid/StaticLayoutGrid')

const columns: IColumn[] = [
    { key: 'Breakpoint Range (dp)' },
    { key: 'Portrait' },
    { key: 'Landscape' },
    { key: 'Window', align: 'center' },
    { key: 'Columns', align: 'right' },
    { key: 'Margins / Gutters', align: 'right' },
]

function Demo() {
    const [ component, setComponent ] = React.useState('Static Layout Grid')
    const items = ['Code Snippet', 'Static Layout Grid']
    const rows = [
        ...gridData.data,
        ...gridData.data,
        ...gridData.data,
        ...gridData.data,
        ...gridData.data
    ]
    return (
        <div className={styles.Container}>
            <AppBar color="rgb(51, 51, 51)" title="Components" />
            <Navigation items={items} onClick={setComponent} />
            <div className={styles.Content}>
                <section className={styles.Section}>
                    <h2 className={styles.ComponentTitle}>
                        {component}
                    </h2>
                    { component === 'Code Snippet' && <CodeSnippet code={CodeSnippetSrc} /> }
                    { component === 'Static Layout Grid' && <CodeSnippet code={StaticLayoutGridSrc} /> }
                </section>
                <section className={styles.Section}>
                    <h2 className={styles.ComponentTitle}>
                        Result
                    </h2>
                    { component === 'Code Snippet'
                        && <CodeSnippet code={DemoSrc} />
                    }
                    { component === 'Static Layout Grid'
                        && <StaticLayoutGrid
                            columns={columns}
                            items={rows}
                            visibleRowsCount={5}
                        />
                    }
                </section>
            </div>
        </div>
    )
}

export default Demo
