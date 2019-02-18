/**
 * IE11 polyfill for requestIdleCallback
 *
 * @see https://developers.google.com/web/updates/2015/08/using-requestidlecallback
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
 */
export type RequestIdleCallback = (
    callback: RequistIdleCallbackFunction,
    options?: IRequestIdleCallbackOptions
) => number
export type RequistIdleCallbackFunction = (args?: IdleDeadline) => void

export interface IRequestIdleCallbackOptions {
    timeout: number
}

export interface IdleDeadline {
    didTimeout: boolean,
    timeRemaining: () => number
}

function ie11RequestIdleCallback(callback: RequistIdleCallbackFunction, options?: IRequestIdleCallbackOptions) {
    const start = Date.now()
    return setTimeout(() => {
        callback({
            didTimeout: false,
            timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
        })
    }, 1)
}

function ie11CancelIdleCallback(id: number) {
    window.clearTimeout(id)
}

export const requestIdleCallback: RequestIdleCallback = (window as any).requestIdleCallback || ie11RequestIdleCallback
export const cancelIdleCallback = (window as any).cancelIdleCallback || ie11CancelIdleCallback
