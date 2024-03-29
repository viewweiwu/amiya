import React from 'react'
import { registerField, AnyKeyProps } from 'amiya'
import { DatePicker } from 'antd'
import moment from 'moment'

// 区间日期快捷选项
const ranges: any = {
  今天: [moment().startOf('day'), moment().endOf('day')],
  昨天: [
    moment().subtract(1, 'day'),
    moment()
      .subtract(1, 'day')
      .endOf('day')
  ],
  本周: [moment().startOf('week'), moment().endOf('day')],
  上周: [
    moment()
      .startOf('week')
      .subtract(7, 'day'),
    moment()
      .endOf('week')
      .subtract(7, 'day')
  ],
  本月: [moment().startOf('month'), moment().endOf('day')],
  上月: [
    moment()
      .subtract(1, 'month')
      .startOf('month'),
    moment()
      .subtract(1, 'month')
      .endOf('month')
  ]
}

// 注册区间日期
registerField('date-range', {
  type: 'data-range',
  defaultValue: [],
  render: ({ field, readonly, getFieldValue }: AnyKeyProps) => {
    let text = getFieldValue(field.key)
    if (text) {
      text = text.join('\n')
    }
    return readonly ? (
      <span className="ay-form-text">{text || '-'}</span>
    ) : (
      <DatePicker.RangePicker
        ranges={ranges}
        placeholder={['开始日期', '结束日期']}
        className="max-width"
        {...field.props}
      />
    )
  }
})

// 日期快捷选项
const renderExtraFooter = ({ setFieldsValue, field }: AnyKeyProps) => {
  /**
   * 填充日期
   * @param value 日期
   */
  const setValue = (value: moment.Moment) => {
    setFieldsValue({
      [field.key]: value
    })
  }
  return (
    <>
      <a className="ant-picker-now-btn" style={{ marginRight: 4 }} onClick={() => setValue(moment().startOf('day'))}>
        今天早上
      </a>
      <a className="ant-picker-now-btn" style={{ marginRight: 4 }} onClick={() => setValue(moment().endOf('day'))}>
        今天晚上
      </a>
      <a
        className="ant-picker-now-btn"
        style={{ marginRight: 4 }}
        onClick={() =>
          setValue(
            moment()
              .subtract(1, 'day')
              .startOf('day')
          )
        }
      >
        昨天早上
      </a>
      <a
        className="ant-picker-now-btn"
        onClick={() =>
          setValue(
            moment()
              .subtract(1, 'day')
              .endOf('day')
          )
        }
      >
        昨天晚上
      </a>
    </>
  )
}

// 注册日期
registerField('date', {
  type: 'date',
  defaultValue: null,
  render: ({ field, readonly, getFieldValue, setFieldsValue }: AnyKeyProps) => {
    let text = getFieldValue(field.key, readonly)
    if (typeof text !== 'string') {
      text = ''
    }
    return readonly ? (
      <span className="ay-form-text">{text || '-'}</span>
    ) : (
      <DatePicker
        renderExtraFooter={() => renderExtraFooter({ setFieldsValue, field })}
        className="max-width"
        placeholder={`请选择${field.title || ''}`}
        {...field.props}
      />
    )
  }
})
