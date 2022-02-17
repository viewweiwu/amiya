# AyForm 表单

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
    <AyForm fields={fields} onConfirm={handleConfirm} style={{ width: 400, margin: '0 auto' }}>
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

  return (
    <AyForm onConfirm={handleConfirm} style={{ width: 400, margin: '0 auto' }}>
      <AyFields>
        <AyField key="name" required title="用户名" />
        <AyField key="password" type="password" required title="密码" />
        <AyField key="checkbox" type="checkbox" props={{ style: { marginLeft: 120 }, children: '记住密码' }} />
      </AyFields>
      <AyButton style={{ marginLeft: 120 }} type="primary" block htmlType="submit">
        登录
      </AyButton>
    </AyForm>
  )
}
```

```diff
-const fields: Array<AyFormField> = [
- {
-   title: '用户名',
-   key: 'name',
-   required: true
- },
- {
-   title: '密码',
-   type: 'password',
-   key: 'password',
-   required: true
- },
- {
-   type: 'checkbox',
-   key: 'remember',
-   props: {
-     style: {
-       marginLeft: 120
-     },
-     children: '记住密码'
-   }
-]

<AyForm
  onConfirm={handleConfirm}
- fields={fields}
>
+ <AyFields>
+   <AyField key="name" required title="用户名" />
+   <AyField key="password" type="password" required title="密码" />
+   <AyField
+     key="checkbox"
+     type="checkbox"
+     props={{ style: { marginLeft: 120 }, children: '记住密码' }}
+   />
+ </AyFields>
  <AyButton style={{ marginLeft: 120 }} type="primary" htmlType="submit">
    登录
  </AyButton>
</AyForm>
```

只是换了另一种风格写 `fields` 而已，请不要用其它元素包裹住 `AyFields` 和 `AyField`。

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
      <AyForm fields={fields} style={{ width: 600, margin: '10px auto 0' }} formLayout={formLayout} />
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
  const [readonly, setReadonly] = useState(false)

  const fields: Array<AyFormField> = [
    {
      title: 'Field B',
      type: 'checkbox',
      key: 'a',
      required: true,
      onChange: (value: boolean) => {
        setReadonly(value)
        // 清空 b 的表单值
        formRef.current.resetFields(['b'])
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
      readonly,
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
      <AyForm fields={fields} onConfirm={handleConfirm} style={{ width: 400, margin: '0 auto' }}>
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
import { AyForm, AyButton, AyFormField, AnyKeyProps } from 'amiya'
import { Switch, Col } from 'antd'
import moment from 'moment'

const fields: Array<AyFormField> = [
  {
    title: '基础类型',
    type: 'card',
    key: '__base',
    children: [
      {
        title: '输入框',
        key: 'input',
        defaultValue: 'Amiya'
      },
      {
        title: '密码框',
        type: 'password',
        key: 'password',
        defaultValue: 'meiyoumima'
      },
      {
        title: '选择框',
        type: 'select',
        key: 'select',
        defaultValue: 1,
        options: [
          { label: '选项1', value: 1 },
          { label: '选项2', value: 2 }
        ]
      },
      {
        title: '多行文本框',
        type: 'textarea',
        key: 'textarea',
        defaultValue: '我是一段简单的文本描述，主要的作用呢，就是让用户看看在字多的情况下有什么表现～',
        span: 24
      }
    ]
  },
  {
    title: '查询',
    type: 'card',
    key: '__search',
    children: [
      {
        title: '查询输入框',
        key: 'search',
        type: 'search',
        defaultValue: '可以按 enter 提交查询'
      },
      {
        title: '标签',
        key: 'tag-group',
        type: 'tag-group',
        span: 24,
        tooltip: '0.45.0 版本后可以使用',
        defaultValue: 1,
        options: [
          { label: '选项1', value: 1 },
          { label: '选项2', value: 2 },
          { label: '选项3', value: 3 },
          { label: '选项4', value: 4 },
          { label: '选项5', value: 5 }
        ]
      },
      {
        title: '可以多选标签',
        key: 'tag-group-multiple',
        type: 'tag-group',
        span: 24,
        tooltip: '0.45.0 版本后可以使用',
        multiple: true,
        defaultValue: [1, 2],
        options: [
          { label: '选项1', value: 1 },
          { label: '选项2', value: 2 },
          { label: '选项3', value: 3 },
          { label: '选项4', value: 4 },
          { label: '选项5', value: 5 }
        ]
      }
    ]
  },
  {
    title: '数值输入',
    type: 'card',
    key: '__number',
    children: [
      {
        title: '数字',
        type: 'number',
        key: 'number',
        placeholder: '数字',
        defaultValue: 249222
      },
      {
        title: '百分比输入',
        type: 'percent',
        key: 'percent',
        placeholder: '百分比',
        defaultValue: 67
      },
      {
        title: '滑块',
        type: 'slider',
        key: 'slider',
        defaultValue: 23
      }
    ]
  },
  {
    title: '勾选',
    type: 'card',
    key: '__check',
    children: [
      {
        title: '单个勾选',
        type: 'checkbox',
        key: 'checkbox',
        children: '同意？',
        defaultValue: true
      },
      {
        title: '多选组',
        type: 'checkbox-group',
        key: 'checkbox-group',
        defaultValue: [1, 3],
        options: [
          { label: '选项1', value: 1 },
          { label: '选项2', value: 2 },
          { label: '选项3', value: 3 }
        ]
      },
      {
        title: '单选组',
        type: 'radio-group',
        key: 'radio-group',
        defaultValue: 1,
        options: [
          { label: '选项1', value: 1 },
          { label: '选项2', value: 2 }
        ]
      },
      {
        title: '开关',
        type: 'switch',
        key: 'switch',
        defaultValue: true,
        tooltip: '0.43.0 版本后可以使用'
      },
      {
        title: '评分',
        type: 'rate',
        key: 'rate',
        defaultValue: 4,
        tooltip: '0.43.0 版本后可以使用'
      },
      {
        title: '卡片选择',
        key: 'card-group',
        type: 'card-group',
        span: 24,
        defaultValue: 1,
        tooltip: '0.47.0 版本后可以使用',
        options: [
          {
            value: 1,
            label: '支付宝',
            cover: require('./images/ali-pay.png'),
            description: '一段简单的文本描述'
          },
          {
            value: 2,
            label: '微信',
            cover: require('./images/wechat-pay.png'),
            description: '一段简单的文本描述'
          },
          {
            value: 3,
            label: '云闪付',
            cover: require('./images/union-pay.png'),
            description: '一段简单的文本描述'
          }
        ]
      }
    ]
  },
  {
    title: '日期',
    type: 'card',
    key: '__date',
    children: [
      {
        title: '日期',
        type: 'date',
        key: 'date',
        defaultValue: moment(),
        span: 12
      },
      {
        title: '日期区间',
        type: 'date-range',
        key: 'date-range',
        span: 12,
        defaultValue: [moment(), moment()],
        startKey: 'date-range-start',
        endKey: 'date-range-end'
      },
      {
        title: '日期带时间',
        type: 'date',
        key: 'datetime',
        defaultValue: moment(),
        span: 12,
        showTime: true
      },
      {
        title: '日期带时间区间',
        type: 'date-range',
        key: 'datetime-range',
        span: 12,
        defaultValue: [moment(), moment()],
        startKey: 'date-range-time-start',
        endKey: 'date-range-time-end',
        showTime: true
      }
    ]
  }
]

export default function Demo() {
  const [submitValues, setSubmitValues] = useState<AnyKeyProps>({})
  const [readonly, setReadonly] = useState<boolean>(false)

  return (
    <div>
      <p>
        <label style={{ marginRight: 4 }}>只读模式</label>
        <Switch defaultChecked={readonly} onChange={value => setReadonly(value)} />
      </p>
      <AyForm readonly={readonly} fields={fields} span={8} onConfirm={values => setSubmitValues(values)}>
        <Col span={24}>
          <AyButton style={{ marginLeft: 120 }} type="primary" htmlType="submit">
            提交
          </AyButton>
        </Col>
      </AyForm>

      {Object.keys(submitValues).length > 0 && <pre>{JSON.stringify(submitValues, null, 2)}</pre>}
    </div>
  )
}
```

## Desc 模式

<code src="./AyFormDescDemo.tsx" />

## 提示

```tsx
import React from 'react'
import { AyForm, AyFormField } from 'amiya'

const fields: Array<AyFormField> = [
  {
    title: 'Field A',
    key: 'a',
    tooltip: '这是 A 提示'
  },
  {
    title: 'Field B',
    key: 'b',
    help: '这是 B 提示'
  }
]

export default function Demo() {
  return <AyForm fields={fields} style={{ width: 400, margin: '0 auto' }} />
}
```

```diff
const fields: Array<AyFormField> = [
  {
    title: 'Field A',
    key: 'a',
+   tooltip: '这是 A 提示'
  },
  {
    title: 'Field B',
    key: 'b',
+   help: '这是 B 提示'
  }
]

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

| 参数名             | 说明                                                                                            | 参数类型                                                               | 默认值                                    | 版本   |
| ------------------ | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------- | ------ |
| title              | 相应的 key，会跟最后表单取到的项目相关; form 的 key 值必填                                      | string                                                                 | -                                         | -      |
| key                | 唯一 key，<span style="color: #f06;">当 key 以双下划线开头时，提交的值会把这一项被忽略。</span> | string                                                                 | -                                         | -      |
| type               | 表单项类型                                                                                      | [FormType][formtype]                                                   | 'input'                                   | -      |
| options            | 可选项                                                                                          | Array<[Option][option]>                                                | -                                         | -      |
| span               | Grid Col 占位 [0 - 24]                                                                          | number                                                                 | -                                         | -      |
| defaultValue       | 默认值                                                                                          | any                                                                    | -                                         | -      |
| required           | 是否必填                                                                                        | boolean                                                                | -                                         | -      |
| rules              | 自定义权限                                                                                      | Array<[Rules](https://ant-design.gitee.io/components/form-cn/#Rule)>   | -                                         | -      |
| visible            | 是否展示，保留占位; 保留默认值                                                                  | boolean                                                                | -                                         | -      |
| hidden             | 是否展示，不会占位; 保留默认值                                                                  | boolean \| Function                                                    | -                                         | -      |
| props              | 原生的属性                                                                                      | Object                                                                 | -                                         | -      |
| formItemProps      | FormItem 层原生的属性                                                                           | Object                                                                 | -                                         | -      |
| renderContent      | 自定义 content 内容，需要指定 type: 'custom'                                                    | (field: AyFormField, record: Record) => ReactNode                      | -                                         | -      |
| onChange           | 数据变化监听                                                                                    | (field: AyFormField, record: Record, setFieldsValue: Function) => void | -                                         | -      |
| help               | 在表单下会有一段提示文字                                                                        | string \| ReactNode                                                    | -                                         | -      |
| startKey           | 时间格式化的开始时间，提交时，会自动将日期区间拆分                                              | string                                                                 | 'startDate'                               | -      |
| endKey             | 时间格式化的结束时间，提交时，会自动将日期区间拆分                                              | string                                                                 | 'endDate'                                 | -      |
| formatRule         | 自定义格式化规则如果设置了 props.showTime = true，则格式化会默认带上时间                        | string                                                                 | 'YYYY-MM-DD' or <br>'YYYY-MM-DD HH:mm:ss' | -      |
| readonlyFormatRule | readonly 下的自定义格式化规则                                                                   | string                                                                 | 'YYYY-MM-DD' or <br>'YYYY-MM-DD HH:mm:ss' | -      |
| reSetting          | 重新渲染                                                                                        | (params: AyFormField, mode: string) => AyFormField                     | -                                         | -      |
| order              | 展示顺序                                                                                        | number                                                                 | -                                         | -      |
| tooltip            | 提示文本，此属性会在标题后面补上一个问号图标                                                    | String                                                                 | -                                         | 0.44.0 |

<span style="color: #f06;">日期格式化</span>相关的，可以点击[这里][日期格式化]查看更具体的细节。

## FormType 表单类型

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

| 值类型         | 说明                                                                    | 默认值          | 版本   |
| -------------- | ----------------------------------------------------------------------- | --------------- | ------ |
| input          | 输入框，默认字符长度 30                                                 | ''              | -      |
| number         | 数字输入框，0 ～ 99999999                                               | null            | -      |
| percent        | 百分比输入框，0 ～ 100                                                  | null            | -      |
| password       | 密码输入框                                                              | ''              | -      |
| textarea       | 多行输入框，默认字符长度 200                                            | ''              | -      |
| select         | 选择框, mode=multiple 可以支持多选                                      | undefined \| [] | -      |
| switch         | 开关                                                                    | false           | -      |
| slider         | 滑块                                                                    | null            | 0.43.0 |
| rate           | 评分                                                                    | null            | 0.43.0 |
| checkbox       | 多选框（单个）                                                          | false           | -      |
| checkbox-group | 多选框（多个）                                                          | []              | -      |
| radio-group    | 单选框（多个）                                                          | null            | -      |
| date           | 日期                                                                    | undefined       | -      |
| date-range     | 日期区间                                                                | []              | -      |
| empty          | 空白框                                                                  | -               | -      |
| custom         | 自定义内容 `renderContent` 时使用，同时需要定义默认值 `defaultValue` 。 | -               | -      |
| card           | 会用 AyCard 包裹住底下的 form，具体使用可以看 [卡片表单][cardform]。    | -               | -      |
| group          | 组合表单，具体使用可以看 [组合表单][groupform]。                        | -               | -      |
| input-group    | 带输入框的组合表单，具体使用可以看 [组合表单][groupform]。              | -               | -      |
| tag-group      | tag 选择，若设置 multiple 属性，可支持多选                              | undefined \| [] | 0.45.0 |
| card-group     | [卡片选择][cardgroup]，若设置 multiple 属性，可支持多选                 | null \| []      | 0.47.0 |

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
[formtype]: ./form#formtype-表单类型
[option]: ./form#option-参数
[ayformfield]: ./form#ayformfield-参数
[cardform]: ./form/card-form
[groupform]: ./form/group-form
[cardgroup]: ./form/card-group#在表单中使用
[日期格式化]: ./form/date-format
