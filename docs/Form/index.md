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

## 表单布局

默认会是右侧，label 跟 content 在一起展示。此示例演示如何将 label 展示在顶部。

```tsx
import React from 'react'
import { AyForm, AyFormField } from 'amiya'
import 'antd/dist/antd.min.css'

type FormLayout = 'horizontal' | 'vertical' | 'inline'

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
  return (
    <AyForm
      layout={{ labelCol: { flex: '100%' } }}
      labelAlign="left"
      span={24}
      fields={fields}
      style={{ width: 400, margin: '0 auto' }}
    />
  )
}
```

## 创造一个连体 Field

可以通过一些特殊的技巧，创造一个连体的 Field，一般常见于右侧多一个 Checkbox。

```tsx
import React, { useState, MutableRefObject, useRef } from 'react'
import { AyForm, AyFormField, AyButton } from 'amiya'
import 'antd/dist/antd.min.css'

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

## Desc 模式

```tsx
import React, { useState, MutableRefObject, useEffect, useRef } from 'react'
import { AyForm, AyButton, AyFormField } from 'amiya'
import { Switch, Form, Row, Col } from 'antd'
import 'antd/dist/antd.min.css'

const fields: Array<AyFormField> = [
  {
    title: '姓名',
    key: 'cname'
  },
  {
    title: '英文名',
    key: 'name'
  },
  {
    title: '初始HP',
    key: 'defaultHp',
    type: 'number'
  },
  {
    title: '初始攻击',
    key: 'defaultAtk',
    type: 'number'
  },
  {
    title: '职业',
    key: 'profession',
    type: 'select',
    options: [
      { label: '狙击干员', value: '1' },
      { label: '医疗干员', value: '2' },
      { label: '术师干员', value: '3' }
    ]
  },
  {
    title: '上线时间',
    key: 'createDate',
    type: 'date',
    props: {
      showTime: true
    }
  },
  {
    title: '简介',
    type: 'textarea',
    key: 'desc',
    span: 24,
    props: {
      rows: 6
    }
  }
]

export default function Demo() {
  const [readonly, setReadonly] = useState<boolean>(true)
  const [desc, setDesc] = useState<boolean>(true)
  const formRef: MutableRefObject<any> = useRef()

  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  useEffect(() => {
    formRef.current.setFieldsValue({
      cname: '阿米娅',
      name: 'Amiya',
      defaultHp: 720,
      defaultAtk: 100,
      profession: '3',
      createDate: '2019-4-30 10:00:00',
      desc: `
初始开放
【物理强度】普通
【战场机动】标准
【生理耐受】普通
【战术规划】优良
【战斗技巧】标准
【源石技艺适应性】■■

客观履历

初始开放
罗德岛的公开领袖，在内部拥有最高执行权。虽然，从外表上看起来仅仅是个不成熟的少女，实际上，她却是深受大家信任的合格的领袖。
现在，阿米娅正带领着罗德岛，为了感染者的未来，为了让这片大地挣脱矿石病的阴霾而不懈努力。
      `
    })
  }, [])

  return (
    <>
      <p>
        <label style={{ marginRight: 4 }}>只读模式</label>
        <Switch defaultChecked={readonly} onChange={(value) => setReadonly(value)} />
        <label style={{ marginRight: 4, marginLeft: 10 }}>Desc</label>
        <Switch defaultChecked={desc} onChange={(value) => setDesc(value)} />
        <AyButton style={{ marginLeft: 10 }} onClick={() => formRef.current.setFieldsValue({ createDate: new Date() })}>
          填充上线时间
        </AyButton>
      </p>
      <AyForm ref={formRef} readonly={readonly} desc={desc} fields={fields} onConfirm={handleConfirm}>
        {!readonly && (
          <Col span={24}>
            <Form.Item style={desc ? { paddintTop: 10 } : {}}>
              <AyButton block type="primary" htmlType="submit">
                提交
              </AyButton>
            </Form.Item>
          </Col>
        )}
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

| 参数名        | 说明                                  | 参数类型                | 默认值    |
| ------------- | ------------------------------------- | ----------------------- | --------- |
| fields        | 配置项                                | Array<[AyFormField][2]> | -         |
| name          | form 名称，一般不需要填               | string                  | 'ay-form' |
| span          | antd Grid 的 Col 组件的 span 属性类似 | 1 ～ 24                 | 12        |
| readonly      | 只读模式                              | boolean                 | false     |
| desc          | Descripts 模式                        | boolean                 | false     |
| layout        | 布局参数, 查看下方 layout 参数        | Object                  | -         |
| props         | antd Form 其它参数                    | [查看参数][1]           | -         |
| formItemProps | antd Form.Item 其它参数               | Object                  | -         |
| onConfirm     | 提交事件监听                          | (form: Object) => void  | -         |

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

| 方法名                         | 说明                                                      | 返回值         |
| ------------------------------ | --------------------------------------------------------- | -------------- |
| submit()                       | 主动提交表单                                              | -              |
| resetFields()                  | 重置表单                                                  | -              |
| getFieldValue(key: string)     | 根据 key 获取表单值                                       | any            |
| getFieldsValue()               | 获取所有表单值                                            | values: Object |
| setFieldsValue(values: Object) | 设置表单值                                                | -              |
| refreshFields()                | 重新渲染表单，如果动态改变了 fields，可以用此参数重新渲染 | -              |

[1]: https://ant-design.gitee.io/components/form-cn/#API
[2]: /filed参数详解#ayformfield-参数
