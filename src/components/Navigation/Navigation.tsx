import * as React from 'react'
import * as styles from './Navigation.css'

interface INavigationProps {
    items: string[],
    onClick: (item: string) => void
}

function Navigation(props: INavigationProps) {
    return (
        <nav className={styles.Container}>
            <ul>
                { props.items.map(item => {
                    return <li key={item}>
                        <button
                            className={styles.Button}
                            onClick={React.useCallback(() => props.onClick(item), [item, props.onClick])}
                        >
                            {item}
                        </button>
                    </li>
                })}
            </ul>
        </nav>
    )
}

export default Navigation
