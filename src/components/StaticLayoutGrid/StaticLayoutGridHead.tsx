import * as React from 'react'
import * as styles from './StaticLayoutGridHead.css'

export interface IColumn {
    key: string,
    label?: string,
    width?: number,
    align?: 'left' | 'center' | 'right'
}

interface IStaticLayoutGridHeadProps {
    columns: IColumn[]
}

const alignCenter = { textAlign: 'center' }
const alignRight = { textAlign: 'right' }

function StaticLayoutGridHead(props: IStaticLayoutGridHeadProps) {
    return (
        <div className={styles.Container}>
            <table className={styles.Table}>
                <colgroup>
                    {props.columns.map(column =>
                        <col
                            key={column.key}
                            style={{
                                width: column.width,
                                minWidth: column.width,
                                maxWidth: column.width
                            }}
                        />
                    )}
                </colgroup>
                <thead>
                    <tr className={styles.Row}>
                        {props.columns.map((column, index) => {
                            let align
                            align = column.align === 'center' ? alignCenter : align
                            align = column.align === 'right' ? alignRight : align
                            return <th
                                key={column.key !== undefined ? column.key : index}
                                className={styles.Column}
                                style={align}
                            >
                                <span className={styles.Label}>
                                    {column.label || column.key }
                                </span>
                            </th>
                        })}
                    </tr>
                </thead>
            </table>
        </div>
    )
}

export default StaticLayoutGridHead
