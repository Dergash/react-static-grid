import * as React from 'react'
import styles from './StaticLayoutGridHead.module.css'

export interface ICell {
    value: any,
    column: IColumn,
    rowIndex: number
}

export interface IColumn {
    key: string,
    label?: string,
    width?: number,
    align?: 'left' | 'center' | 'right',
    renderer: (props: any) => JSX.Element,
    [customProperty: string]: any
}

interface IStaticLayoutGridHeadProps {
    columns: IColumn[],
    firstVisibleColumn: number,
    visibleColumnsCount: number
}

const alignCenter: React.CSSProperties = { textAlign: 'center' }
const alignRight: React.CSSProperties = { textAlign: 'right' }

function StaticLayoutGridHead(props: IStaticLayoutGridHeadProps) {
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
                <thead>
                    <tr className={styles.Row}>
                        {visibleColumns.map((column, index) => {
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
