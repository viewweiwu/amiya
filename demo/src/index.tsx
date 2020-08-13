import { render } from 'react-dom'
import 'antd/dist/antd.css'
import React from 'react'
import AmButton from '../../src/AmButton'
import AmSearchTable from '../../src/AmSearchTable'

const fields = [
  {
    title: 'hello',
    key: 'hello'
  }
]

export default function Demo() {
  return (
    <div>
      amiya-components
      <AmButton>hello</AmButton>
      <AmSearchTable fields={fields}></AmSearchTable>
    </div>
  )
}

render(<Demo />, document.querySelector('#demo'))
