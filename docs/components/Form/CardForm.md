# 卡片表单

```tsx
import React, { useState } from 'react'
import { AyForm, AyButton, AyFormField } from 'amiya'
import { Switch } from 'antd'

const fields: Array<AyFormField> = [
  {
    title: '基础数据',
    // card 的 key 可以不写，内部会用 Math.random() 随机一个 key，推荐写一个，以双下划线开头
    key: '__base',
    type: 'card',
    collapsible: true,
    children: [
      {
        title: '干员名称',
        key: 'name',
        defaultValue: 'amiya',
        required: true
      },
      {
        title: '干员类型',
        key: 'type'
      },
      {
        title: '备注',
        type: 'textarea',
        key: 'rarity',
        span: 24
      }
    ]
  },
  {
    title: '属性',
    type: 'card',
    key: '__attributes',
    collapsible: true,
    children: [
      {
        title: '精0',
        type: 'card',
        key: '__phases0',
        props: {
          type: 'inner'
        },
        children: [
          {
            title: '基础血量',
            key: 'phases0-default-hp',
            type: 'number'
          },
          {
            title: '基础攻击力',
            key: 'phases0-default-atk',
            type: 'number'
          }
        ]
      },
      {
        title: '精1',
        type: 'card',
        key: '__phases1',
        props: {
          type: 'inner'
        },
        children: [
          {
            title: '基础血量',
            key: 'phases1-default-hp',
            type: 'number'
          },
          {
            title: '基础攻击力',
            key: 'phases1-default-atk',
            type: 'number'
          }
        ]
      },
      {
        title: '精2',
        type: 'card',
        key: '__phases2',
        props: {
          type: 'inner'
        },
        children: [
          {
            title: '基础血量',
            key: 'phases2-default-hp',
            type: 'number'
          },
          {
            title: '基础攻击力',
            key: 'phases2-default-atk',
            type: 'number'
          }
        ]
      }
    ]
  }
]

export default function Demo() {
  const [readonly, setReadonly] = useState<boolean>(false)
  const [desc, setDesc] = useState<boolean>(false)

  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <>
      <p>
        <label style={{ marginRight: 4 }}>只读模式</label>
        <Switch defaultChecked={readonly} onChange={value => setReadonly(value)} />
        <label style={{ marginRight: 4, marginLeft: 10 }}>Desc</label>
        <Switch defaultChecked={desc} onChange={value => setDesc(value)} />
      </p>
      <AyForm desc={desc} readonly={readonly} span={12} fields={fields} onConfirm={handleConfirm}>
        <AyButton type="primary" htmlType="submit">
          提交
        </AyButton>
      </AyForm>
    </>
  )
}
```

## card

FormType 为 card 时，子元素会被 AyCard 包裹起来。

```js
const fields: Array<AyFormField> = [
  {
    title: '基础数据',
    // 请随意给一个不会重复的 key，以双下划线开头的 key，提交是会过滤掉的
    key: '__base',
    type: 'card',
    collapsible: true,
    children: [
      {
        title: '干员名称',
        key: 'name',
        defaultValue: 'amiya',
        required: true
      },
      {
        title: '干员类型',
        key: 'type',
        required: true
      },
      {
        title: '备注',
        type: 'textarea',
        key: 'rarity',
        span: 24
      }
    ]
  },
  {
    title: '属性',
    type: 'card',
    key: '__attributes',
    collapsible: true,
    children: [
      {
        title: '精0',
        // 卡片表单可以套娃
        type: 'card',
        key: '__phases0',
        // 因为是组合表单，如果需要嵌入在子层的头部阴影变为生效，则可以如此设置
        props: {
          type: 'inner'
        },
        children: [
          // ... 等同普通 field 写法
        ]
      }
      // ... 等同普通 field 写法
    ]
  }
]
```
