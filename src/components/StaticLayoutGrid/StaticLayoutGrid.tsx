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
    const [initialY, setInitialY] = React.useState(0)
    const percentageY = React.useRef(initialY)
    const container = React.useRef<HTMLDivElement>(null)
    const containerWidth = container.current && container.current.clientWidth || 0
    // const containerHeight = container.current && container.current.clientHeight || 0
    const requiredContainerHeight = Math.min(props.items.length, props.visibleRowsCount) * rowHeight
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
            percentageY.current = event.percentage
            const requiredHeight = event.percentage * (props.items.length * rowHeight - padding)
            const row = Math.ceil(requiredHeight / rowHeight)
            setFirstVisibleRow(row)
        }
    }, [props.items.length, props.visibleRowsCount])
    React.useLayoutEffect(() => {
        setInitialY(percentageY.current)
        const padding = props.items.length - props.visibleRowsCount > 0
                ? props.visibleRowsCount * rowHeight
                : 0
        percentageY.current = percentageY.current
        const requiredHeight = percentageY.current * (props.items.length * rowHeight - padding)
        const row = Math.ceil(requiredHeight / rowHeight)
        setFirstVisibleRow(row)
    }, [props.items.length, props.visibleRowsCount])
    return (
        <div ref={container}>
            <Head columns={columns} />
            <Scrollable
                initialY={initialY}
                width={containerWidth}
                height={requiredContainerHeight}
                scrollableWidth={contentWidth}
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
