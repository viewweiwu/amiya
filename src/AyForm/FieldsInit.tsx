import { Input, Switch, Checkbox, Radio, DatePicker, InputNumber } from 'antd'
import React from 'react'
import AySelect from '../AySelect'
import {
  FORM_DEFAULT_ALLOW_CLEAR,
  FORM_DEFAULT_VALUE_NUMBER,
  FORM_DEFAULT_VALUE_INPUT,
  FORM_DEFAULT_VALUE_PASSWORD,
  FORM_DEFAULT_VALUE_SELECT,
  FORM_DEFAULT_VALUE_SWITCH,
  FORM_DEFAULT_VALUE_CHECKBOX,
  FORM_DEFAULT_VALUE_CHECKBOX_GROUP,
  FORM_DEFAULT_VALUE_RADIO_GROUP,
  FORM_DEFAULT_VALUE_TEXTAREA,
  FORM_DEFAULT_VALUE_DATE,
  FORM_DEFAULT_VALUE_DATE_RANGE,
  FORM_DEFAULT_VALUE_EMPTY,
  FORM_DEFAULT_VALUE_PERCENT,
  FORM_DEFAULT_VALUE_SEARCH,
  FORM_TYPE_SWITCH,
  FORM_TYPE_CHECKBOX,
  FORM_TYPE_CHECKBOX_GROUP,
  FORM_TYPE_SELECT,
  FORM_TYPE_PASSWORD,
  FORM_TYPE_INPUT,
  FORM_TYPE_RADIO_GROUP,
  FORM_TYPE_DATE,
  FORM_TYPE_TEXTAREA,
  FORM_TYPE_DATE_RANGE,
  FORM_TYPE_EMPTY,
  FORM_TYPE_NUMBER,
  FORM_TYPE_PERCENT,
  FORM_TYPE_SEARCH,
  TEXTAREA_DEFAULT_MAXLENGTH,
  INPUT_DEFAULT_MAXLENGTH,
  NUMBER_DEFAULT_MIN,
  NUMBER_DEFAULT_MAX,
  PERCENT_DEFAULT_MAX,
  FORM_READONLY_EMPTY
} from '../constant'
import { AnyKeyProps } from '../types/AnyKeyProps'
import { RegisterFieldProps } from './ay-form'
import { Option } from './ay-form'

const getValueByOptions = (value: any, options: Array<Option>) => {
  let option = options.find((option) => option.value === value)
  return option ? option.label : value
}

export const install = (registerField: (fieldType: string, field: RegisterFieldProps) => void) => {
  // 注册输入框
  registerField(FORM_TYPE_INPUT, {
    type: FORM_TYPE_INPUT,
    defaultValue: FORM_DEFAULT_VALUE_INPUT,
    render: ({ field, readonly, getFieldValue }: AnyKeyProps) => {
      return readonly ? (
        <span className="ay-form-text">{getFieldValue(field.key) || FORM_READONLY_EMPTY}</span>
      ) : (
        <Input
          placeholder={`请输入${field.title || ''}`}
          disabled={readonly}
          maxLength={INPUT_DEFAULT_MAXLENGTH}
          allowClear={FORM_DEFAULT_ALLOW_CLEAR}
          {...field.props}
        />
      )
    }
  })

  // 注册搜索框
  registerField(FORM_TYPE_SEARCH, {
    type: FORM_TYPE_SEARCH,
    defaultValue: FORM_DEFAULT_VALUE_SEARCH,
    render: ({ field, readonly, getFieldValue, formInstans }: AnyKeyProps) => {
      return readonly ? (
        <span className="ay-form-text">{getFieldValue(field.key) || FORM_READONLY_EMPTY}</span>
      ) : (
        <Input.Search
          placeholder={`请输入${field.title || ''}`}
          disabled={readonly}
          onPressEnter={(e) => {
            e.preventDefault()
            formInstans.submit()
          }}
          onSearch={() => formInstans.submit()}
          maxLength={INPUT_DEFAULT_MAXLENGTH}
          allowClear={FORM_DEFAULT_ALLOW_CLEAR}
          enterButton
          {...field.props}
        />
      )
    }
  })

  // 注册数字框
  registerField(FORM_TYPE_NUMBER, {
    type: FORM_TYPE_NUMBER,
    defaultValue: FORM_DEFAULT_VALUE_NUMBER,
    render: ({ field, readonly, getFieldValue }: AnyKeyProps) =>
      readonly ? (
        <span className="ay-form-text">{getFieldValue(field.key) || FORM_READONLY_EMPTY}</span>
      ) : (
        <InputNumber
          placeholder={`请输入${field.title || ''}`}
          className="max-width"
          disabled={readonly}
          min={NUMBER_DEFAULT_MIN}
          max={NUMBER_DEFAULT_MAX}
          {...field.props}
        />
      )
  })

  // 注册百分比数字框
  registerField(FORM_TYPE_PERCENT, {
    type: FORM_TYPE_PERCENT,
    defaultValue: FORM_DEFAULT_VALUE_PERCENT,
    render: ({ field, readonly, getFieldValue }: AnyKeyProps) =>
      readonly ? (
        <span className="ay-form-text">{getFieldValue(field.key) || FORM_READONLY_EMPTY}%</span>
      ) : (
        <InputNumber
          placeholder={`请输入${field.title || ''}`}
          className="max-width"
          disabled={readonly}
          min={NUMBER_DEFAULT_MIN}
          max={PERCENT_DEFAULT_MAX}
          formatter={(value?: string | number) => (value !== '' ? `${value}%` : '')}
          parser={(value?: string) => (value || '').replace('%', '')}
          {...field.props}
        />
      )
  })

  // 注册密码框
  registerField(FORM_TYPE_PASSWORD, {
    type: FORM_TYPE_PASSWORD,
    defaultValue: FORM_DEFAULT_VALUE_PASSWORD,
    render: ({ field, readonly, getFieldValue }: AnyKeyProps) =>
      readonly ? (
        <span className="ay-form-text">{getFieldValue(field.key) || FORM_READONLY_EMPTY}</span>
      ) : (
        <Input.Password
          placeholder={`请输入${field.title || ''}`}
          disabled={readonly}
          allowClear={FORM_DEFAULT_ALLOW_CLEAR}
          {...field.props}
        />
      )
  })

  // 注册多行文本框
  registerField(FORM_TYPE_TEXTAREA, {
    type: FORM_TYPE_TEXTAREA,
    defaultValue: FORM_DEFAULT_VALUE_TEXTAREA,
    render: ({ field, readonly, getFieldValue }: AnyKeyProps) =>
      readonly ? (
        <span className="ay-form-text">{getFieldValue(field.key) || FORM_READONLY_EMPTY}</span>
      ) : (
        <Input.TextArea
          placeholder={`请输入${field.title || ''}`}
          disabled={readonly}
          allowClear={FORM_DEFAULT_ALLOW_CLEAR}
          maxLength={TEXTAREA_DEFAULT_MAXLENGTH}
          {...field.props}
        />
      )
  })

  // 注册选择框
  registerField(FORM_TYPE_SELECT, {
    type: FORM_TYPE_SELECT,
    defaultValue: FORM_DEFAULT_VALUE_SELECT,
    render: ({ field, readonly, getFieldValue }: AnyKeyProps) =>
      readonly ? (
        <span className="ay-form-text">
          {getValueByOptions(getFieldValue(field.key), field.options) || FORM_READONLY_EMPTY}
        </span>
      ) : (
        <AySelect
          placeholder={`请选择${field.title || ''}`}
          disabled={readonly}
          allowClear={FORM_DEFAULT_ALLOW_CLEAR}
          options={field.options}
          {...field.props}
        />
      )
  })

  // 注册开关
  registerField(FORM_TYPE_SWITCH, {
    type: FORM_TYPE_SWITCH,
    defaultValue: FORM_DEFAULT_VALUE_SWITCH,
    valuePropName: 'checked',
    render: ({ field, readonly }: AnyKeyProps) => <Switch disabled={readonly} {...field.props} />
  })

  // 注册单个选择框
  registerField(FORM_TYPE_CHECKBOX, {
    type: FORM_TYPE_CHECKBOX,
    defaultValue: FORM_DEFAULT_VALUE_CHECKBOX,
    valuePropName: 'checked',
    render: ({ field, readonly }: AnyKeyProps) => <Checkbox disabled={readonly} {...field.props} />
  })

  // 注册多个选择框
  registerField(FORM_TYPE_CHECKBOX_GROUP, {
    type: FORM_TYPE_CHECKBOX_GROUP,
    defaultValue: FORM_DEFAULT_VALUE_CHECKBOX_GROUP,
    render: ({ field, readonly }: AnyKeyProps) => (
      <Checkbox.Group disabled={readonly} options={field.options} {...field.props} />
    )
  })

  // 注册多个单选框
  registerField(FORM_TYPE_RADIO_GROUP, {
    type: FORM_TYPE_RADIO_GROUP,
    defaultValue: FORM_DEFAULT_VALUE_RADIO_GROUP,
    render: ({ field, readonly }: AnyKeyProps) => (
      <Radio.Group disabled={readonly} options={field.options} {...field.props} />
    )
  })
  // 注册日期
  registerField(FORM_TYPE_DATE, {
    type: FORM_TYPE_DATE,
    defaultValue: FORM_DEFAULT_VALUE_DATE,
    render: ({ field, readonly, getFieldValue }: AnyKeyProps) =>
      readonly ? (
        <span className="ay-form-text">{getFieldValue(field.key) || FORM_READONLY_EMPTY}</span>
      ) : (
        <DatePicker className="max-width" placeholder={`请选择${field.title || ''}`} {...field.props} />
      )
  })

  // 注册区间日期
  registerField(FORM_TYPE_DATE_RANGE, {
    type: FORM_TYPE_DATE_RANGE,
    defaultValue: FORM_DEFAULT_VALUE_DATE_RANGE,
    render: ({ field, readonly, getFieldValue }: AnyKeyProps) => {
      let text = getFieldValue(field.key)
      text = text.join('\n')
      return readonly ? (
        <span className="ay-form-text">{text || FORM_READONLY_EMPTY}</span>
      ) : (
        <DatePicker.RangePicker placeholder={['开始日期', '结束日期']} className="max-width" {...field.props} />
      )
    }
  })

  // 注册空节点
  registerField(FORM_TYPE_EMPTY, {
    type: FORM_TYPE_EMPTY,
    defaultValue: FORM_DEFAULT_VALUE_EMPTY,
    render: () => <input hidden type="text" />
  })
}
