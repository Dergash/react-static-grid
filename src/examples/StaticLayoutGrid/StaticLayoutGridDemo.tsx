import * as React from 'react'
import StaticLayoutGrid from '../../components/StaticLayoutGrid/StaticLayoutGrid'
import { IColumn, ICell } from '../../components/StaticLayoutGrid/StaticLayoutGridHead'
import Button from '../../components/Button/Button'
import TextField from '../../components/TextField/TextField'
import * as gridData from '../data/responsiveBreakpoints.json'
import styles from './StaticLayoutGridDemo.module.css'
import cn from '../../utils/cn'
import {EColors} from '../../utils/palette'

interface IDataItem {
    [key: string]: any
}

const data = gridData.data as IDataItem[]

const colors = [
    EColors.green, EColors.indigo, EColors.blue, EColors.blueGrey, EColors.brown,
    EColors.deepOrange, EColors.red
]
const alignCenter: React.CSSProperties = { textAlign: 'center' }
const alignRight: React.CSSProperties = { textAlign: 'right' }

const initialRandomizedData = getRandomizedData(100)

function StaticLayoutGridDemo() {
    const [rowsInput, setRowsInput] = React.useState<number | undefined>(100)
    const [rows, setRows] = React.useState<number | undefined>(100)
    const [visibleRows, setVisibleRows] = React.useState(14)
    const [columns, setColumns] = React.useState(getRandomizedColumns())
    const [randomizedData, setRandomizedData] = React.useState<IDataItem[]>(initialRandomizedData)

    const handleRandomize = React.useCallback(() => {
        setColumns(getRandomizedColumns())
        setRandomizedData(getRandomizedData(rowsInput ?? 0))
    }, [rowsInput])

    const handleRowsChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number.parseInt(e.currentTarget.value, 10)
        setRowsInput(Number.isNaN(newValue) ? undefined : newValue)
    }, [setRows])

    const handleApply = React.useCallback(() => {
        setRows(rowsInput)
        setRandomizedData(getRandomizedData(rowsInput ?? 0))
    }, [rowsInput])

    return <section>
        <div className={styles.Controls}>
            <TextField
                className={styles.TextField}
                label="Rows"
                maxLength={5}
                value={rowsInput}
                onChange={handleRowsChange}
            />
            <Button onClick={handleApply} className={styles.Button}>
                Apply
            </Button>
            <Button onClick={handleRandomize} className={styles.Button}>
                Randomize
            </Button>
        </div>
        <StaticLayoutGrid
            columns={columns}
            items={randomizedData}
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
            align: 'center',
            width: 80,
            type: 'index',
            renderer: cellRenderer
        }
    ]
    for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
        const colorIndex = Math.floor(Math.random() * colors.length)
        result.push({
            key: String.fromCharCode(i),
            type: 'number',
            width: 120,
            renderer: cellRenderer,
            backgroundColor: i % 2 ? undefined : colors[colorIndex]
        })
    }
    return result
}

function getRandomizedData(rows: number) {
    let result: any[] = []
    if (rows < 1000) {
        result = getRandomBatch(rows)
    } else {
        const batch = getRandomBatch(1000)
        const batches = Math.floor(rows / 1000)
        const leftover = batch.slice(0, rows % 1000)
        for (let i = 0; i < batches; i++) {
            result = result.concat(batch)
        }
        result = result.concat(leftover)
    }
    result = result.map((item, index) => ({ ...item, '#': index }))
    return result
}

function getRandomBatch(rows: number) {
    const batch: Record<string, number>[] =[]
    const row: Record<string, number> = {}
    for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
        row[String.fromCharCode(i)] = Math.random()
    }
    for (let i = 0; i < rows; i++) {
        const item = { ...row }
        Object.keys(item).forEach(key => {
            item[key] = Math.random()
        })
        batch.push(item)
    }
    return batch
}

export default StaticLayoutGridDemo
