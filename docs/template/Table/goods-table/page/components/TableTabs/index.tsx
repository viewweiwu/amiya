import React from 'react'
import { Option } from 'amiya'
import { Tabs } from 'antd'

interface IProps {
  value: number | string
  onChange: (value: string) => void
  options: Array<Option>
}

export default function TableTabs(props: IProps) {
  const { options, value, onChange } = props
  return (
    <Tabs activeKey={value.toString()} onChange={(value: string) => onChange(value)}>
      {options.map(option => (
        <Tabs.TabPane
          tab={
            <span>
              {option.label} <span className="tag">{option.count || 0}</span>
            </span>
          }
          key={option.value}
        />
      ))}
    </Tabs>
  )
}
