# Date 添加快捷选项

> 打开过此页面后，其它页面的 `date` 会有影响。<br />
> 注册过后，AySearchTable、AyDialogForm 也会生效

## 示例

1. 覆盖默认的日期 `date` 与 `date-range` 类型
2. 注册放在全局入口出，达到全局通用

```tsx
import React from 'react'
import { AyForm, AyFormField, registerField, AyButton } from 'amiya'
import { DatePicker, Row, Col } from 'antd'
import moment from 'moment'

// 区间日期快捷选项
const ranges: any = {
  今天: [moment().startOf('day'), moment().endOf('day')],
  昨天: [moment().subtract(1, 'day'), moment().subtract(1, 'day').endOf('day')],
  本周: [moment().startOf('week'), moment().endOf('day')],
  上周: [moment().startOf('week').subtract(7, 'day'), moment().endOf('week').subtract(7, 'day')],
  本月: [moment().startOf('month'), moment().endOf('day')],
  上月: [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
}

// 注册区间日期
registerField('date-range', {
  type: 'data-range',
  defaultValue: [],
  render: ({ field, readonly, getFieldValue }: AnyKeyProps) => {
    let text = getFieldValue(field.key)
    text = text.join('\n')
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
const renderExtraFooter = (setFieldsValue: (params: AnyKeyProps) => void, field: AnyKeyProps) => {
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
        onClick={() => setValue(moment().subtract(1, 'day').startOf('day'))}
      >
        昨天早上
      </a>
      <a className="ant-picker-now-btn" onClick={() => setValue(moment().subtract(1, 'day').endOf('day'))}>
        昨天晚上
      </a>
    </>
  )
}

// 注册日期
registerField('date', {
  type: 'date',
  defaultValue: null,
  render: ({ field, readonly, getFieldValue }: AnyKeyProps) =>
    readonly ? (
      <span className="ay-form-text">{getFieldValue(field.key) || '-'}</span>
    ) : (
      <DatePicker
        renderExtraFooter={renderExtraFooter}
        className="max-width"
        placeholder={`请选择${field.title || ''}`}
        {...field.props}
      />
    )
})

const fields: Array<AyFormField> = [
  {
    title: '日期区间',
    key: 'date-range',
    type: 'date-range'
  },
  {
    title: '日期区间时间',
    key: 'datetime-range',
    type: 'date-range',
    props: {
      showTime: true
    }
  },
  {
    title: '日期',
    key: 'date',
    type: 'date'
  },
  {
    title: '日期时间',
    key: 'datetime',
    type: 'date',
    props: {
      showTime: true
    }
  }
]

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }
  return (
    <AyForm fields={fields} onConfirm={handleConfirm}>
      <AyButton block type="primary" htmlType="submit">
        提交
      </AyButton>
    </AyForm>
  )
}
```
