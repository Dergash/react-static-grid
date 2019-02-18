import * as React from 'react'
import { IColumn } from './StaticLayoutGridHead'
import * as styles from './StaticLayoutGridBody.css'

interface IStaticLayoutGridBodyProps {
    items: any[],
    columns: IColumn[],
    visibleRowsCount: number,
    firstVisibleRow: number
}

const alignCenter = { textAlign: 'center' }
const alignRight = { textAlign: 'right' }

function StaticLayoutGridBody(props: IStaticLayoutGridBodyProps) {
    const visibleItems = props.items.slice(props.firstVisibleRow, props.firstVisibleRow + props.visibleRowsCount)
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
                <tbody>
                    {visibleItems.map((row, index) =>
                        <tr className={styles.Row}>
                            {props.columns.map(column => {
                                let align
                                align = column.align === 'center' ? alignCenter : align
                                align = column.align === 'right' ? alignRight : align
                                return <td
                                    className={styles.Cell}
                                    style={{ borderTop: index === 0 ? 'none' : undefined }}
                                >
                                    <span className={styles.Label} style={align}>
                                        {row[column.key]}
                                    </span>
                                </td>
                            })}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default StaticLayoutGridBody
