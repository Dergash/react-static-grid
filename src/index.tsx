import * as React from 'react'
import { render } from 'react-dom'
import CodeSnippet from 'components/CodeSnippet/CodeSnippet'

const code = `
  import * as React from 'react'
  import { render } from 'react-dom'
  import CodeSnippet from 'components/CodeSnippet/CodeSnippet'
  
  const code = \`self\`
  
  render(
    <CodeSnippet code={code} />,
    document.getElementById('root')
  )
`

render(
  <CodeSnippet code={code} />,
  document.getElementById('root')
)
