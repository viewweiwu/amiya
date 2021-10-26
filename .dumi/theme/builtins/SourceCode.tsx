import React from 'react'
import styled from 'styled-components'
import { Language } from 'prism-react-renderer'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { useCopy } from 'dumi/theme'
import 'prismjs/themes/prism.css'
import 'dumi-theme-default/src/builtins/SourceCode.less'

export interface ICodeBlockProps {
  code: string
  lang: Language
  showCopy?: boolean
}

const Line = styled.div`
  display: table-row;
`

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  min-width: 4em;
  user-select: none;
  opacity: 0.5;
`

const LineContent = styled.span`
  display: table-cell;
`

export default ({ code, lang, showCopy = true }: ICodeBlockProps) => {
  const [copyCode, copyStatus] = useCopy()

  return (
    <div className="__dumi-default-code-block">
      <Highlight {...defaultProps} code={code} language={lang} theme={undefined}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {showCopy && (
              <button
                className="__dumi-default-icon __dumi-default-code-block-copy-btn"
                data-status={copyStatus}
                onClick={() => copyCode(code)}
              />
            )}
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                <Line key={i} {...getLineProps({ line, key: i })}>
                  <LineNo>{i + 1}</LineNo>
                  <LineContent>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </LineContent>
                </Line>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
