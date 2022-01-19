# AyForm

<!-- ![amiya AyForm](https://misc.hzzcckj.cn/upload/image/202011/ac64675b2800000.png) -->

## 登录示例

```tsx
import React from 'react'
import { AyForm, AyButton, AyFormField } from 'amiya'

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
        marginLeft: 120
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
    <AyForm span={24} fields={fields} onConfirm={handleConfirm} style={{ width: 400, margin: '0 auto' }}>
      <AyButton style={{ marginLeft: 120 }} block type="primary" htmlType="submit">
        登录
      </AyButton>
    </AyForm>
  )
}
```

## JSX / TSX 语法糖 <Badge>0.41.0</Badge>

```tsx
import React from 'react'
import { AyForm, AyButton, AyFields, AyField } from 'amiya'

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  const options = [
    { label: '苹果', value: 1 },
    { label: '香蕉', value: 2 }
  ]

  return (
    <AyForm span={24} onConfirm={handleConfirm} style={{ width: 800, margin: '0 auto' }}>
      <AyFields>
        <AyField key="name" title="姓名" />
        <AyField key="fruit" title="水果" type="select" options={options} />
        <AyField key="__group" type="input-group" title="送达时间">
          <AyField key="start" type="date" props={{ style: { width: '50%' } }} />
          <AyField key="end" type="date" props={{ style: { width: '50%' } }} />
        </AyField>
      </AyFields>
      <AyButton style={{ marginLeft: 120 }} block type="primary" htmlType="submit">
        登录
      </AyButton>
    </AyForm>
  )
}
```

## 表单布局

默认会是右侧，label 跟 content 在一起展示。此示例演示如何将 label 展示在顶部。

```tsx
import React, { useState } from 'react'
import { AyForm, AyFormField } from 'amiya'
import { Radio } from 'antd'

type FormLayout = 'horizontal' | 'vertical' | 'inline'

const options = [
  { label: 'horizontal', value: 'horizontal' },
  { label: 'vertical', value: 'vertical' },
  { label: 'inline', value: 'inline' }
]

const fields: Array<AyFormField> = [
  {
    title: 'Field A',
    key: 'a'
  },
  {
    title: 'Field B',
    key: 'b'
  }
]

export default function Demo() {
  const [formLayout, setFormLayout] = useState<FormLayout>('horizontal')

  return (
    <>
      <Radio.Group options={options} onChange={e => setFormLayout(e.target.value)} value={formLayout} />
      <AyForm span={24} fields={fields} style={{ width: 600, margin: '10px auto 0' }} formLayout={formLayout} />
    </>
  )
}
```

## 创造一个连体 Field

可以通过一些特殊的技巧，创造一个连体的 Field，一般常见于右侧多一个 Checkbox。

```tsx
import React, { useState, MutableRefObject, useRef } from 'react'
import { AyForm, AyFormField, AyButton } from 'amiya'

export default function Demo() {
  const formRef: MutableRefObject<any> = useRef()

  // 如果中途会变动 fields，请把 fields 写在函数内部
  const fields: Array<AyFormField> = [
    {
      title: 'Field B',
      type: 'checkbox',
      key: 'a',
      required: true,
      onChange: (value, allValues, setFieldsValue) => {
        // 控制其它 field 的 readonly
        fields[1].readonly = value
        // 控制其它 field 的 校验
        fields[1].rules = value ? [] : [{ required: true, message: '请输入 Field B' }]
        // 清空 b 的表单值
        formRef.current.resetFields(['b'])
        // 重新渲染 form
        formRef.current.refreshFields()
      },
      props: {
        children: '之后填写',
        style: {
          float: 'right'
        }
      },
      formItemProps: {
        labelCol: { flex: '120px' },
        style: {
          marginBottom: 0
        }
      }
    },
    {
      key: 'b',
      readonly: false,
      props: {
        placeholder: '请输入 Field B'
      },
      rules: [{ required: true, message: '请输入 Field B' }]
    }
  ]

  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <AyForm
      ref={formRef}
      layout={{ labelCol: { flex: '100%' } }}
      labelAlign="left"
      span={24}
      fields={fields}
      onConfirm={handleConfirm}
      style={{ width: 400, margin: '0 auto' }}
    >
      <AyButton type="primary" htmlType="submit">
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
import { Card } from 'antd'

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
  }
]

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <Card>
      <AyForm span={24} fields={fields} onConfirm={handleConfirm} style={{ width: 400, margin: '0 auto' }}>
        <AyButton style={{ marginLeft: 120 }} type="primary" htmlType="submit">
          提交
        </AyButton>
      </AyForm>
    </Card>
  )
}
```

## 所有的默认表单类型

```tsx
import React, { useState } from 'react'
import { AyForm, AyButton, AyFormField } from 'amiya'
import { Switch, Card } from 'antd'

const fields: Array<AyFormField> = [
  {
    title: 'Input',
    key: 'input'
  },
  {
    title: 'Search',
    key: 'search',
    type: 'search'
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
    key: 'date-range',
    startKey: 'date-range-start',
    endKey: 'date-range-end'
  },
  {
    title: 'DatetimeRange',
    type: 'date-range',
    key: 'datetime-range',
    startKey: 'date-range-time-start',
    endKey: 'date-range-time-end',
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
    <Card>
      <p>
        <label style={{ marginRight: 4 }}>只读模式</label>
        <Switch defaultChecked={readonly} onChange={value => setReadonly(value)} />
      </p>
      <AyForm
        readonly={readonly}
        span={24}
        fields={fields}
        onConfirm={handleConfirm}
        style={{ width: 600, margin: '0 auto' }}
      >
        <AyButton style={{ marginLeft: 120 }} type="primary" htmlType="submit">
          提交
        </AyButton>
      </AyForm>
    </Card>
  )
}
```

## Desc 模式

<code src="./AyFormDescDemo.tsx" />

## help 提示

```tsx
import React from 'react'
import { AyForm, AyFormField } from 'amiya'

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

| 参数名        | 说明                                         | 参数类型                               | 默认值       |
| ------------- | -------------------------------------------- | -------------------------------------- | ------------ |
| fields        | 配置项                                       | Array<[AyFormField][2]>                | -            |
| name          | form 名称，一般不需要填                      | string                                 | 'ay-form'    |
| span          | antd Grid 的 Col 组件的 span 属性类似        | 1 ～ 24                                | 12           |
| readonly      | 只读模式                                     | boolean                                | false        |
| desc          | Descripts 模式                               | boolean                                | false        |
| layout        | 布局参数, 查看下方 layout 参数               | Object                                 | -            |
| formLayout    | 布局方式                                     | 'horizontal' \| 'vertical' \| 'inline' | 'horizontal' |
| props         | antd Form 其它参数                           | [查看参数][1]                          | -            |
| formItemProps | antd Form.Item 其它参数                      | [查看参数][3]                          | -            |
| onConfirm     | 提交事件监听                                 | (form: Object) => void                 | -            |
| gutter        | 表单项横向之间的间距，Row 上面的 gutter 属性 | number                                 | -            |

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

## AyFormField 参数

| 参数名             | 说明                                                                                | 参数类型                                                               | 默认值                                    |
| ------------------ | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------- |
| title              | 相应的 key，会跟最后表单取到的项目相关; form 的 key 值必填                          | string                                                                 | -                                         |
| key                | 唯一 key，<span style="color: #f06;">当 key 以双下划线开头时，提交会被忽略。</span> | string                                                                 | -                                         |
| type               | 表单项类型                                                                          | [FormType][formtype]                                                   | 'input'                                   |
| options            | 可选项                                                                              | Array<[Option][option]>                                                | -                                         |
| span               | Grid Col 占位 [0 - 24]                                                              | number                                                                 | -                                         |
| defaultValue       | 默认值                                                                              | any                                                                    | -                                         |
| required           | 是否必填                                                                            | boolean                                                                | -                                         |
| rules              | 自定义权限                                                                          | Array<[Rules](https://ant-design.gitee.io/components/form-cn/#Rule)>   | -                                         |
| visible            | 是否展示，保留占位; 保留默认值                                                      | boolean                                                                | -                                         |
| hidden             | 是否展示，不会占位; 保留默认值                                                      | boolean \| Function                                                    | -                                         |
| props              | 原生的属性                                                                          | Object                                                                 | -                                         |
| formItemProps      | FormItem 层原生的属性                                                               | Object                                                                 | -                                         |
| renderContent      | 自定义 content 内容，需要指定 type: 'custom'                                        | (field: AyFormField, record: Record) => ReactNode                      | -                                         |
| onChange           | 数据变化监听                                                                        | (field: AyFormField, record: Record, setFieldsValue: Function) => void | -                                         |
| help               | 在表单下会有一段提示文字                                                            | string \| ReactNode                                                    | -                                         |
| startKey           | 时间格式化的开始时间，提交时，会自动将日期区间拆分                                  | string                                                                 | 'startDate'                               |
| endKey             | 时间格式化的结束时间，提交时，会自动将日期区间拆分                                  | string                                                                 | 'endDate'                                 |
| formatRule         | 自定义格式化规则如果设置了 props.showTime = true，则格式化会默认带上时间            | string                                                                 | 'YYYY-MM-DD' or <br>'YYYY-MM-DD HH:mm:ss' |
| readonlyFormatRule | readonly 下的自定义格式化规则                                                       | string                                                                 | 'YYYY-MM-DD' or <br>'YYYY-MM-DD HH:mm:ss' |
| reSetting          | 重新渲染                                                                            | (params: AyFormField, mode: string) => AyFormField                     | -                                         |
| order              | 展示顺序                                                                            | number                                                                 | -                                         |

<span style="color: #f06;">日期格式化</span>相关的，可以点击[这里][日期格式化]查看更具体的细节。

## FormType

FormType 是指写 field 时候的 type 的可选项。
在系统里面预置了下面几种表单类型。如果要自定义类型，请参考 registerField。

```typescript
const fields: Array<Field> = [
  {
    type: 'input' // FormType 指此处可选的值
  }
]
```

<hr />

| 值类型         | 说明                                                                 | 默认值    |
| -------------- | -------------------------------------------------------------------- | --------- |
| input          | 输入框，默认字符长度 30                                              | ''        |
| number         | 数字输入框，0 ～ 99999999                                            | null      |
| percent        | 百分比输入框，0 ～ 100                                               | null      |
| password       | 密码输入框                                                           | ''        |
| textarea       | 多行输入框，默认字符长度 200                                         | ''        |
| select         | 选择框                                                               | undefined |
| switch         | 开关                                                                 | false     |
| checkbox       | 多选框（单个）                                                       | false     |
| checkbox-group | 多选框（多个）                                                       | []        |
| radio-group    | 单选框（多个）                                                       | null      |
| date           | 日期                                                                 | undefined |
| date-range     | 日期区间                                                             | []        |
| empty          | 空白框                                                               | -         |
| custom         | 自定义 renderContent 使用，需要在同一层定义 defaultValue             | -         |
| card           | 会用 AyCard 包裹住底下的 form，具体使用可以看 [卡片表单][cardform]。 | -         |
| group          | 组合表单，具体使用可以看 [组合表单][groupform]。                     | -         |
| input-group    | 带输入框的组合表单，具体使用可以看 [组合表单][groupform]。           | -         |

## Option 参数

| 参数名   | 说明     | 参数类型                | 默认值 |
| -------- | -------- | ----------------------- | ------ |
| label    | 显示选项 | string \| number        | -      |
| value    | 值       | any                     | -      |
| disabled | 是否禁用 | boolean                 | -      |
| children | 子元素   | Array<[Option][option]> | -      |

## Method 方法

| 方法名                         | 说明                                                      | 返回值         |
| ------------------------------ | --------------------------------------------------------- | -------------- |
| submit()                       | 主动提交表单                                              | -              |
| resetFields()                  | 重置表单                                                  | -              |
| getFieldValue(key: string)     | 根据 key 获取表单值                                       | any            |
| getFieldsValue()               | 获取所有表单值                                            | values: Object |
| getFormatFieldsValue()         | 获取已经过滤后的表单值，当有嵌套时使用                    | values: Object |
| setFieldsValue(values: Object) | 设置表单值                                                | -              |
| refreshFields()                | 重新渲染表单，如果动态改变了 fields，可以用此参数重新渲染 | -              |

[1]: https://ant-design.gitee.io/components/form-cn/#API
[2]: ./form#ayformfield-参数
[3]: https://ant-design.gitee.io/components/form-cn/#Form.Item
[formtype]: ./form#formtype
[option]: ./form#option-参数
[ayformfield]: ./form#ayformfield-参数
[cardform]: ./form/卡片表单
[groupform]: ./form/组合表单
[日期格式化]: ./form/date%20日期的格式化
