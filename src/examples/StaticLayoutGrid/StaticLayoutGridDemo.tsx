import * as React from 'react'
import StaticLayoutGrid from 'components/StaticLayoutGrid/StaticLayoutGrid'
import { IColumn, ICell } from 'components/StaticLayoutGrid/StaticLayoutGridHead'
import * as gridData from 'examples/data/responsiveBreakpoints.json'
import * as styles from './StaticLayoutGridDemo.css'
import cn from 'utils/cn'

interface IDataItem {
    [key: string]: any
}

const data = gridData.data as IDataItem[]

const columns: IColumn[] = [
    {
        key: '#',
        align: 'right',
        width: 50,
        renderer: cellRenderer
    }
]

enum EColors {
    green = '#4CAF50',
    indigo = '#3F51B5',
    deepOrange = '#FF5722',
    pink = '#E91E63',
    blueGrey = '#607D8B',
    blue = '#1565C0',
    brown = '#795548',
    grey = '#9E9E9E'
}

const colors = [ EColors.green, EColors.indigo, EColors.blue, EColors.blueGrey, EColors.brown, EColors.deepOrange ]

for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
    const colorIndex = Math.floor(Math.random() * colors.length)
    columns.push({
        key: String.fromCharCode(i),
        width: 150,
        renderer: cellRenderer,
        backgroundColor: i % 2 ? undefined : colors[colorIndex]
    })
}

data.forEach(item => {
    for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
        item[String.fromCharCode(i)] = Math.random()
    }
})

const alignCenter = { textAlign: 'center' }
const alignRight = { textAlign: 'right' }

function cellRenderer(props: ICell) {
    let align
    align = props.column.align === 'center' ? alignCenter : align
    align = props.column.align === 'right' ? alignRight : align
    return <td
        className={cn(styles.Cell, { [styles.Index]: props.column.key === columns[0].key })}
        style={{
            borderTop: props.rowIndex === 0 ? 'none' : undefined,
            backgroundColor: props.column.backgroundColor
        }}
    >
        <span className={styles.Label} style={align}>
            {props.value}
        </span>
    </td>
}

function StaticLayoutGridDemo() {
    const [rows, setRows] = React.useState(100)
    const [visibleRows, setVisibleRows] = React.useState(14)
    let items: IDataItem[] = []
    for (let i = 0; i < Math.ceil(rows / data.length); i++) {
        items = [ ...items, ...data ]
    }
    items = items.slice(0, rows).map((item, index) => ({ ...item, '#': index }))
    const handleRowsChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setRows(Number.parseInt(event.target.value, 10) || 0)
    }, [])
    const handleVisibleRowsChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setVisibleRows(Number.parseInt(event.target.value, 10) || 0)
    }, [])
    return <section>
        <div className={styles.Controls}>
            <span>
                Rows: <input maxLength={5} value={rows} onChange={handleRowsChange} />
            </span>
            {/*<span>
                Visible Rows: <input value={visibleRows} onChange={handleVisibleRowsChange} />
            </span>*/}
        </div>
        <StaticLayoutGrid
            columns={columns}
            items={items}
            visibleRowsCount={visibleRows}
        />
    </section>
}

export default StaticLayoutGridDemo
