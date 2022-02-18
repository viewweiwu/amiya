# 组合表单

```tsx
import React, { useState, useRef } from 'react'
import { AyForm, AyButton, AyFormField } from 'amiya'
import { Switch, Space, Card } from 'antd'
import moment from 'moment'

const fields: Array<AyFormField> = [
  {
    title: '生日',
    // 请随意给一个不会重复的 key，以双下划线开头的 key，提交是会过滤掉的
    key: '__group',
    // type 为 group，表示子元素为组合表单
    type: 'group',
    help: 'group 会保留一点间隙',
    // 间隙
    gutter: 8,
    style: {
      width: 400
    },
    required: true,
    children: [
      {
        key: 'a',
        required: true,
        span: 8,
        type: 'select',
        placeholder: '年',
        defaultValue: 1991,
        options: Array.from({ length: 50 }).map((item, index) => ({ label: index + 1971 + '年', value: index + 1971 }))
      },
      {
        key: 'b',
        required: true,
        span: 8,
        type: 'select',
        placeholder: '月',
        defaultValue: 1,
        options: Array.from({ length: 12 }).map((item, index) => ({ label: index + 1 + '月', value: index + 1 }))
      },
      {
        key: 'c',
        type: 'select',
        span: 8,
        required: true,
        placeholder: '日',
        defaultValue: 9,
        options: Array.from({ length: 31 }).map((item, index) => ({ label: index + 1 + '日', value: index + 1 }))
      }
    ]
  },
  {
    title: '会议时间',
    key: '__group2',
    type: 'input-group',
    help: 'input-group 无间隙',
    required: true,
    children: [
      {
        title: '申请日期',
        key: 'd',
        required: true,
        type: 'date',
        defaultValue: moment(),
        style: {
          width: 180
        }
      },
      {
        title: '时间段',
        key: 'e',
        type: 'select',
        required: true,
        defaultValue: [8],
        mode: 'multiple',
        options: [
          { label: '08:00 ~ 09:00', value: 8 },
          { label: '09:00 ~ 10:00', value: 9 },
          { label: '10:00 ~ 11:00', value: 10 },
          { label: '11:00 ~ 12:00', value: 11 },
          { label: '12:00 ~ 13:00', value: 12 },
          { label: '13:00 ~ 14:00', value: 13 },
          { label: '14:00 ~ 15:00', value: 14 },
          { label: '15:00 ~ 16:00', value: 15 },
          { label: '16:00 ~ 17:00', value: 16 }
        ],
        // 宽度设置
        style: {
          minWidth: 140
        }
      }
    ]
  }
]

export default function Demo() {
  const [readonly, setReadonly] = useState<boolean>(false)
  const [desc, setDesc] = useState<boolean>(false)
  const formRef = useRef<any>()

  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  const getFieldsValue = () => {
    let values = formRef.current.getFormatFieldsValue()
    console.log(values)
    alert(JSON.stringify(values))
  }

  return (
    <Card>
      <p>
        <label style={{ marginRight: 4 }}>只读模式</label>
        <Switch defaultChecked={readonly} onChange={value => setReadonly(value)} />
        <label style={{ marginRight: 4, marginLeft: 10 }}>Desc</label>
        <Switch defaultChecked={desc} onChange={value => setDesc(value)} />
      </p>
      <AyForm ref={formRef} desc={desc} readonly={readonly} fields={fields} onConfirm={handleConfirm}>
        <Space style={{ marginTop: 16, marginLeft: 120 }}>
          <AyButton type="primary" htmlType="submit">
            提交
          </AyButton>
          <AyButton onClick={getFieldsValue}>获取当前输入值</AyButton>
        </Space>
      </AyForm>
    </Card>
  )
}
```

<hr />

## 参数详解

### group

如果是 group，一般中间会绘制一个分割线，如果不需要间隙，请使用 `input-group`。

```js
{
  title: '组合类型',
  // 此处的 type 为 group，表示子元素为组合类型
  type: 'group',
  // key 建议写一个
  key: '__group',
  //
  children: [
    {
      // 此处子元素写了 title 也不会展示，但是也可以写，因为还会影响到错误的校验信息和 placeholder
      title: '子元素A',
      key: 'a',
      required: true,
      span: 11
    },
    {
      // 此处的 key 随意
      key: '__divider',
      type: 'custom',
      // 此处 span 看着来
      span: 2,
      render: () => {
        // 你可以渲染一个分割线，此 class 会带一个默认的样式
        return <div className="ay-form-divider">-</div>
      }
    },
    {
      // 此处子元素写了 title 也不会展示，但是也可以写，因为还会影响到错误的校验信息和 placeholder
      title: '子元素B',
      key: 'b',
      required: true,
      span: 11
    }
  ]
}
```

### input-group

如果中间不需要分割符，且紧密的连接在一起，请使用 `input-group`。

```js
{
  title: '组合类型',
  // 此处的 type 为 input-group，表示子元素为组合类型，且无间隙
  type: 'input-group',
  // key 建议写一个
  key: '__input-group',
  children: [
    {
      // 此处子元素写了 title 也不会展示，但是也可以写，因为还会影响到错误的校验信息和 placeholder
      title: '子元素A',
      key: 'a',
      required: true,
      // 需要手动设置输入框宽度，不然会撑满，此处设置 span 无效
      style: {
        width: '50%'
      }
    },
    {
      // 此处子元素写了 title 也不会展示，但是也可以写，因为还会影响到错误的校验信息和 placeholder
      title: '子元素B',
      key: 'b',
      required: true,
      // 需要手动设置输入框宽度，不然会撑满，此处设置 span 无效
      style: {
        width: '50%'
      }
    }
  ]
}
```
