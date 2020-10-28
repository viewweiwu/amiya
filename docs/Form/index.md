# AyForm

## 登录示例

```tsx
import React from 'react'
import { AyForm, AyButton, AyFormField } from 'amiya'
import 'antd/dist/antd.min.css'

const fields: Array<AyFormField> = [
  {
    title: '用户名',
    key: 'name',
    required: true
  },
  {
    title: '密码',
    type: 'password',
    key: 'password',
    required: true
  },
  {
    type: 'checkbox',
    key: 'remember',
    props: {
      style: {
        float: 'right'
      },
      children: '记住密码'
    }
  }
]

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <AyForm
      span={24}
      fields={fields}
      onConfirm={handleConfirm}
      style={{ width: 400, margin: '0 auto' }}
      layout={{ labelCol: { flex: '100px' } }}
    >
      <AyButton block type="primary" htmlType="submit">
        提交
      </AyButton>
    </AyForm>
  )
}
```

## 表单项只读

```tsx
import React from 'react'
import { AyForm, AyButton, AyFormField } from 'amiya'
import 'antd/dist/antd.min.css'

const fields: Array<AyFormField> = [
  {
    title: '创建人',
    key: 'createName',
    readonly: true,
    defaultValue: 'Amiya'
  },
  {
    title: '用户名',
    key: 'name'
  },
  {
    title: '密码',
    type: 'password',
    key: 'password'
  },
  {
    type: 'checkbox',
    key: 'remember',
    props: {
      style: {
        float: 'right'
      },
      children: '记住密码'
    }
  }
]

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <AyForm
      span={24}
      fields={fields}
      onConfirm={handleConfirm}
      style={{ width: 400, margin: '0 auto' }}
      layout={{ labelCol: { flex: '100px' } }}
    >
      <AyButton block type="primary" htmlType="submit">
        提交
      </AyButton>
    </AyForm>
  )
}
```

## 所有的默认表单类型

```tsx
import React, { useState } from 'react'
import { AyForm, AyButton, AyFormField } from 'amiya'
import { Switch } from 'antd'
import 'antd/dist/antd.min.css'

const fields: Array<AyFormField> = [
  {
    title: 'Input',
    key: 'input'
  },
  {
    title: 'Number',
    type: 'number',
    key: 'number'
  },
  {
    title: 'Percent',
    type: 'percent',
    key: 'percent'
  },
  {
    title: 'Password',
    type: 'password',
    key: 'password'
  },
  {
    title: 'Textarea',
    type: 'textarea',
    key: 'textarea'
  },
  {
    title: 'Select',
    type: 'select',
    key: 'select',
    options: [
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 }
    ]
  },
  {
    title: 'Switch',
    type: 'switch',
    key: 'switch'
  },
  {
    title: 'Checkbox',
    type: 'checkbox',
    key: 'checkbox',
    props: {
      children: '同意？'
    }
  },
  {
    title: 'CheckboxGroup',
    type: 'checkbox-group',
    key: 'checkbox-group',
    options: [
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 }
    ]
  },
  {
    title: 'RadioGroup',
    type: 'radio-group',
    key: 'radio-group',
    options: [
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 }
    ]
  },
  {
    title: 'Date',
    type: 'date',
    key: 'date'
  },
  {
    title: 'Datetime',
    type: 'date',
    key: 'datetime',
    props: {
      showTime: true
    }
  },
  {
    title: 'DateRange',
    type: 'date-range',
    key: 'date-range'
  },
  {
    title: 'DatetimeRange',
    type: 'date-range',
    key: 'datetime-range',
    props: {
      showTime: true
    }
  }
]

export default function Demo() {
  const [readonly, setReadonly] = useState<boolean>(false)

  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <>
      <p>
        <label style={{ marginRight: 4 }}>只读模式</label>
        <Switch defaultChecked={readonly} onChange={(value) => setReadonly(value)} />
      </p>
      <AyForm
        readonly={readonly}
        span={24}
        fields={fields}
        onConfirm={handleConfirm}
        style={{ width: 600, margin: '0 auto' }}
      >
        <AyButton block type="primary" htmlType="submit">
          提交
        </AyButton>
      </AyForm>
    </>
  )
}
```

## tooltip 提示

```tsx
import React from 'react'
import { AyForm, AyFormField } from 'amiya'
import 'antd/dist/antd.min.css'

const fields: Array<AyFormField> = [
  {
    title: 'Field A',
    key: 'a',
    formItemProps: {
      tooltip: '这是 A 提示'
    }
  },
  {
    title: 'Field B',
    key: 'b',
    formItemProps: {
      tooltip: '这是 B 提示'
    }
  }
]

export default function Demo() {
  return <AyForm span={24} fields={fields} style={{ width: 400, margin: '0 auto' }} />
}
```

## help 提示

```tsx
import React from 'react'
import { AyForm, AyFormField } from 'amiya'
import 'antd/dist/antd.min.css'

const fields: Array<AyFormField> = [
  {
    title: 'Field A',
    key: 'a',
    help: '这是 A 提示'
  },
  {
    title: 'Field B',
    key: 'b',
    help: '这是 B 提示'
  }
]

export default function Demo() {
  return <AyForm span={24} fields={fields} style={{ width: 400, margin: '0 auto' }} />
}
```

## Props 参数

| 参数名    | 说明                                  | 参数类型                | 默认值    |
| --------- | ------------------------------------- | ----------------------- | --------- |
| fields    | 配置项                                | Array<[AyFormField][2]> | -         |
| name      | form 名称，一般不需要填               | string                  | 'ay-form' |
| span      | antd Grid 的 Col 组件的 span 属性类似 | 1 ～ 24                 | 12        |
| footer    | 自定义底部按钮                        | ReactNode               | -         |
| width     | 弹窗宽度                              | number                  | -         |
| layout    | 布局参数, 查看下方 layout 参数        | Object                  | -         |
| props     | antd Form 其它参数                    | [查看参数][1]           | -         |
| onConfirm | 提交事件监听                          | (form: Object) => void  | -         |

## layout 参数

```javascript
// 这个是默认值
const layout = {
  labelCol: { flex: '120px' }, // label 宽度
  wrapperCol: { flex: '1' } // content 宽度
}

// 传进去可以只填写一项
const layout = {
  labelCol: { flex: '100px' } // label 宽度
}
// or
const layout = {
  wrapperCol: { flex: '200px' } // content 宽度
}
```

## Method 方法

| 方法名                         | 说明                | 返回值         |
| ------------------------------ | ------------------- | -------------- |
| submit()                       | 主动提交表单        | -              |
| resetFields()                  | 重置表单            | -              |
| getFieldValue(key: string)     | 根据 key 获取表单值 | any            |
| getFieldsValue()               | 获取所有表单值      | values: Object |
| setFieldsValue(values: Object) | 设置表单值          | -              |

[1]: https://ant-design.gitee.io/components/form-cn/#API
[2]: /filed参数详解#ayformfield-参数
