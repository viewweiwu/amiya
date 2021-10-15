import React from 'react'
import { registerTableRender, RenderProps } from 'amiya'
import { Rate } from 'antd'
import 'antd/dist/antd.min.css'

// 此函数只需要注册一次，你可以放在全局
registerTableRender('star', ({ text }: RenderProps) => {
  return <Rate count={Number(text + 1)} defaultValue={Number(text + 1)} disabled />
})
