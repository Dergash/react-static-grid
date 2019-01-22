declare module '*.css' {
    const styles: { [className: string]: string }
    export = styles
}

declare module '*.json' {
    const json: any
    export = json
}

declare var require: any
