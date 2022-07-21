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

## 新数据存在默认值

添加新的一行数据时，希望存在默认值，可使用 `creatorRecord`，请尝试点击[添加一行数据]按钮，会自动赋值昵称。

```tsx
import React from 'react'
import { AyForm, AyButton, AyFormField, FormValues } from 'amiya'

const fields: Array<AyFormField> = [
  {
    title: '使用人员',
    key: 'list',
    type: 'list',
    creatorRecord: { name: 'Amiya' },
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

```diff
const fields: Array<AyFormField> = [
  {
    title: '使用人员',
    key: 'list',
    type: 'list',
+   creatorRecord: { name: 'Amiya' },
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
```

## 最大最少限制

当使用 `min` 时，最好补充 `defaultValue` 和 `required` 来限制用户提交时至少有一条数据。

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
    defaultValue: [{}],
    children: [
      {
        title: '昵称',
        key: 'name',
        required: true
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

## 控制元素间距

每一行都是用 [antd Space](https://ant.design/components/space-cn/) 包裹着，可以传入 spaceProps 添加属性，例如使用 size 控间隔。

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
    spaceProps: {
      size: 24
    },
    defaultValue: [{}],
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
+ spaceProps: {
+   size: 24
+ }
}
```

## 只读

```tsx
import React, { useState } from 'react'
import { AyForm, AyButton, AyFormField, FormValues } from 'amiya'
import { Card, Switch } from 'antd'

export default function Demo() {
  const [readonly, setReadonly] = useState(true)

  const fields: Array<AyFormField> = [
    {
      title: '使用人员',
      key: 'list',
      type: 'list',
      min: 1,
      max: 4,
      defaultValue: [
        {
          name: 'Amiya',
          class: 1
        },
        {
          name: '能天使',
          class: 2
        }
      ],
      children: [
        {
          title: '昵称',
          key: 'name'
        },
        {
          title: '职业',
          type: 'select',
          key: 'class',
          options: [
            { label: '术师重装', value: 1 },
            { label: '狙击干员', value: 2 }
          ]
        }
      ]
    }
  ]

  const handleConfirm = (form: FormValues) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <Card>
      <div>
        是否只读：
        <Switch checked={readonly} onChange={setReadonly} />
      </div>
      <AyForm fields={fields} formLayout="vertical" onConfirm={handleConfirm} span={24} readonly={readonly}>
        <AyButton type="primary" htmlType="submit">
          提交
        </AyButton>
      </AyForm>
    </Card>
  )
}
```

## 注意点

当子元素存在 `date`, `date-range` 时，跟直接使用会有所不同，设置默认值时需要由 `moment` 包裹。

```tsx
import React, { useState } from 'react'
import { AyForm, AyButton, AyFormField, FormValues } from 'amiya'
import { Card, Switch } from 'antd'
import moment from 'moment'

export default function Demo() {
  const [readonly, setReadonly] = useState(false)

  const fields: Array<AyFormField> = [
    {
      title: '使用人员',
      key: 'list',
      type: 'list',
      min: 1,
      max: 4,
      defaultValue: [
        {
          name: 'Amiya',
          date: moment(),
          eventDate: [moment(), moment()]
        },
        {
          name: '能天使',
          date: moment(),
          eventDate: []
        }
      ],
      children: [
        {
          title: '昵称',
          key: 'name'
        },
        {
          title: '日期',
          type: 'date',
          key: 'date'
        },
        {
          title: '活动时间',
          type: 'date-range',
          key: 'eventDate'
        }
      ]
    }
  ]

  const handleConfirm = (form: FormValues) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <Card>
      <div>
        是否只读：
        <Switch checked={readonly} onChange={setReadonly} />
      </div>
      <AyForm fields={fields} formLayout="vertical" onConfirm={handleConfirm} span={24} readonly={readonly}>
        <AyButton type="primary" htmlType="submit">
          提交
        </AyButton>
      </AyForm>
    </Card>
  )
}
```
