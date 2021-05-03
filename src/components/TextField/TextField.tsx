import * as React from 'react'
import cn from '../../utils/cn'
import { EColors, theme, shade } from '../../utils/palette'
import styles from './TextField.module.css'

interface ITextFieldProps {
    focused?: boolean,
    value?: string | number | string[],
    maxLength?: number,
    label?: string,
    type?: 'transparent' | 'filled' | 'outlined',
    primaryColor?: EColors | string,
    secondaryColor?: EColors | string,
    className?: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function TextField(props: ITextFieldProps) {
    const [focused, setFocused] = React.useState(props.focused)
    const type = props.type || 'transparent'
    const primaryColor = props.primaryColor || theme.primaryColor
    const borderColor = shade(theme.surfaceColor, props.secondaryColor || theme.secondaryColor, 0.7)
    const containerStyle = {
        backgroundColor: type === 'filled'
            ? shade(theme.surfaceColor, props.secondaryColor || theme.secondaryColor, 0.04)
            : undefined,
        borderColor
    }
    const style = {
        color: props.secondaryColor || theme.secondaryColor,
    }

    const handleFocus = () => {
        setFocused(true)
    }

    const handleBlur = () => {
        setFocused(false)
    }

    const value = props.value === null ? '' : props.value
    return <div
        className={cn(styles.Container, props.className ?? '')}
        style={containerStyle}
    >
        { props.label &&
            <span
                className={cn(styles.Label, { [styles.LabelPlaceholder]: !props.value })}
                style={{
                    color: focused ? primaryColor : borderColor
                }}
            >
                {props.label}
            </span>
        }
        <input
            className={cn(styles.Input, { [styles.Filled]: !!type })}
            value={value}
            maxLength={props.maxLength}
            style={style}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={props.onChange}
        />
        <div
            className={styles.Underline}
            style={{ backgroundColor: borderColor, }}
        />
        <div
            className={styles.ActivationIndicator}
            style={{
                backgroundColor: primaryColor,
                transform: focused ? 'none' : 'scaleX(0)'
            }}
        />
    </div>
}

export default TextField
