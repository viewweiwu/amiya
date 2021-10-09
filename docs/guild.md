---
sidemenu: false
---

# 了解 Amiya

它是基于 antd 的二次封装，类似于 ProComponent。

## 跟直接用 antd 比有什么不同？

### AyForm

<Alert type="info">
  1. readonly 模式
</Alert>

| 表现效果区别                     | Amiya AyForm                                                    | antd Form                                            |
| -------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------- |
| 样式                             | 淡蓝色底，文字清晰，Select，DatePicker 等尾缀默认 icon 会消失。 | 元素禁用样式，鼠标悬浮会有禁用图标。                 |
| 空值                             | 显示 '-'。                                                      | 会显示 placeholder，跟有值的样式一样，有点容易混淆。 |
| 整体禁用                         | 可以整体，也可以局部。                                          | 挨个 disabled。                                      |
| 日期                             | 换行对比。                                                      | 溢出截断。                                           |
| 日期提交（点击提交按钮查看效果） | 遇到 daterange，提交的 key 会以 startDate, endDate 方式提交。   | 提交会是数组。                                       |

用 `antd` 实现的效果。↓↓↓↓↓↓↓↓↓↓

```tsx
import React from 'react'
import { Form, Input, Button, Checkbox, DatePicker, Select } from 'antd'
import 'antd/dist/antd.min.css'
import moment from 'moment'

const layout = {
  labelCol: { flex: '100px' }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
}

export default function Demo() {
  const onFinish = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ createName: 'arknights', name: 'amiya', type: '1', date: [moment(), moment()] }}
      onFinish={onFinish}
      style={{ width: 400, margin: '0 auto' }}
    >
      <Form.Item label="用户类型" name="type">
        <Select disabled>
          <Option value="1">外部用户</Option>
          <Option value="2">内部用户</Option>
        </Select>
      </Form.Item>

      <Form.Item label="创建人" name="createName">
        <Input disabled />
      </Form.Item>

      <Form.Item label="用户名" name="name">
        <Input disabled />
      </Form.Item>

      <Form.Item label="无值" name="empty">
        <Input disabled placeholder="没有值的时候会把 placeholder 显示出来" />
      </Form.Item>

      <Form.Item label="日期" name="date">
        <DatePicker.RangePicker showTime disabled />
      </Form.Item>

      <Button block type="primary" htmlType="submit">
        提交
      </Button>
    </Form>
  )
}
```

用 `Amiya` 实现的效果。↓↓↓↓↓↓↓↓↓↓

```tsx
import React from 'react'
import { AyForm, AyButton, AyFormField } from 'amiya'
import 'antd/dist/antd.min.css'
import moment from 'moment'

const fields: Array<AyFormField> = [
  {
    title: '用户类型',
    key: 'type',
    type: 'select',
    options: [
      { label: '外部用户', value: '1' },
      { label: '内部用户', value: '2' }
    ],
    defaultValue: '1'
  },
  {
    title: '创建人',
    key: 'createName',
    defaultValue: 'arknights'
  },
  {
    title: '用户名',
    key: 'name',
    defaultValue: 'amiya'
  },
  {
    title: '无值',
    key: 'empty'
  },
  {
    title: '日期',
    type: 'date-range',
    key: 'date',
    defaultValue: [moment(), moment()],
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
    <AyForm
      span={24}
      fields={fields}
      onConfirm={handleConfirm}
      style={{ width: 400, margin: '0 auto' }}
      layout={{ labelCol: { flex: '100px' } }}
      readonly
    >
      <AyButton block type="primary" htmlType="submit">
        提交
      </AyButton>
    </AyForm>
  )
}
```

<hr>
<Alert type="info">
  2. desc 模式
</Alert>

| 表现效果区别 | Amiya AyForm           | antd Descriptions                                                                                                        |
| ------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 样式         | label 默认居右。       | label 默认居左。                                                                                                         |
| 空间         | 严格按照 span 比例分。 | 第二列如果内容过多，会宽度更宽。                                                                                         |
| 形态         | 可以表单表格自由切换。 | 要么是 Descriptions，要么是 AyForm，需要写两套。不过 Descriptions 有可以有更多的形态，如根据屏幕宽度变更列，上下布局等。 |

用 `antd` 实现的效果。↓↓↓↓↓↓↓↓↓↓

```tsx
import React from 'react'
import { Descriptions } from 'antd'
import 'antd/dist/antd.min.css'

const data = {
  cname: '阿米娅',
  name: 'amiya',
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
      `.trim()
}

export default function Demo() {
  return (
    <Descriptions colon column={2} bordered labelStyle={{ textAlign: 'right' }}>
      <Descriptions.Item span={1} label="姓名">
        {data.cname}
      </Descriptions.Item>
      <Descriptions.Item span={1} label="英文名">
        {data.name}
      </Descriptions.Item>
      <Descriptions.Item span={1} label="初始HP">
        {data.defaultHp}
      </Descriptions.Item>
      <Descriptions.Item span={1} label="初始攻击">
        {data.defaultAtk}
      </Descriptions.Item>
      <Descriptions.Item span={1} label="职业">
        {data.profession}
      </Descriptions.Item>
      <Descriptions.Item span={1} label="上线时间">
        {data.createDate}
      </Descriptions.Item>
      <Descriptions.Item span={2} label="简介">
        <pre>{data.desc}</pre>
      </Descriptions.Item>
    </Descriptions>
  )
}
```

用 `Amiya` 实现的效果。↓↓↓↓↓↓↓↓↓↓

<code src="./components/Form/AyFormDescDemo.tsx" />

### AySearchTable

1. 支持分页删除。
2. 支持表格快捷按钮。刷新、密度、列控制、全屏。
3. 支持顶部加入查询条件。（默认 span 为 8 的 AyForm）
4. 支持右侧加入查询条件。在表格的操作按钮前面。

[1]: ./form#所有的默认表单类型
[2]: ./form#desc-模式
[3]: ./form/date%20日期的格式化
[4]: ./全局方法/register-field
