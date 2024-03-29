# Form 表单基础

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react'
import { AyForm, AyButton, AyFormField } from 'amiya'

const fields: Array<AyFormField> = [
  {
    title: '中文名',
    key: 'cn'
  },
  {
    title: '年龄',
    type: 'slider',
    key: 'sex'
  }
]

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <AyForm fields={fields} onConfirm={handleConfirm} style={{ width: 400, margin: '0 auto' }}>
      <AyButton style={{ marginLeft: 120 }} type="primary" htmlType="submit">
        提交
      </AyButton>
    </AyForm>
  )
}
```

更详细表单支持的类型看[这里](../../components/form#所有的默认表单类型)

## JSX / TSX 语法糖 <Badge>0.41.0</Badge>

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react'
import { AyForm, AyButton, AyFields, AyField } from 'amiya'

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <AyForm onConfirm={handleConfirm} style={{ width: 400, margin: '0 auto' }}>
      <AyFields>
        <AyField title="中文名" key="cn" />
        <AyField title="年龄" key="sex" type="slider" />
      </AyFields>
      <AyButton style={{ marginLeft: 120 }} type="primary" htmlType="submit">
        提交
      </AyButton>
    </AyForm>
  )
}
```

只是换了另一种风格写 `fields` 而已，请不要用其它元素包裹住 `AyFields` 和 `AyField`。

## 必填表单

```tsx
import React from 'react'
import { AyForm, AyButton, AyFormField } from 'amiya'

const fields: Array<AyFormField> = [
  {
    title: '中文名',
    key: 'cn',
    required: true
  },
  {
    title: '年龄',
    type: 'slider',
    key: 'sex'
  }
]

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <AyForm fields={fields} onConfirm={handleConfirm} style={{ width: 400, margin: '0 auto' }}>
      <AyButton style={{ marginLeft: 120 }} type="primary" htmlType="submit">
        提交
      </AyButton>
    </AyForm>
  )
}
```

```diff
const fields: Array<AyFormField> = [
  {
    title: '中文名',
    key: 'cn',
    // 推荐这种，写起来简单
+   required: true
    // 虽然可以，但这么写会多一些代码
    // rules: [
    //   {
    //     required: true,
    //     message: '请输入中文名'
    //   }
    // ]
  },
  {
    title: '年龄',
    type: 'slider',
    key: 'sex',
  }
]
```

必填方式有两种

1. 直接指定 `required: true`（Amiya 推荐使用这种）
2. 手动填写 `rules`

## 表单默认值

```tsx
import React from 'react'
import { AyForm, AyButton, AyFormField } from 'amiya'

const fields: Array<AyFormField> = [
  {
    title: '中文名',
    key: 'cn',
    required: true,
    defaultValue: '阿米娅'
  },
  {
    title: '年龄',
    type: 'slider',
    key: 'sex',
    required: true,
    defaultValue: 18
  }
]

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <AyForm fields={fields} onConfirm={handleConfirm} style={{ width: 400, margin: '0 auto' }}>
      <AyButton style={{ marginLeft: 120 }} type="primary" htmlType="submit">
        提交
      </AyButton>
    </AyForm>
  )
}
```

```diff
const fields: Array<AyFormField> = [
  {
    title: '中文名',
    key: 'cn',
    required: true,
+   defaultValue: '阿米娅'
  },
  {
    title: '年龄',
    type: 'slider',
    key: 'sex',
    required: true,
+   defaultValue: 18
  }
]
```

## 只读表单

### 表单元素只读

```tsx
import React from 'react'
import { AyForm, AyButton, AyFormField } from 'amiya'
import { Card } from 'antd'

const fields: Array<AyFormField> = [
  {
    title: '中文名',
    key: 'cn',
    readonly: true,
    defaultValue: '阿米娅'
  },
  {
    title: '年龄',
    type: 'slider',
    key: 'sex',
    defaultValue: 18
  }
]

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <Card>
      <AyForm fields={fields} onConfirm={handleConfirm} style={{ width: 400, margin: '0 auto' }}>
        <AyButton style={{ marginLeft: 120 }} type="primary" htmlType="submit">
          提交
        </AyButton>
      </AyForm>
    </Card>
  )
}
```

```diff
const fields: Array<AyFormField> = [
  {
    title: '中文名',
    key: 'cn',
+   readonly: true,
    defaultValue: '阿米娅'
  },
  {
    title: '年龄',
    type: 'slider',
    key: 'sex',
    defaultValue: 18
  }
]
```

### 表单整体只读

```tsx
import React from 'react'
import { AyForm, AyButton, AyFormField } from 'amiya'
import { Card } from 'antd'

const fields: Array<AyFormField> = [
  {
    title: '中文名',
    key: 'cn',
    defaultValue: '阿米娅'
  },
  {
    title: '年龄',
    type: 'slider',
    key: 'sex',
    defaultValue: 18
  }
]

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <Card>
      <AyForm readonly fields={fields} onConfirm={handleConfirm} style={{ width: 400, margin: '0 auto' }}>
        <AyButton style={{ marginLeft: 120 }} type="primary" htmlType="submit">
          提交
        </AyButton>
      </AyForm>
    </Card>
  )
}
```

```diff

<AyForm
+ readonly
  fields={fields}
/>
  <AyButton type="primary" htmlType="submit">
    提交
  </AyButton>
</AyForm>
```

## desc 模式

### desc 表单

```tsx
import React from 'react'
import { AyForm, AyButton, AyFormField } from 'amiya'
import { Card } from 'antd'

const fields: Array<AyFormField> = [
  {
    title: '中文名',
    key: 'cn',
    defaultValue: '阿米娅'
  },
  {
    title: '年龄',
    type: 'slider',
    key: 'sex',
    defaultValue: 18
  }
]

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <Card>
      <AyForm desc fields={fields} onConfirm={handleConfirm} style={{ width: 400, margin: '0 auto' }}>
        <AyButton style={{ marginTop: 16 }} type="primary" htmlType="submit">
          提交
        </AyButton>
      </AyForm>
    </Card>
  )
}
```

```diff
<AyForm
+ desc
  fields={fields}
>
</AyForm>
```

### desc 只读表单

```tsx
import React from 'react'
import { AyForm, AyButton, AyFormField } from 'amiya'
import { Card } from 'antd'

const fields: Array<AyFormField> = [
  {
    title: '中文名',
    key: 'cn',
    defaultValue: '阿米娅'
  },
  {
    title: '年龄',
    type: 'slider',
    key: 'sex',
    defaultValue: 18
  }
]

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <Card>
      <AyForm readonly desc fields={fields} onConfirm={handleConfirm} style={{ width: 400, margin: '0 auto' }}>
        <AyButton style={{ marginTop: 16 }} type="primary" htmlType="submit">
          提交
        </AyButton>
      </AyForm>
    </Card>
  )
}
```

```diff
<AyForm
+ desc
+ readonly
  fields={fields}
>
</AyForm>
```

## 弹窗表单

```tsx
/**
 * defaultShowCode: true
 */
import React, { useRef } from 'react'
import { AyDialogForm, AyFormField, AyButton, success } from 'amiya'
import { addApi } from '../../components/api'

const fields: Array<AyFormField> = [
  {
    title: '中文名',
    key: 'cn',
    required: true
  },
  {
    title: '编号',
    key: 'index',
    required: true
  }
]

export default function Demo() {
  const formRef = useRef<any>()

  const handleAdd = () => {
    formRef.current.add().then(() => {
      success('新增成功')
    })
  }

  return (
    <div>
      <AyDialogForm ref={formRef} fields={fields} addApi={addApi} />
      <AyButton onClick={handleAdd}>新增</AyButton>
    </div>
  )
}
```

更详细的弹窗表单使用，请看[这里](../../components/form/ay-dialog-form)
