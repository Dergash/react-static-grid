import * as React from 'react'
import {EColors} from 'utils/palette' // shade
import cn from 'utils/cn'
import * as styles from './Button.css'

enum ButtonTypes {
    text,
    outlined,
    contained
}

interface IButtonProps {
    children: React.ReactNode,
    primaryColor?: EColors | string,
    secondaryColor?: EColors | string,
    hoverColor?: EColors | string,
    type?: ButtonTypes,
    style?: React.CSSProperties,
    className?: string,
    onClick?: () => void
}

const Button = (props: IButtonProps) => {
    const primaryColor = props.primaryColor || EColors.lightBlue // Theme context?
    const secondaryColor = props.secondaryColor || EColors.white
    const buttonType = props.type || ButtonTypes.contained
    const initialStyle = {
        backgroundColor: buttonType === ButtonTypes.contained ? primaryColor : 'transparent',
        color: buttonType !== ButtonTypes.contained ? primaryColor : secondaryColor,
        ...props.style
    }
    const [style, setStyle] = React.useState(initialStyle)
    const hoverColor = '0' // shade(primaryColor, secondaryColor, 0.08)

    // TODO: JSS support required for pseudo selectors inlining
    const handleMouseEnter = () => setStyle({ ...style, backgroundColor: hoverColor })
    const handleMouseLeave = () => setStyle(initialStyle)
 
    return <button
        className={cn(styles.Button, props.className)}
        style={style}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={props.onClick}
    >
        {props.children}
    </button>
}

export default Button
