import * as React from 'react'

interface ICodeSnippetProps {
  code: string
}

const style = {
  whiteSpace: 'pre'
}

function CodeSnippet(props: ICodeSnippetProps) {
  const lines = props.code.split('\n')
  return (
    <div contentEditable style={style}>
        {lines.map(line => <div>{line}</div>)}
    </div>
  )
}

export default CodeSnippet
