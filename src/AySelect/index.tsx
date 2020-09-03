import React from 'react'
import Select, { SelectProps } from 'antd/lib/select'
import { Option } from '../AyForm/ay-form'

interface DpSelectProps extends SelectProps<any> {
  options?: Array<Option>
}

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

export default function AySelect(props: DpSelectProps) {
  const { options } = props
  return <Select {...props}>{getOptions(options)}</Select>
}
