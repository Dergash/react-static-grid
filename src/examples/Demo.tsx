import * as React from 'react'
import StaticLayoutGridDemo from './StaticLayoutGrid/StaticLayoutGridDemo'
import styles from './Demo.module.css'

function Demo() {
    const [ component, setComponent ] = React.useState('Static Layout Grid')
    return (
        <div className={styles.Container}>
            <div className={styles.Content}>
                <section className={styles.Section}>
                    <h4 className={styles.ComponentTitle}>
                        {component}
                    </h4>
                </section>
                <section className={styles.Section}>
                    { component === 'Static Layout Grid'
                        && <StaticLayoutGridDemo  />
                    }
                </section>
            </div>
        </div>
    )
}

export default Demo
