import * as React from 'react'
import Scrollable from '../Scrollable/Scrollable'
import {IMouseScrollEvent} from '../Scrollable/ScrollBar'
import Head, { IColumn } from './StaticLayoutGridHead'
import Body from './StaticLayoutGridBody'
import styles from './StaticLayoutGrid.module.css'

interface IStaticLayoutGridProps {
    columns: IColumn[],
    items: any[],
    visibleRowsCount: number
}

const rowHeight = 48

function getFirstVisibleCount(percentage: number, totalWidth: number, columns: IColumn[], rightWidth: number) {
    const requiredWidth = percentage * (totalWidth - rightWidth)
    let requiredWidth2 = requiredWidth
    let requiredColumn = 0
    for (let i = 0; i < columns.length; i++) {
        requiredWidth2 -= columns[i].width ?? 0
        if (requiredWidth2 < 0) {
            requiredColumn = i
            break
        }
    }
    return requiredColumn
}

function StaticLayoutGrid(props: IStaticLayoutGridProps) {
    const [columns, setColumns] = React.useState(props.columns)
    React.useEffect(() => {
        setColumns(props.columns)
    }, [props.columns])

    const [firstVisibleRow, setFirstVisibleRow] = React.useState(0)
    const [firstVisibleColumn, setFirstVisibleColumn] = React.useState(0)
    const [initialY, setInitialY] = React.useState(0)
    const [initialX, setInitialX] = React.useState(0)
    const [containerWidth, setContainerWidth] = React.useState(0)
    const [rightWidth, setRightWidth] = React.useState(0)
    const percentageY = React.useRef(initialY)
    const percentageX = React.useRef(initialX)
    const container = React.useRef<HTMLDivElement>(null)
    const contentWidth = columns.reduce((width, item) => width + (item.width || 0), 0)
    React.useLayoutEffect(() => {
        let localRightWidth = 0
        let pek = containerWidth
        let maxFirstVisibleColumn = columns.length - 1
        while (maxFirstVisibleColumn > 0) {
            pek -= columns[maxFirstVisibleColumn].width ?? 0
            localRightWidth += columns[maxFirstVisibleColumn].width ?? 0
            maxFirstVisibleColumn--
            if (pek - (columns[maxFirstVisibleColumn].width ?? 0) < 0) {
                break
            }
        }
        setContainerWidth(container.current ? container.current.clientWidth : 0)
        setRightWidth(localRightWidth)
    }, [container.current && container.current.clientWidth])

    const requiredContainerHeight = Math.min(props.items.length, props.visibleRowsCount) * rowHeight
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
        if (event.axis === 'x') {
            percentageX.current = event.percentage
            const requiredColumn = getFirstVisibleCount(event.percentage, contentWidth, columns, rightWidth)
            setFirstVisibleColumn(requiredColumn)
        }
    }, [props.items.length, props.visibleRowsCount, rightWidth])
    React.useLayoutEffect(() => {
        const newContainerWidth = container.current && container.current.clientWidth || 0
        setInitialX(percentageX.current)
        const requiredColumn = getFirstVisibleCount(percentageX.current, contentWidth, columns, rightWidth)
        setFirstVisibleColumn(requiredColumn)
    }, [container.current, rightWidth])
    React.useLayoutEffect(() => {
        setInitialY(percentageY.current)
        const padding = props.items.length - props.visibleRowsCount > 0
                ? props.visibleRowsCount * rowHeight
                : 0
        const requiredHeight = percentageY.current * (props.items.length * rowHeight - padding)
        const row = Math.ceil(requiredHeight / rowHeight)
        setFirstVisibleRow(row)

    }, [props.items.length, props.visibleRowsCount, containerWidth])
    let maxColumns = 0
    let requiredWidth = 0
    for (let i = firstVisibleColumn; i < columns.length && requiredWidth < containerWidth; i++) {
        requiredWidth += columns[i].width ?? 0
        maxColumns++
    }
    return (
        <div ref={container} className={styles.Container}>
            <Head columns={columns} firstVisibleColumn={firstVisibleColumn} visibleColumnsCount={maxColumns} />
            <Scrollable
                initialX={initialX}
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
                    visibleColumnsCount={maxColumns}
                    firstVisibleRow={firstVisibleRow}
                    firstVisibleColumn={firstVisibleColumn}
                />
            </Scrollable>
        </div>
    )
}

export default StaticLayoutGrid
