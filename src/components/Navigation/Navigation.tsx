import * as React from 'react'
import * as styles from './Menu.css'

interface INavigationProps {
    items: string[],
    onClick: (index: number) => void
}

function Navigation(props: INavigationProps) {
    return (
        <nav className={styles.Container}>
            <ul>
                { props.items.map((item, index) => {
                    return <li key={index}>
                        <button
                            className={styles.Button}
                            onClick={React.useCallback(() => props.onClick(index), [index, props.onClick])}
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
