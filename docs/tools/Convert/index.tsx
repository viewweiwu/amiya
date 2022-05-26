import React, { useState } from 'react'
import { Col, Input, Row, Button } from 'antd'
import { AnyKeyProps } from 'amiya'
// @ts-ignore
import SourceCode from '/.dumi/theme/builtins/SourceCode'
import './index.less'
import ReactDOM from 'react-dom'
// @ts-ignore
var jsx = require('jsx-transpiler')

const jsonToField = (json: string) => {
  let data = eval(json)

  let str = ''
  str += '<AyFields>\n'
  data.forEach((field: AnyKeyProps) => {
    let props = []
    for (let key in field) {
      let value = field[key]
      let text = ''
      if (typeof value === 'string') {
        text = `"${value}"`
      } else {
        text = `{${value}}`
      }
      props.push(`${key}=${text}`)
    }
    str += `  <AyField ${props.join(' ')} />\n`
  })
  str += '</AyFields>'

  return str
}

function Convert() {
  const [input, setInput] = useState(
    `<AyFields>
    <AyField key="username" required title="用户名" onChange={(value) => console.log(value)} />
    <AyField key="userPassword" type="password" required title="密码" />
    <AyField key="userRemember" type="checkbox" props={{ style: { marginLeft: 120 }, children: '记住密码' }} />
  </AyFields>`.trim()
  )
  const [detail, setDetail] = useState('')

  const handleConvert = () => {
    console.log(jsx, jsx.parse(input))
    // setDetail(jsonToField(input))
  }

  return (
    <div className="dumi-page-convert">
      <div className="dumi-page-convert-left">
        <Input.TextArea
          value={input}
          onChange={e => setInput(e.target.value)}
          rows={20}
          placeholder="请输入要转化的数据"
        />
      </div>
      <div className="dumi-page-convert-center">
        <Button onClick={handleConvert}>➡️</Button>
      </div>
      <div className="dumi-page-convert-right">
        <SourceCode code={detail} lang="markdown" showCopy />
      </div>
    </div>
  )
}
export default Convert
