import React, { forwardRef } from 'react'
import { Select } from 'antd'
import { Option } from '../AyForm/ay-form'
import { AySelectProps } from './ay-select'
import { omitObj } from '../utils'

const getOptions = (options: Array<Option> | undefined) => {
  if (!options) {
    return []
  }
  return options.map(option => {
    return (
      <Select.Option key={option.value} {...option}>
        {option.label}
      </Select.Option>
    )
  })
}

export default forwardRef(function AySelect(props: AySelectProps, ref: any) {
  const { options } = props
  return (
    <Select ref={ref} {...omitObj(props, 'options')}>
      {getOptions(options)}
    </Select>
  )
})
