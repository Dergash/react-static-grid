import * as React from 'react'
import Head, { IColumn } from './StaticLayoutGridHead'
import Body from './StaticLayoutGridBody'

interface IStaticLayoutGridProps {
    columns: IColumn[],
    rows: any[]
}

function StaticLayoutGrid(props: IStaticLayoutGridProps) {
    const [columns, setColumns] = React.useState(props.columns)
    const container = React.useRef<HTMLDivElement>(null)
    React.useLayoutEffect(() => {
        if (container.current) {
            const containerWidth = container.current.clientWidth
            const columnsWithWidth = columns.map(column => ({ ...column, width: containerWidth / columns.length }))
            setColumns(columnsWithWidth)
        }
    }, [])
    return (
        <div ref={container}>
            <Head columns={columns} />
            <Body columns={columns} rows={props.rows} />
        </div>
    )
}

export default StaticLayoutGrid
