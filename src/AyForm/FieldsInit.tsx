import { Input, Switch, Checkbox, Radio, DatePicker, InputNumber } from 'antd'
import React from 'react'
import AyEditor from '../AyEditor'
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
  FORM_DEFAULT_VALUE_EDITOR,
  FORM_DEFAULT_VALUE_PERCENT,
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
  FORM_TYPE_EDITOR,
  TEXTAREA_DEFAULT_MAXLENGTH,
  INPUT_DEFAULT_MAXLENGTH,
  NUMBER_DEFAULT_MIN,
  NUMBER_DEFAULT_MAX,
  PERCENT_DEFAULT_MAX
} from '../constant'
import { AnyKeyProps } from '../types/AnyKeyProps'
import { AyFormField, FieldListener, RegisterFieldProps } from './ay-form'

export const install = (registerField: (fieldType: string, field: RegisterFieldProps) => void) => {
  // 注册输入框
  registerField(FORM_TYPE_INPUT, {
    type: FORM_TYPE_INPUT,
    defaultValue: FORM_DEFAULT_VALUE_INPUT,
    render: (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly: boolean) => (
      <Input
        placeholder={`请输入${field.title || ''}`}
        disabled={readonly}
        maxLength={INPUT_DEFAULT_MAXLENGTH}
        allowClear={FORM_DEFAULT_ALLOW_CLEAR}
        {...field.props}
      />
    )
  })

  // 注册数字框
  registerField(FORM_TYPE_NUMBER, {
    type: FORM_TYPE_NUMBER,
    defaultValue: FORM_DEFAULT_VALUE_NUMBER,
    render: (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly: boolean) => (
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
    render: (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly: boolean) => (
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
    render: (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly: boolean) => (
      <Input.Password
        placeholder={`请输入${field.title || ''}`}
        disabled={readonly}
        allowClear={FORM_DEFAULT_ALLOW_CLEAR}
        {...field.props}
      />
    )
  })

  // 注册富文本框
  registerField(FORM_TYPE_EDITOR, {
    type: FORM_TYPE_EDITOR,
    defaultValue: FORM_DEFAULT_VALUE_EDITOR,
    render: (
      field: AyFormField,
      setFieldsValue: (params: AnyKeyProps) => void,
      readonly: boolean,
      addFieldListener: (key: string, fieldListener: FieldListener) => void
    ) => {
      return <AyEditor placeholder={`请输入${field.title || ''}`} disabled={readonly} {...field.props} />
    }
  })

  // 注册多行文本框
  registerField(FORM_TYPE_TEXTAREA, {
    type: FORM_TYPE_TEXTAREA,
    defaultValue: FORM_DEFAULT_VALUE_TEXTAREA,
    render: (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly: boolean) => (
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
    render: (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly: boolean) => (
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
    render: (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly: boolean) => (
      <Switch disabled={readonly} {...field.props} />
    )
  })

  // 注册单个选择框
  registerField(FORM_TYPE_CHECKBOX, {
    type: FORM_TYPE_CHECKBOX,
    defaultValue: FORM_DEFAULT_VALUE_CHECKBOX,
    valuePropName: 'checked',
    render: (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly: boolean) => (
      <Checkbox disabled={readonly} {...field.props} />
    )
  })

  // 注册多个选择框
  registerField(FORM_TYPE_CHECKBOX_GROUP, {
    type: FORM_TYPE_CHECKBOX_GROUP,
    defaultValue: FORM_DEFAULT_VALUE_CHECKBOX_GROUP,
    render: (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly: boolean) => (
      <Checkbox.Group disabled={readonly} options={field.options} {...field.props} />
    )
  })

  // 注册多个单选框
  registerField(FORM_TYPE_RADIO_GROUP, {
    type: FORM_TYPE_RADIO_GROUP,
    defaultValue: FORM_DEFAULT_VALUE_RADIO_GROUP,
    render: (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly: boolean) => (
      <Radio.Group disabled={readonly} options={field.options} {...field.props} />
    )
  })
  // 注册日期
  registerField(FORM_TYPE_DATE, {
    type: FORM_TYPE_DATE,
    defaultValue: FORM_DEFAULT_VALUE_DATE,
    render: (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly: boolean) => (
      <DatePicker
        disabled={readonly}
        className="max-width"
        placeholder={`请选择${field.title || ''}`}
        {...field.props}
      />
    )
  })

  // 注册区间日期
  registerField(FORM_TYPE_DATE_RANGE, {
    type: FORM_TYPE_DATE_RANGE,
    defaultValue: FORM_DEFAULT_VALUE_DATE_RANGE,
    render: (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly: boolean) => (
      <DatePicker.RangePicker
        placeholder={['开始日期', '结束日期']}
        disabled={readonly}
        className="max-width"
        {...(field.props as any)}
      />
    )
  })

  // 注册空节点
  registerField(FORM_TYPE_EMPTY, {
    type: FORM_TYPE_EMPTY,
    defaultValue: FORM_DEFAULT_VALUE_EMPTY,
    render: (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly: boolean) => (
      <input hidden type="text" />
    )
  })
}
