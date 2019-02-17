import * as React from 'react'
import cn from 'utils/cn'
import * as styles from './ScrollBar.css'

interface IScrollBarProps {
    axis: 'x' | 'y',
    size: number
}

function ScrollBar(props: IScrollBarProps) {
    const thumb = React.useRef<HTMLDivElement>(null)
    const isDragging = React.useRef(false)
    const dragStartPercentage = React.useRef(0)
    const percentage = React.useRef(0)
    const minPosition = React.useRef(0)
    const maxPosition = React.useRef(0)
    const thumbStyle = cn(
        styles.Thumb,
        {
            [styles.Horizontal]: props.axis === 'x',
            [styles.Vertical]: props.axis === 'y'
        }
    )
    React.useEffect(() => {
        if (thumb.current) {
            minPosition.current = thumb.current.parentElement.offsetTop
            maxPosition.current = minPosition.current + thumb.current.parentElement.clientHeight - props.size
        }
    }, [thumb.current, props.size])
    const handleMouseMove = React.useCallback((event: MouseEvent) => {
        handleMove(
            event,
            props.axis,
            thumb,
            dragStartPercentage.current,
            minPosition.current,
            maxPosition.current, props.size
        )
    }, [])
    const handleMouseUp = (event: MouseEvent) => {
        toggleBrowserSelection(false)
        window.removeEventListener('mousemove', handleMouseMove, true)
        isDragging.current = false
    }

    return <div
        ref={thumb}
        className={thumbStyle}
        style={{ [props.axis === 'x' ? 'width' : 'height']: props.size }}
        onMouseDown={React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
            toggleBrowserSelection(true)
            const container = event.currentTarget.parentElement
            window.addEventListener('mouseup', handleMouseUp, true)
            window.addEventListener('mousemove', handleMouseMove, true)
            isDragging.current = true
            const dragPosition = props.axis === 'x' ? event.clientX : event.clientY
            const thumbPositionPx = percentage.current * (maxPosition.current - minPosition.current)
            dragStartPercentage.current = (dragPosition - minPosition.current - thumbPositionPx) / props.size
        }, [])}
    />
}

function handleMove(
    event: MouseEvent,
    axis: 'x' | 'y',
    thumb: React.MutableRefObject<HTMLDivElement>,
    dragStartPercentage: number,
    minPositionPx: number,
    maxPositionPx: number,
    thumbSize: number
) {
    const positionPx = axis === 'x' ? event.clientX : event.clientY
    const anchorDelta = (thumbSize * dragStartPercentage)
    const availablePx = (maxPositionPx - minPositionPx)
    const percentage = (positionPx - minPositionPx) / availablePx
    setPosition(axis, percentage, thumb, minPositionPx, maxPositionPx)
}

function setPosition(
    axis: 'x' | 'y',
    percentage: number,
    thumb: React.MutableRefObject<HTMLDivElement>,
    minPositionPx: number,
    maxPositionPx: number
) {
    const availablePx = maxPositionPx - minPositionPx
    const limitedPercentage = percentage < 0
        ? 0
        : percentage > 1
            ? 1
            : percentage
    thumb.current.style.transform = axis === 'x'
            ? `translate3d(${limitedPercentage * availablePx}px, 0px, 0px)`
            : `translate3d(0px, ${limitedPercentage * availablePx}px, 0px)`
}

function toggleBrowserSelection(disabled: boolean) {
    window.document.body.style.userSelect = disabled ? 'none' : null
    window.document.body.style.msUserSelect = disabled ? 'none' : null
}

export default ScrollBar
