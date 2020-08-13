import { AmSearchTableField } from '../am-search-table'
import React from 'react'
import { Switch, Radio } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'
import { AmConfirm } from '../../AmDialog'
import { Option } from '../../AmForm/am-form'
import { success } from '../../AmMessage'

export const OPTIONS_STATUS_ON = 1
export const OPTIONS_STATUS_OFF = 2
export const OPTIONS_STATUS_ON_LABEL = '启用'
export const OPTIONS_STATUS_OFF_LABEL = '停用'
export const OPTIONS_STATUS = [
  { label: OPTIONS_STATUS_ON_LABEL, value: OPTIONS_STATUS_ON },
  { label: OPTIONS_STATUS_OFF_LABEL, value: OPTIONS_STATUS_OFF }
]

const handleChange = (value: boolean, record: AnyKeyProps, api?: any, rowKey?: string, beforeSubmit?: (params: AnyKeyProps, record: AnyKeyProps) => AnyKeyProps | boolean) => {
  let params: AnyKeyProps = {
    status: value ? OPTIONS_STATUS_ON : OPTIONS_STATUS_OFF,
    [rowKey || 'id']: record[rowKey || 'id']
  }

  if (typeof beforeSubmit === 'function') {
    let result: AnyKeyProps | boolean = beforeSubmit(params, record)
    if (result !== false) {
      params = result as AnyKeyProps
    } else {
      return
    }
  }

  api(params).then(() => {
    success('状态修改成功')
  })
}

export function getStatusField(field: AmSearchTableField = {}, api?: any, rowKey?: string): AmSearchTableField {
  return {
    title: '状态',
    key: 'status',
    options: OPTIONS_STATUS,
    type: 'select',
    search: {},
    ...field,
    table: {
      width: 100,
      ...field.table,
      render: (_: any, record: AnyKeyProps) => {
        return (
          <Switch
            defaultChecked={record[field.key || 'status'] === OPTIONS_STATUS_ON}
            checkedChildren={OPTIONS_STATUS_ON_LABEL}
            unCheckedChildren={OPTIONS_STATUS_OFF_LABEL}
            onChange={(value) => handleChange(value, record, api, rowKey, field.beforeSubmit)}
          />
        )
      }
    }
  }
}

export function getRadioField(field: AmSearchTableField, onChange: (value: RadioChangeEvent, record: AnyKeyProps) => void): AmSearchTableField {
  const handleChange = (value: RadioChangeEvent, record: AnyKeyProps) => {
    AmConfirm({
      title: '提示',
      content: '确认要切换吗？',
      onConfirm: () => {
        onChange(value, record)
      }
    })
  }
  return {
    ...field,
    table: {
      ...field.table,
      render: (_: any, record: AnyKeyProps) => {
        return (
          <Radio.Group value={record[field.key || '']} onChange={(event) => handleChange(event.target.value, record)}>
            {(field.options || []).map((option: Option) => {
              return (
                <Radio.Button key={option.value} value={option.value}>
                  {option.label}
                </Radio.Button>
              )
            })}
          </Radio.Group>
        )
      }
    }
  }
}
