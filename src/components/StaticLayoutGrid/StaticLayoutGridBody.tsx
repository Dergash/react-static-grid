import * as React from 'react'
import { IColumn } from './StaticLayoutGridHead'
import cn from 'utils/cn'
import * as styles from './StaticLayoutGridBody.css'

interface IStaticLayoutGridBodyProps {
    items: any[],
    columns: IColumn[],
    visibleRowsCount: number,
    visibleColumnsCount: number,
    firstVisibleRow: number,
    firstVisibleColumn: number
}

function StaticLayoutGridBody(props: IStaticLayoutGridBodyProps) {
    const visibleItems = props.items.slice(props.firstVisibleRow, props.firstVisibleRow + props.visibleRowsCount)
    const visibleColumns = props.columns.slice(
        props.firstVisibleColumn,
        props.firstVisibleColumn + props.visibleColumnsCount
    )
    return (
        <div className={styles.Container}>
            <table className={styles.Table}>
                <colgroup>
                    {visibleColumns.map(column =>
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
                        <tr className={styles.Row} key={index}>
                            {visibleColumns.map((column, cIndex) => {
                                return column.renderer({ value: row[column.key], column, rowIndex: index })
                            })}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default StaticLayoutGridBody
