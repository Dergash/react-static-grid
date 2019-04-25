import * as React from 'react'
import cn from 'utils/cn'
import {requestIdleCallback} from 'utils/shim'
import * as styles from './ScrollBar.css'

export interface IScrollEventBase { axis: 'x' | 'y' }
export interface IMouseScrollEvent extends IScrollEventBase {
    percentage: number
}
export interface IKeyboardScrollEvent extends IScrollEventBase {
    direction: 'forward' | 'backward',
    page?: boolean
}
export interface IConsoleScrollEvent extends IScrollEventBase {
    index: number
}
export type ScrollEvent = IMouseScrollEvent | IKeyboardScrollEvent | IConsoleScrollEvent

interface IScrollBarProps {
    axis: 'x' | 'y',
    initial: number,
    size: number,
    onScroll?: (event: IMouseScrollEvent) => void
}

interface IScrollBarInstance {
    thumb: React.MutableRefObject<HTMLDivElement>,
    anchorPercentage: number,
    percentage: number,
    minPosition: number,
    maxPosition: number,
}

function ScrollBar(props: IScrollBarProps) {
    const thumbStyle = cn(styles.Thumb, {
        [styles.Horizontal]: props.axis === 'x',
        [styles.Vertical]: props.axis === 'y'
    })
    const instance = React.useRef<IScrollBarInstance>({
        thumb: React.useRef<HTMLDivElement>(null),
        anchorPercentage: 0, percentage: props.initial || 0,
        minPosition: 0, maxPosition: 0
    }).current
    React.useEffect(() => {
        if (instance.thumb.current) {
            const dimensions = instance.thumb.current.parentElement.getBoundingClientRect()
            instance.minPosition = props.axis === 'x'
                ? dimensions.left
                : dimensions.top
            instance.maxPosition = instance.minPosition - props.size
                + (props.axis === 'x' ? dimensions.width : dimensions.height)
        }
    }, [instance.thumb.current, props.size, props.initial])
    React.useEffect(() => {
        setPosition(props.initial, instance, props)
    }, [props.initial, props.size])
    const handleMouseMove = React.useCallback((event: MouseEvent) => {
        handleMove(props.axis === 'x' ? event.clientX : event.clientY, instance, props)
    }, [props])
    const handleMouseUp = (event: MouseEvent) => {
        toggleBrowserSelection(false)
        window.removeEventListener('mousemove', handleMouseMove, true)
    }
    const handleMouseDown = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        toggleBrowserSelection(true)
        const container = event.currentTarget.parentElement
        window.addEventListener('mouseup', handleMouseUp, true)
        window.addEventListener('mousemove', handleMouseMove, true)
        const dragPosition = props.axis === 'x' ? event.clientX : event.clientY
        const thumbPositionPx = instance.percentage * (instance.maxPosition - instance.minPosition)
        instance.anchorPercentage = (dragPosition - instance.minPosition - thumbPositionPx) / props.size
    }, [props])

    const handleTouchStart = React.useCallback((event: React.TouchEvent<HTMLDivElement>) => {
        toggleBrowserSelection(true)
        const container = event.currentTarget.parentElement
        window.addEventListener('touchend', handleTouchEnd, true)
        window.addEventListener('touchmove', handleTouchMove, true)
        const dragPosition = props.axis === 'x' ? event.targetTouches[0].clientX : event.targetTouches[0].clientY
        const thumbPositionPx = instance.percentage * (instance.maxPosition - instance.minPosition)
        instance.anchorPercentage = (dragPosition - instance.minPosition - thumbPositionPx) / props.size
    }, [props])

    const handleTouchEnd = React.useCallback(() => {
        toggleBrowserSelection(false)
        window.removeEventListener('touchmove', handleTouchMove, true)
    }, [props])

    const handleTouchMove = React.useCallback((event: TouchEvent) => {
        event.preventDefault()
        const eventPosition = props.axis === 'x' ? event.targetTouches[0].clientX : event.targetTouches[0].clientY
        handleMove(eventPosition, instance, props)
    }, [props])

    return <div
        ref={instance.thumb}
        className={thumbStyle}
        style={{ [props.axis === 'x' ? 'width' : 'height']: props.size }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}

    />
}

function handleMove(eventPosition: number, instance: IScrollBarInstance, props: IScrollBarProps) {
    const anchorDelta = (props.size * instance.anchorPercentage)
    const positionPx = eventPosition - anchorDelta
    const availablePx = (instance.maxPosition - instance.minPosition)
    const percentage = (positionPx - instance.minPosition) / availablePx
    const limitedPercentage = percentage < 0
        ? 0
        : percentage > 1
            ? 1
            : percentage
    setPosition(limitedPercentage, instance, props)
    requestIdleCallback(() => {
        if (props.onScroll) {
            props.onScroll({ axis: props.axis, percentage: limitedPercentage })
        }
    }, { timeout: 500 })
}

function setPosition(percentage: number, instance: IScrollBarInstance, props: IScrollBarProps) {
    const availablePx = (instance.maxPosition - instance.minPosition) > 0
        ? instance.maxPosition - instance.minPosition
        : 0
    instance.percentage = percentage
    instance.thumb.current.style.transform = props.axis === 'x'
            ? `translate3d(${percentage * availablePx}px, 0px, 0px)`
            : `translate3d(0px, ${percentage * availablePx}px, 0px)`
}

function toggleBrowserSelection(disabled: boolean) {
    window.document.body.style.userSelect = disabled ? 'none' : null
    window.document.body.style.msUserSelect = disabled ? 'none' : null
}

export default ScrollBar
