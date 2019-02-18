import * as React from 'react'
import Scrollable from 'components/Scrollable/Scrollable'
import {IMouseScrollEvent} from 'components/Scrollable/ScrollBar'
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
    const [firstVisibleRow, setFirstVisibleRow] = React.useState(0)
    const container = React.useRef<HTMLDivElement>(null)
    const containerWidth = container.current && container.current.clientWidth || 0
    const containerHeight = container.current && container.current.clientHeight || 0
    React.useLayoutEffect(() => {
        const columnsWithWidth = columns.map(column => ({ ...column, width: containerWidth / columns.length }))
        setColumns(columnsWithWidth)
    }, [])
    const contentWidth = columns.reduce((width, item) => width + (item.width || 0), 0)
    const contentHeight = props.items.length * rowHeight
    const handleScroll = React.useCallback((event: IMouseScrollEvent) => {
        if (event.axis === 'y') {
            const padding = props.items.length - props.visibleRowsCount > 0
                ? props.visibleRowsCount * rowHeight
                : 0
            const requiredHeight = event.percentage * (props.items.length * rowHeight - padding)
            const row = Math.ceil(requiredHeight / rowHeight)
            setFirstVisibleRow(row)
        }
    }, [props.items, props.visibleRowsCount])
    return (
        <div ref={container}>
            <Head columns={columns} />
            <Scrollable
                width={containerWidth}
                scrollableWidth={contentWidth}
                height={containerHeight}
                scrollableHeight={contentHeight}
                onScroll={handleScroll}
            >
                <Body
                    columns={columns}
                    items={props.items}
                    visibleRowsCount={props.visibleRowsCount}
                    firstVisibleRow={firstVisibleRow}
                />
            </Scrollable>
        </div>
    )
}

export default StaticLayoutGrid
