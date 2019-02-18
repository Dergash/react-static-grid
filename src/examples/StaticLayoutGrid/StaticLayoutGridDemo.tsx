import * as React from 'react'
import StaticLayoutGrid from 'components/StaticLayoutGrid/StaticLayoutGrid'
import { IColumn } from 'components/StaticLayoutGrid/StaticLayoutGridHead'
import * as gridData from 'examples/data/responsiveBreakpoints.json'
import * as styles from './StaticLayoutGridDemo.css'

interface IDataItem {
    [key: string]: any
}

const data = gridData.data as IDataItem[]
const columns: IColumn[] = [
    { key: '#', align: 'right' },
    { key: 'Breakpoint Range (dp)' },
    { key: 'Portrait' },
    { key: 'Landscape' },
    { key: 'Window', align: 'center' },
    { key: 'Columns', align: 'right' },
    { key: 'Margins / Gutters', align: 'right' },
]

function StaticLayoutGridDemo() {
    const [rows, setRows] = React.useState(100)
    const [visibleRows, setVisibleRows] = React.useState(10)
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
