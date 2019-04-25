export enum EColors {
    white = '#FFFFFF',
    green = '#4CAF50',
    indigo = '#3F51B5',
    deepOrange = '#FF5722',
    pink = '#E91E63',
    blueGrey = '#607D8B',
    blue = '#1F75D1',
    lightBlue = '#2695F3',
    brown = '#795548',
    grey = '#9E9E9E'
}

/**
 * Blend two colors together (lerp).
 * Input colors format is hexadecimal w/o alpha, output colors format is rgb().
 */
export function shade(primaryColor: string, overlayColor: string, opacity: number) {
    const incorrectFormat = !primaryColor.startsWith('#') || !overlayColor.startsWith('#')
        || primaryColor.length !== 7 || overlayColor.length !== 7
    if (incorrectFormat) {
        throw Error('Incorrect color conversion; #ffffff format expected')
    }
    const { r: primaryR, g: primaryG, b: primaryB } = hexToRgb(primaryColor)
    const { r: overlayR, g: overlayG, b: overlayB } = hexToRgb(overlayColor) 
    const r = linearInterpolation(primaryR, overlayR, opacity)
    const g = linearInterpolation(primaryG, overlayG, opacity)
    const b = linearInterpolation(primaryB, overlayB, opacity)
    return `rgb(${r}, ${g}, ${b})`
}

function hexToRgb(hex: string) {
    return { 
        r: Number.parseInt(`${hex[1] + hex[2]}`, 16),
        g: Number.parseInt(`${hex[3] + hex[4]}`, 16),
        b: Number.parseInt(`${hex[5] + hex[6]}`, 16)
    }
}

function linearInterpolation(value1: number, value2: number, alpha: number) {
    return (1 - alpha) * value1 + alpha * value2
}
