import * as React from 'react'
import cn from 'utils/cn'
import * as styles from './ScrollBar.css'

interface IScrollBarProps {
    axis: 'x' | 'y',
    size: number
}

interface IScrollBarInstance {
    readonly props: IScrollBarProps,
    thumb: React.MutableRefObject<HTMLDivElement>,
    anchorPercentage: number,
    percentage: number,
    minPosition: number,
    maxPosition: number,
}

function ScrollBar(props: IScrollBarProps) {
    const thumbStyle = cn(
        styles.Thumb,
        {
            [styles.Horizontal]: props.axis === 'x',
            [styles.Vertical]: props.axis === 'y'
        }
    )
    const thumb = React.useRef<HTMLDivElement>(null)
    const scrollbar = React.useRef<IScrollBarInstance>({
        props, thumb,
        anchorPercentage: 0, percentage: 0,
        minPosition: 0, maxPosition: 0
    })
    const instance = scrollbar.current
    React.useEffect(() => {
        if (thumb.current) {
            instance.minPosition = thumb.current.parentElement.offsetTop
            instance.maxPosition = instance.minPosition + thumb.current.parentElement.clientHeight - props.size
        }
    }, [thumb.current, props.size])
    const handleMouseMove = React.useCallback((event: MouseEvent) => {
        handleMove(event, instance)
    }, [])
    const handleMouseUp = (event: MouseEvent) => {
        toggleBrowserSelection(false)
        window.removeEventListener('mousemove', handleMouseMove, true)
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
            const dragPosition = props.axis === 'x' ? event.clientX : event.clientY
            const thumbPositionPx = instance.percentage * (instance.maxPosition - instance.minPosition)
            instance.anchorPercentage = (dragPosition - instance.minPosition - thumbPositionPx) / props.size
        }, [])}
    />
}

function handleMove(event: MouseEvent, instance: IScrollBarInstance) {
    const positionPx = instance.props.axis === 'x' ? event.clientX : event.clientY
    const anchorDelta = (instance.props.size * instance.anchorPercentage)
    const availablePx = (instance.maxPosition - instance.minPosition)
    const percentage = (positionPx - instance.minPosition) / availablePx
    setPosition(percentage, instance)
}

function setPosition(percentage: number, instance: IScrollBarInstance) {
    const availablePx = instance.maxPosition - instance.minPosition
    const limitedPercentage = percentage < 0
        ? 0
        : percentage > 1
            ? 1
            : percentage
    instance.thumb.current.style.transform = instance.props.axis === 'x'
            ? `translate3d(${limitedPercentage * availablePx}px, 0px, 0px)`
            : `translate3d(0px, ${limitedPercentage * availablePx}px, 0px)`
}

function toggleBrowserSelection(disabled: boolean) {
    window.document.body.style.userSelect = disabled ? 'none' : null
    window.document.body.style.msUserSelect = disabled ? 'none' : null
}

export default ScrollBar
