---
hide: true
---

# 表单测试

## 测试表达式

```tsx
import React, { useRef, useState } from 'react'
import { AyForm, AyButton, AyFormField, FormValues } from 'amiya'
import { Space } from 'antd'

export default function Demo() {
  const formRef = useRef()
  const [count, setCount] = useState(1)
  const fields: Array<AyFormField> = [
    {
      type: 'checkbox',
      key: 'checkbox',
      children: '测试属性支持',
      help: <a>{count} 测试 ReactNode 节点</a>
    },
    {
      title: '{{ formValues.checkbox ? `测试标题张三` : `测试标题李四` }}',
      key: 'input'
    },
    {
      title: '测试 key',
      key: '{{ formValues.checkbox ? `testKey1` : `testKey2` }}',
      help: '提交查看属性'
    },
    {
      title: '测试 hidden',
      key: 'input3',
      hidden: '{{ formValues.checkbox }}'
    },
    {
      title: '测试 type',
      key: 'input4',
      type: '{{ formValues.checkbox ? `select` : `card-group` }}',
      options: [
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 }
      ]
    },
    {
      title: '测试 visible',
      key: 'input5',
      visible: '{{ !formValues.checkbox }}'
    },
    {
      title: '测试 style',
      key: 'input6',
      style: {
        transform: '{{ formValues.checkbox ? `translateX(0)` : `translateX(20px)` }}'
      }
    },
    {
      title: '测试 required',
      key: 'input7',
      dependencies: ['checkbox'],
      required: '{{ formValues.checkbox }}'
    },
    {
      title: '测试 group',
      key: '__group',
      type: 'group',
      children: [
        {
          key: 'a',
          span: '{{ formValues.checkbox ? 16 : 8 }}'
        },
        {
          key: 'b',
          span: '{{ formValues.checkbox ? 8 : 16 }}'
        }
      ]
    }
  ]
  const handleConfirm = (form: FormValues) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <AyForm ref={formRef} fields={fields} onConfirm={handleConfirm} style={{ width: 400, margin: '0 auto' }}>
      <Space>
        <AyButton type="primary" htmlType="submit">
          提交
        </AyButton>
        <AyButton onClick={() => setCount(count + 1)}>数字增加{count}</AyButton>
        <AyButton onClick={() => formRef.current.setFieldsValue({ input: 888 })}>设置表单值</AyButton>
      </Space>
    </AyForm>
  )
}
```

## 测试表达式 - JSX 测试

```tsx
import React from 'react'
import { AyForm, AyButton, FormValues, AyFields, AyField } from 'amiya'

export default function Demo() {
  const handleConfirm = (form: FormValues) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <AyForm onConfirm={handleConfirm} style={{ width: 400, margin: '0 auto' }}>
      <AyFields>
        <AyField type="checkbox" key="checkbox">
          测试属性支持
        </AyField>
        <AyField title="{{ formValues.checkbox ? `测试标题张三` : `测试标题李四` }}" key="input" />
        <AyField title="测试 key" key="{{ formValues.checkbox ? `testKey1` : `testKey2` }}" help="提交查看属性" />
        <AyField title="测试 hidden" key="input3" hidden="{{ formValues.checkbox }}" />
        <AyField
          title="测试 type"
          key="input4"
          type="{{ formValues.checkbox ? `select` : `card-group` }}"
          options={[
            { label: '选项1', value: 1 },
            { label: '选项2', value: 2 }
          ]}
        />
        <AyField title="测试 visible" key="input5" visible="{{ !formValues.checkbox }}" />
        <AyField
          title="测试 style"
          key="input6"
          style={{ transform: '{{ formValues.checkbox ? `translateX(0)` : `translateX(20px)` }}' }}
        />
        <AyField title="测试 required" key="input7" required="{{ formValues.checkbox }}" />
        <AyField title="测试 group" type="group" key="__group">
          <AyField key="a" span="{{ formValues.checkbox ? 16 : 8 }}" />
          <AyField key="b" span="{{ formValues.checkbox ? 8 : 16 }}" />
        </AyField>
      </AyFields>
      <AyButton style={{ marginLeft: 120 }} block type="primary" htmlType="submit">
        提交
      </AyButton>
    </AyForm>
  )
}
```

## 测试表达式 - 弹窗测试

```tsx
import React, { useState } from 'react'
import { AyButton, AyFormField, AyDialogForm, FormValues, AyFields, AyField } from 'amiya'

const fields: Array<AyFormField> = [
  {
    type: 'checkbox',
    key: 'checkbox',
    children: '测试属性支持'
  },
  {
    title: '{{ formValues.checkbox ? `测试标题张三` : `测试标题李四` }}',
    key: 'input'
  },
  {
    title: '测试 key',
    key: '{{ formValues.checkbox ? `testKey1` : `testKey2` }}',
    help: '提交查看属性'
  },
  {
    title: '测试 hidden',
    key: 'input3',
    hidden: '{{ formValues.checkbox }}'
  },
  {
    title: '测试 type',
    key: 'input4',
    type: '{{ formValues.checkbox ? `select` : `card-group` }}',
    options: [
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 }
    ]
  },
  {
    title: '测试 visible',
    key: 'input5',
    visible: '{{ !formValues.checkbox }}'
  },
  {
    title: '测试 style',
    key: 'input6',
    style: {
      transform: '{{ formValues.checkbox ? `translateX(0)` : `translateX(20px)` }}'
    }
  },
  {
    title: '测试 required',
    key: 'input7',
    required: '{{ formValues.checkbox }}'
  },
  {
    title: '测试 group',
    key: '__group',
    type: 'group',
    children: [
      {
        key: 'a',
        span: '{{ formValues.checkbox ? 16 : 8 }}'
      },
      {
        key: 'b',
        span: '{{ formValues.checkbox ? 8 : 16 }}'
      }
    ]
  }
]
export default function Demo() {
  const [visible, setVisible] = useState(false)
  const handleConfirm = (form: FormValues) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <div>
      <AyButton onClick={() => setVisible(true)}>打开弹窗</AyButton>
      <AyDialogForm
        visible={visible}
        fields={fields}
        onClose={() => setVisible(false)}
        addApi={() => Promise.resolve()}
        onSuccess={({ params }) => handleConfirm(params)}
      />
    </div>
  )
}
```

## 测试表达式 - 弹窗测试 - JSX 测试

```tsx
import React, { useState } from 'react'
import { AyButton, AyDialogForm, FormValues, AyFields, AyField } from 'amiya'

export default function Demo() {
  const [visible, setVisible] = useState(false)
  const handleConfirm = (form: FormValues) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <div>
      <AyButton onClick={() => setVisible(true)}>打开弹窗</AyButton>
      <AyDialogForm
        visible={visible}
        onClose={() => setVisible(false)}
        addApi={() => Promise.resolve()}
        onSuccess={({ params }) => handleConfirm(params)}
      >
        <AyFields>
          <AyField type="checkbox" key="checkbox">
            测试属性支持
          </AyField>
          <AyField title="{{ formValues.checkbox ? `测试标题张三` : `测试标题李四` }}" key="input" />
          <AyField title="测试 key" key="{{ formValues.checkbox ? `testKey1` : `testKey2` }}" help="提交查看属性" />
          <AyField title="测试 hidden" key="input3" hidden="{{ formValues.checkbox }}" />
          <AyField
            title="测试 type"
            key="input4"
            type="{{ formValues.checkbox ? `select` : `card-group` }}"
            options={[
              { label: '选项1', value: 1 },
              { label: '选项2', value: 2 }
            ]}
          />
          <AyField title="测试 visible" key="input5" visible="{{ !formValues.checkbox }}" />
          <AyField
            title="测试 style"
            key="input6"
            style={{ transform: '{{ formValues.checkbox ? `translateX(0)` : `translateX(20px)` }}' }}
          />
          <AyField title="测试 required" key="input7" required="{{ formValues.checkbox }}" />
          <AyField title="测试 group" type="group" key="__group">
            <AyField key="a" span="{{ formValues.checkbox ? 16 : 8 }}" />
            <AyField key="b" span="{{ formValues.checkbox ? 8 : 16 }}" />
          </AyField>
        </AyFields>
      </AyDialogForm>
    </div>
  )
}
```
