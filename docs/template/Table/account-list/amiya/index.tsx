import React, { ReactNode } from 'react'
import { Record, registerTableRender, RenderProps } from 'amiya'
import { Space } from 'antd'

/**
 * 通过选项列表把 value 变成 label
 * @param value 当前值
 * @param options 选项列表
 */
export const getValueByOptions = (value: any, options: Array<Record>) => {
  let option = options.find(option => option.value === value)
  return <span key={value}>{option ? option.label : value}</span>
}

registerTableRender('group', ({ field, text }: RenderProps) => {
  let content: ReactNode
  if (Array.isArray(text)) {
    content = (
      <Space split={field.split} size={field.size}>
        {text.map(item => getValueByOptions(item, field.options))}
      </Space>
    )
  } else {
    content = getValueByOptions(text, field.options)
  }

  return (
    <div>
      {content}
      {field.after}
    </div>
  )
})
