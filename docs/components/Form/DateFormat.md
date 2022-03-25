# Date 表单日期的格式化

### 默认实例

1. 如果日期是区间形式，也就是 `type: 'date-range'`，那么提交时默认会把值拆开成 `startDate`, `endDate`。
2. 格式化格式为 'YYYY-MM-DD'。
3. <Badge>0.54.0</Badge> 版本后支持值默认值转换，例如 `'2022-03-24'`、`new Date()`。

点击 `提交` 按钮查看格式化结果。

```tsx
import React from 'react'
import { AyForm, AyFormField, AyButton } from 'amiya'

const fields: Array<AyFormField> = [
  {
    title: '日期区间',
    key: 'date-range',
    type: 'date-range',
    defaultValue: ['2022-03-24', '2022-03-25']
  }
]

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }
  return (
    <AyForm fields={fields} onConfirm={handleConfirm} style={{ width: 600, margin: '0 auto' }}>
      <AyButton style={{ marginLeft: 120 }} type="primary" htmlType="submit">
        提交
      </AyButton>
    </AyForm>
  )
}
```

### 日期提交自定义 key

当然这两个 key 可以自己定义。

点击 `提交` 按钮查看格式化结果。

```tsx
import React from 'react'
import { AyForm, AyFormField, AyButton } from 'amiya'

const fields: Array<AyFormField> = [
  {
    title: '日期区间',
    key: 'date-range',
    type: 'date-range',
    startKey: 'fromDate',
    endKey: 'toDate',
    defaultValue: ['2022-03-24', '2022-03-25']
  }
]

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }
  return (
    <AyForm fields={fields} onConfirm={handleConfirm} style={{ width: 600, margin: '0 auto' }}>
      <AyButton style={{ marginLeft: 120 }} type="primary" htmlType="submit">
        提交
      </AyButton>
    </AyForm>
  )
}
```

## 日期展示时间

如果展示了时分秒，即设置 `props.showTime = true`，那么格式化格式会变成 `'YYYY-MM-DD HH:mm:ss'`。

点击 `提交` 按钮查看格式化结果。

```tsx
import React from 'react'
import { AyForm, AyFormField, AyButton } from 'amiya'

const fields: Array<AyFormField> = [
  {
    title: '日期区间',
    key: 'date-range',
    type: 'date-range',
    defaultValue: ['2022-03-24 00:00:00', '2022-03-25 23:59:59'],
    showTime: true
  }
]

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }
  return (
    <AyForm fields={fields} onConfirm={handleConfirm} style={{ width: 600, margin: '0 auto' }}>
      <AyButton style={{ marginLeft: 120 }} type="primary" htmlType="submit">
        提交
      </AyButton>
    </AyForm>
  )
}
```

## 日期自定义格式化格式

设置 `formatRule`，可以将提交的格式进行转换。

点击 `提交` 按钮查看格式化结果。

```tsx
import React from 'react'
import { AyForm, AyFormField, AyButton } from 'amiya'

const fields: Array<AyFormField> = [
  {
    title: '日期区间',
    key: 'date-range',
    type: 'date-range',
    formatRule: 'YYYY年MM月DD日',
    defaultValue: ['2022-03-24', '2022-03-25']
  }
]

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }
  return (
    <AyForm fields={fields} onConfirm={handleConfirm} style={{ width: 600, margin: '0 auto' }}>
      <AyButton style={{ marginLeft: 120 }} type="primary" htmlType="submit">
        提交
      </AyButton>
    </AyForm>
  )
}
```

## 日期在 readonly 模式下的展示

readonly 模式下，其展示的格式化会使用 `readonlyFormatRule`，提交的格式还是会使用 `formatRule`。

```tsx
import React from 'react'
import { AyForm, AyFormField, AyButton } from 'amiya'

const fields: Array<AyFormField> = [
  {
    title: '日期区间',
    type: 'card',
    key: '__daterange',
    children: [
      {
        title: '日期区间',
        key: 'a',
        startKey: 'a-start',
        endKey: 'a-end',
        type: 'date-range',
        readonly: true,
        defaultValue: ['2022-03-24', '2022-03-25']
      },
      {
        title: '日期区间带时间',
        key: 'b',
        type: 'date-range',
        startKey: 'b-start',
        endKey: 'b-end',
        showTime: true,
        readonly: true,
        defaultValue: ['2022-03-24 00:00:00', '2022-03-25 23:59:59']
      },
      {
        title: '日期区间',
        key: 'c',
        type: 'date-range',
        startKey: 'c-start',
        endKey: 'c-end',
        readonly: true,
        defaultValue: ['2022-03-24', '2022-03-25']
      },
      {
        title: '日期区间带时间',
        key: 'd',
        type: 'date-range',
        startKey: 'd-start',
        endKey: 'd-end',
        showTime: true,
        readonly: true,
        defaultValue: ['2022-03-24 00:00:00', '2022-03-25 23:59:59']
      },
      {
        title: '日期区间',
        key: 'e',
        type: 'date-range',
        startKey: 'e-start',
        endKey: 'e-end',
        readonly: true,
        readonlyFormatRule: 'YYYY年MM月DD日',
        defaultValue: ['2022-03-24', '2022-03-25']
      },
      {
        title: '日期区间带时间',
        key: 'f',
        type: 'date-range',
        startKey: 'f-start',
        endKey: 'f-end',
        showTime: true,
        readonly: true,
        readonlyFormatRule: 'YYYY年MM月DD日 HH时mm分ss秒',
        defaultValue: ['2022-03-24 00:00:00', '2022-03-25 23:59:59']
      },
      {
        title: '日期格式化',
        key: 'g',
        type: 'date',
        readonly: true,
        defaultValue: '2022-03-24'
      },
      {
        title: '带时间',
        key: 'h',
        type: 'date',
        showTime: true,
        readonly: true,
        defaultValue: '2022-03-24 00:00:00'
      }
    ]
  },
  {
    title: '日期',
    key: '__date',
    type: 'card',
    children: [
      {
        title: '日期格式化',
        key: 'i',
        type: 'date',
        readonly: true,
        defaultValue: '2022-03-24'
      },
      {
        title: '日期格式化',
        key: 'j',
        type: 'date',
        showTime: true,
        readonly: true,
        defaultValue: '2022-03-24 00:00:00'
      },
      {
        title: '日期格式化',
        key: 'k',
        type: 'date',
        readonly: true,
        readonlyFormatRule: 'YYYY年MM月DD日',
        defaultValue: '2022-03-24'
      },
      {
        title: '日期格式化',
        key: 'l',
        type: 'date',
        showTime: true,
        readonly: true,
        readonlyFormatRule: 'YYYY年MM月DD日',
        defaultValue: '2022-03-24 00:00:00'
      }
    ]
  }
]

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }
  return (
    <AyForm fields={fields} onConfirm={handleConfirm} style={{ width: 600, margin: '0 auto' }}>
      <AyButton style={{ marginLeft: 120 }} type="primary" htmlType="submit">
        提交
      </AyButton>
    </AyForm>
  )
}
```
