# AyFormList

`AyFormList` 指表单类型为列表输入，即 `type: 'list'`。

## 基础使用

```tsx
import React from 'react'
import { AyForm, AyButton, AyFormField, FormValues } from 'amiya'

const fields: Array<AyFormField> = [
  {
    title: '使用人员',
    key: 'list',
    type: 'list',
    createRecord: { name: '张三' },
    children: [
      {
        title: '昵称',
        key: 'name'
      },
      {
        title: '年龄',
        key: 'old'
      }
    ]
  }
]
export default function Demo() {
  const handleConfirm = (form: FormValues) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <AyForm fields={fields} formLayout="vertical" onConfirm={handleConfirm}>
      <AyButton type="primary" htmlType="submit">
        提交
      </AyButton>
    </AyForm>
  )
}
```

## 最大最少限制

```tsx
import React from 'react'
import { AyForm, AyButton, AyFormField, FormValues } from 'amiya'

const fields: Array<AyFormField> = [
  {
    title: '使用人员',
    key: 'list',
    type: 'list',
    min: 1,
    max: 4,
    children: [
      {
        title: '昵称',
        key: 'name'
      },
      {
        title: '年龄',
        key: 'old'
      }
    ]
  }
]
export default function Demo() {
  const handleConfirm = (form: FormValues) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <AyForm fields={fields} formLayout="vertical" onConfirm={handleConfirm} span={24}>
      <AyButton type="primary" htmlType="submit">
        提交
      </AyButton>
    </AyForm>
  )
}
```

```diff
{
  title: '使用人员',
  key: 'list',
  type: 'list',
  // 最少行，少于此数，将会隐藏删除按钮
+ min: 1,
  // 最大行，大于此数，将会隐藏 添加、复制 按钮
+ max: 4,
  children: [
    {
      title: '昵称',
      key: 'name'
    },
    {
      title: '年龄',
      key: 'old'
    }
  ]
}
```
