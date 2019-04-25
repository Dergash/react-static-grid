import * as React from 'react'
import StaticLayoutGrid from 'components/StaticLayoutGrid/StaticLayoutGrid'
import { IColumn, ICell } from 'components/StaticLayoutGrid/StaticLayoutGridHead'
import Button from 'components/Button/Button'
import * as gridData from 'examples/data/responsiveBreakpoints.json'
import * as styles from './StaticLayoutGridDemo.css'
import cn from 'utils/cn'
import {EColors} from 'utils/palette'

interface IDataItem {
    [key: string]: any
}

const data = gridData.data as IDataItem[]

const colors = [ EColors.green, EColors.indigo, EColors.blue, EColors.blueGrey, EColors.brown, EColors.deepOrange ]
const alignCenter = { textAlign: 'center' }
const alignRight = { textAlign: 'right' }

function StaticLayoutGridDemo() {
    const [rows, setRows] = React.useState(100)
    const [visibleRows, setVisibleRows] = React.useState(14)
    const [columns, setColumns] = React.useState(getRandomizedColumns())
    const [randomizedData, setRandomizedData] = React.useState(getRandomizedData())

    const handleRandomize = React.useCallback(() => {
        setColumns(getRandomizedColumns())
        setRandomizedData(getRandomizedData())
    }, [])

    let items: IDataItem[] = []
    for (let i = 0; i < Math.ceil(rows / data.length); i++) {
        items = [ ...items, ...randomizedData ]
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
            <Button onClick={handleRandomize} className={styles.Button}>
                Randomize
            </Button>
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

function cellRenderer(props: ICell) {
    let align
    align = props.column.align === 'center' ? alignCenter : align
    align = props.column.align === 'right' ? alignRight : align
    return <td
        key={props.column.key + props.rowIndex}
        className={cn(styles.Cell, { [styles.Index]: props.column.type === 'index' })}
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

function getRandomizedColumns() {
    const result: IColumn[] = [
        {
            key: '#',
            align: 'right',
            width: 50,
            type: 'index',
            renderer: cellRenderer
        }
    ]
    for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
        const colorIndex = Math.floor(Math.random() * colors.length)
        result.push({
            key: String.fromCharCode(i),
            type: 'number',
            width: 150,
            renderer: cellRenderer,
            backgroundColor: i % 2 ? undefined : colors[colorIndex]
        })
    }
    return result
}

function getRandomizedData() {
    const result = [ ...data ]
    result.forEach(item => {
        for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
            item[String.fromCharCode(i)] = Math.random()
        }
    })
    return result
}

export default StaticLayoutGridDemo
