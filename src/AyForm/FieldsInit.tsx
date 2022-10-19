import { getValueByOptions, omitObj } from '../utils'
import { Input, Switch, Checkbox, Radio, DatePicker, InputNumber, Rate, Slider } from 'antd'
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
  FORM_READONLY_EMPTY,
  FORM_TYPE_RATE,
  FORM_DEFAULT_VALUE_RATE,
  FORM_TYPE_SLIDER,
  FORM_DEFAULT_VALUE_SLIDER,
  FORM_TYPE_TAG_GROUP,
  FORM_DEFAULT_VALUE_TAG_GROUP,
  FORM_TYPE_CARD_GROUP,
  FORM_DEFAULT_VALUE_CARD_GROUP,
  FORM_TYPE_HTML,
  FORM_DEFAULT_VALUE_HTML
} from '../constant'
import AyTagGroup from '../AyTagGroup'
import AyCardGroup from '../AyCardGroup'
import { AnyKeyProps } from '../types/AnyKeyProps'
import { RegisterFieldProps } from './ay-form'
import locale from '../locale'

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
          placeholder={`${locale.form.pleaseInput}${field.title || ''}${locale.form.pleaseInputAfter}`}
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
          placeholder={`${locale.form.pleaseInput}${field.title || ''}${locale.form.pleaseInputAfter}`}
          disabled={readonly}
          onPressEnter={e => {
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
        <span className="ay-form-text">
          {(getFieldValue(field.key) + '').replace(/./g, '*') || FORM_READONLY_EMPTY}
        </span>
      ) : (
        <Input.Password
          placeholder={`${locale.form.pleaseInput}${field.title || ''}${locale.form.pleaseInputAfter}`}
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
          placeholder={`${locale.form.pleaseInput}${field.title || ''}${locale.form.pleaseInputAfter}`}
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
    render: ({ field, readonly, getFieldValue }: AnyKeyProps) => {
      if (readonly) {
        let value = getFieldValue(field.key)
        let text = ''
        if (Array.isArray(value)) {
          if (!value.length) {
            text = FORM_READONLY_EMPTY
          }
          text = value.map(item => getValueByOptions(item, field.options)).join(field.splitText || '、')
        } else {
          text = getValueByOptions(value, field.options)
        }
        return <span className="ay-form-text">{text || FORM_READONLY_EMPTY}</span>
      }

      return (
        <AySelect
          placeholder={`${locale.form.pleaseSelect}${field.title || ''}${locale.form.pleaseSelectAfter}`}
          disabled={readonly}
          allowClear={FORM_DEFAULT_ALLOW_CLEAR}
          options={field.options}
          {...field.props}
        />
      )
    }
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
    render: ({ field, readonly, getFieldValue }: AnyKeyProps) => {
      let text = getFieldValue(field.key, readonly)
      if (typeof text !== 'string') {
        text = ''
      }
      return readonly ? (
        <span className="ay-form-text">{text || FORM_READONLY_EMPTY}</span>
      ) : (
        <DatePicker
          className="max-width"
          placeholder={`${locale.form.pleaseSelect}${field.title || ''}${locale.form.pleaseSelectAfter}`}
          {...field.props}
        />
      )
    }
  })

  // 注册区间日期
  registerField(FORM_TYPE_DATE_RANGE, {
    type: FORM_TYPE_DATE_RANGE,
    defaultValue: FORM_DEFAULT_VALUE_DATE_RANGE,
    render: ({ field, readonly, getFieldValue }: AnyKeyProps) => {
      let text = getFieldValue(field.key, readonly)
      if (Array.isArray(text)) {
        if (text[0] === null) {
          text = null
        } else if (text) {
          text = [
            <span key="start" style={{ display: 'inline-block' }}>
              {(text[0] || '').toString()}
            </span>,
            <span key="divider" style={{ margin: '0 0.5em' }}>
              {locale.form.dateTo}
            </span>,
            <span key="end" style={{ display: 'inline-block' }}>
              {(text[1] || '').toString()}
            </span>
          ]
        }
      }
      return readonly ? (
        <span className="ay-form-text">{text || FORM_READONLY_EMPTY}</span>
      ) : (
        <DatePicker.RangePicker
          placeholder={[locale.form.startDate, locale.form.endDate]}
          className="max-width"
          {...field.props}
        />
      )
    }
  })

  // 注册空节点
  registerField(FORM_TYPE_EMPTY, {
    type: FORM_TYPE_EMPTY,
    defaultValue: FORM_DEFAULT_VALUE_EMPTY,
    render: () => <input hidden type="text" />
  })

  // 注册评分
  registerField(FORM_TYPE_RATE, {
    type: FORM_TYPE_RATE,
    defaultValue: FORM_DEFAULT_VALUE_RATE,
    render: ({ field, readonly }: AnyKeyProps) => <Rate disabled={readonly} {...field.props} />
  })

  // 滑动输入条
  registerField(FORM_TYPE_SLIDER, {
    type: FORM_TYPE_SLIDER,
    defaultValue: FORM_DEFAULT_VALUE_SLIDER,
    render: ({ field, readonly }: AnyKeyProps) => <Slider disabled={readonly} {...field.props} />
  })

  // 标签选择
  registerField(FORM_TYPE_TAG_GROUP, {
    type: FORM_TYPE_TAG_GROUP,
    defaultValue: FORM_DEFAULT_VALUE_TAG_GROUP,
    render: ({ field, readonly }: AnyKeyProps) => (
      <AyTagGroup readonly={readonly} options={field.options} {...field.props} />
    )
  })

  // 卡片选择
  registerField(FORM_TYPE_CARD_GROUP, {
    type: FORM_TYPE_CARD_GROUP,
    defaultValue: FORM_DEFAULT_VALUE_CARD_GROUP,
    render: ({ field, readonly }: AnyKeyProps) => (
      <AyCardGroup readonly={readonly} options={field.options} {...field.props} />
    )
  })

  // 注册 html
  registerField(FORM_TYPE_HTML, {
    type: FORM_TYPE_HTML,
    defaultValue: FORM_DEFAULT_VALUE_HTML,
    render: ({ field }: AnyKeyProps) => <div dangerouslySetInnerHTML={{ __html: field.html }}></div>
  })
}
