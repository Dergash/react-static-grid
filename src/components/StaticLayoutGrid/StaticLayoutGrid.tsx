import * as React from 'react'
import Scrollable from 'components/Scrollable/Scrollable'
import Head, { IColumn } from './StaticLayoutGridHead'
import Body from './StaticLayoutGridBody'

interface IStaticLayoutGridProps {
    columns: IColumn[],
    items: any[],
    visibleRowsCount: number
}

const rowHeight = 48

function StaticLayoutGrid(props: IStaticLayoutGridProps) {
    const [columns, setColumns] = React.useState(props.columns)
    const container = React.useRef<HTMLDivElement>(null)
    const containerWidth = container.current && container.current.clientWidth || 0
    const containerHeight = container.current && container.current.clientHeight || 0
    React.useLayoutEffect(() => {
        const columnsWithWidth = columns.map(column => ({ ...column, width: containerWidth / columns.length }))
        setColumns(columnsWithWidth)
    }, [])
    const contentWidth = columns.reduce((width, item) => width + (item.width || 0), 0)
    const contentHeight = props.items.length * rowHeight
    return (
        <div ref={container}>
            <Head columns={columns} />
            <Scrollable
                width={containerWidth}
                scrollableWidth={contentWidth}
                height={containerHeight}
                scrollableHeight={contentHeight}
            >
                <Body
                    columns={columns}
                    items={props.items}
                    visibleRowsCount={props.visibleRowsCount}
                />
            </Scrollable>
        </div>
    )
}

export default StaticLayoutGrid
