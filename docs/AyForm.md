# AyForm

## 登录示例

```tsx
import React from 'react'
import { AyForm, AyButton, AyFormField } from 'amiya'
import 'antd/dist/antd.min.css'

const fields: Array<AyFormField> = [
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

## 所有类型展示

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
    title: 'DateRange',
    type: 'date-range',
    key: 'date-range'
  },
  {
    title: 'Editor',
    type: 'editor',
    key: 'editor'
  }
]

export default function Demo() {
  const [readonly, setReadonly] = useState<boolean>(true)

  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <>
      <Switch chekced={readonly} defaultChecked={readonly} onChange={(value) => setReadonly(value)} />
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

## 日期添加快捷选项

可以注册日期类型来覆盖原本的 `date` 与 `date-range` 类型，达到全局添加默认选项的效果。

注册时请把注册的代码放到全局入口处，全局使用只需要注册一次。

```tsx
import React from 'react'
import { AyForm, AyFormField, registerField, AyButton } from 'amiya'
import { DatePicker, Row, Col } from 'antd'
import moment from 'moment'

// 区间日期快捷选项
const ranges: any = {
  今天: [moment().startOf('day'), moment().endOf('day')],
  昨天: [moment().subtract(1, 'day'), moment().subtract(1, 'day').endOf('day')],
  本周: [moment().startOf('week'), moment().endOf('day')],
  上周: [moment().startOf('week').subtract(7, 'day'), moment().endOf('week').subtract(7, 'day')],
  本月: [moment().startOf('month'), moment().endOf('day')],
  上月: [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
}

// 注册区间日期
registerField('date-range', {
  type: 'data-range',
  defaultValue: [],
  render: ({ field, readonly }: any) => (
    <DatePicker.RangePicker
      placeholder={['开始日期', '结束日期']}
      disabled={readonly}
      className="max-width"
      ranges={ranges}
      {...(field.props as any)}
    />
  )
})

// 日期快捷选项
const renderExtraFooter = (setFieldsValue: (params: AnyKeyProps) => void, field: AnyKeyProps) => {
  /**
   * 填充日期
   * @param value 日期
   */
  const setValue = (value: moment.Moment) => {
    setFieldsValue({
      [field.key]: value
    })
  }
  return (
    <>
      <a className="ant-picker-now-btn" style={{ marginRight: 4 }} onClick={() => setValue(moment().startOf('day'))}>
        今天早上
      </a>
      <a className="ant-picker-now-btn" style={{ marginRight: 4 }} onClick={() => setValue(moment().endOf('day'))}>
        今天晚上
      </a>
      <a
        className="ant-picker-now-btn"
        style={{ marginRight: 4 }}
        onClick={() => setValue(moment().subtract(1, 'day').startOf('day'))}
      >
        昨天早上
      </a>
      <a className="ant-picker-now-btn" onClick={() => setValue(moment().subtract(1, 'day').endOf('day'))}>
        昨天晚上
      </a>
    </>
  )
}

// 注册日期
registerField('date', {
  type: 'date',
  defaultValue: null,
  render: ({ field, readonly, setFieldsValue }: any) => (
    <DatePicker
      disabled={readonly}
      className="max-width"
      placeholder={`请选择${field.title || ''}`}
      renderExtraFooter={() => renderExtraFooter(setFieldsValue, field)}
      {...field.props}
    />
  )
})

const fields: Array<AyFormField> = [
  {
    title: '日期区间',
    key: 'date-range',
    type: 'date-range'
  },
  {
    title: '日期区间时间',
    key: 'datetime-range',
    type: 'date-range',
    props: {
      showTime: true
    }
  },
  {
    title: '日期',
    key: 'date',
    type: 'date'
  },
  {
    title: '日期时间',
    key: 'datetime',
    type: 'date',
    props: {
      showTime: true
    }
  }
]

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }
  return (
    <AyForm fields={fields} onConfirm={handleConfirm}>
      <AyButton block type="primary" htmlType="submit">
        提交
      </AyButton>
    </AyForm>
  )
}
```

## 注册表单类型

自定义表单项目，注册逻辑稍微复杂点的表单项。

请尝试点击下方表单的 `角色选择` 按钮。

注册时请把注册的代码放到全局入口处，全局使用只需要注册一次。

```tsx
import React, { useState, useMemo } from 'react'
import { AyForm, AyButton, AyFormField, registerField, AyDialog } from 'amiya'
import { Card } from 'antd'
import 'antd/dist/antd.min.css'

interface CharaSelectProps {
  value?: string
  onChange?: (value: string) => void
}

// 样式
const styles = {
  'chara-card': {
    width: 120,
    height: 250,
    marginRight: 10,
    backgroundColor: '#333',
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block',
    userSelect: 'none',
    cursor: 'pointer'
  },
  rarity: {
    top: 0,
    left: 4,
    zIndex: 1,
    position: 'absolute'
  },
  cg: {
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)'
  },
  line: {
    top: '60%',
    left: 0,
    width: '140%',
    height: '50%',
    padding: '8px 0',
    boxShadow: '0 0 10px 10px gold',
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, .8)',
    transform: 'rotate(30deg)',
    transformOrigin: 'left top',
    position: 'absolute'
  },
  name: {
    left: 4,
    bottom: 4,
    width: '100%',
    color: '#fff',
    zIndex: 2,
    position: 'absolute'
  },
  checked: {
    top: '50%',
    left: 0,
    width: '100%',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, .8)',
    zIndex: 10,
    position: 'absolute',
    textAlign: 'center'
  }
}

// 数据
const data: Array<any> = [
  {
    id: 1,
    cname: '阿米娅',
    name: 'amiya',
    cg: 'https://misc.hzzcckj.cn/upload/image/202010/aaaa793df000000.png',
    star: 5
  },
  {
    id: 2,
    cname: '能天使',
    name: 'Exusiai',
    cg: 'https://misc.hzzcckj.cn/upload/image/202010/aaaa7a7e6000000.png',
    star: 6
  },
  {
    id: 3,
    cname: '瑕光',
    name: 'Blemishine',
    cg: 'https://misc.hzzcckj.cn/upload/image/202010/aaaa7b481c00000.png',
    star: 6
  }
]

// 人物卡片
function CharaCard(props: any) {
  const { chara, onClick, value } = props
  return (
    <div style={styles['chara-card']} onClick={onClick}>
      <header style={styles['rarity']}>{''.padEnd(chara.star * 2, '⭐️')}</header>
      <img style={styles['cg']} src={chara.cg} />
      <div style={styles['line']}></div>
      <div style={styles['shadow']}></div>
      <div style={styles['name']}>
        <div>{chara.name}</div>
        <div style={styles['cname']}>{chara.cname}</div>
      </div>
      {value === chara.id && <div style={styles['checked']}>已选择</div>}
    </div>
  )
}

// 人物选择
function CharaSelect(props: CharaSelectProps) {
  const { value, onChange } = props
  const [checked, setChecked] = useState<string>(value || '')
  const [visible, setVisible] = useState<boolean>(false)

  // 获得选中的人物
  const activeChara = useMemo(() => {
    return data.find((chara) => chara.id === value)
  }, [value])

  // 打开弹窗选择
  const handleSelect = () => {
    setChecked(value)
    setVisible(true)
  }

  // 提交选择
  const handleConfirm = () => {
    onChange && onChange(checked)
    setVisible(false)
  }

  return (
    <div className="chara-select">
      {activeChara ? (
        <CharaCard chara={activeChara} onClick={handleSelect} />
      ) : (
        <AyButton onClick={handleSelect}>角色选择</AyButton>
      )}
      <AyDialog title="角色选择" visible={visible} setVisible={setVisible} onConfirm={handleConfirm}>
        {data.map((chara) => {
          return <CharaCard value={checked} key={chara.id} chara={chara} onClick={() => setChecked(chara.id)} />
        })}
      </AyDialog>
    </div>
  )
}

// 注册一个角色选择
registerField('chara-select', {
  type: '角色选择',
  defaultValue: '',
  render: (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly: boolean) => (
    <CharaSelect {...field.props} />
  )
})

const fields: Array<AyFormField> = [
  {
    title: '姓名',
    key: 'input'
  },
  {
    title: '选择人物',
    type: 'chara-select',
    key: 'chara',
    required: true
  }
]

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <AyForm span={24} fields={fields} style={{ width: 400, margin: '0 auto' }} onConfirm={handleConfirm}>
      <AyButton type="primary" htmlType="submit" style={{ marginLeft: 120 }}>
        提交
      </AyButton>
    </AyForm>
  )
}
```

## 参数

| 参数名    | 说明                                  | 参数类型                | 默认值    |
| --------- | ------------------------------------- | ----------------------- | --------- |
| fields    | 配置项                                | Array<[AyFormField][2]> | -         |
| name      | form 名称，一般不需要填               | string                  | 'ay-form' |
| onConfirm | 提交事件监听                          | (form: Object) => void  | -         |
| span      | antd Grid 的 Col 组件的 span 属性类似 | 1 ～ 24                 | 12        |
| footer    | 自定义底部按钮                        | ReactNode               | -         |
| width     | 弹窗宽度                              | number                  | -         |
| layout    | 布局参数, 查看下方 layout 参数        | Object                  | -         |
| props     | antd Form 其它参数                    | [查看参数][1]           | -         |

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

[1]: https://ant-design.gitee.io/components/form-cn/#API
[2]: /filed参数详解#ayformfield-参数
