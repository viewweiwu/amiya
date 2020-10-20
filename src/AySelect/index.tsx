import React from 'react'
import Select from 'antd/lib/select'
import { Option } from '../AyForm/ay-form'
import { AySelectProps } from './ay-select'

const getOptions = (options: Array<Option> | undefined) => {
  if (!options) {
    return []
  }
  return options.map((option) => {
    return (
      <Select.Option value={option.value} key={option.value}>
        {option.label}
      </Select.Option>
    )
  })
}

export default function AySelect(props: AySelectProps) {
  const { options } = props
  return <Select {...props}>{getOptions(options)}</Select>
}
