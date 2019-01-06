import * as React from 'react'
import * as styles from './AppBar.css'

interface IAppBarProps {
    color?: string,
    title?: string
}

function AppBar(props: IAppBarProps) {
    return (
        <header
            className={styles.Container}
            style={{ backgroundColor: props.color || 'transparent'}}
        >
            <div className={styles.Navigation} />
            <h1 className={styles.Title}>
                {props.title}
            </h1>
        </header>
    )
}

export default AppBar
