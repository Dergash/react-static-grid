import * as React from 'react'
import * as styles from './AppBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

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
            <FontAwesomeIcon icon={faBars} className={styles.Navigation} />
            <h6 className={styles.Title}>
                {props.title}
            </h6>
        </header>
    )
}

export default AppBar
