# Amiya 是什么？

它是基于 antd 一套扩展组件库，类似于 ProComponent。

跟 ProComponent 不同，

写法会更加简洁，一些重复的东西，只需要全局注册一次，即可全局使用。

## 跟直接用 antd 比有什么不同？

### AyForm

<Alert type="info">
  1. readonly 模式
</Alert>

| 表现效果区别 | amiya                  | antd                                                 |
| ------------ | ---------------------- | ---------------------------------------------------- |
| 样式         | 淡蓝色底，文字清晰。   | 元素禁用样式，鼠标悬浮会有禁用图标。                 |
| 空值         | 显示 '-'。             | 会显示 placeholder，跟有值的样式一样，有点容易混淆。 |
| 整体禁用     | 可以整体，也可以局部。 | 挨个 disabled。                                      |
| 日期         | 换行对比。             | 溢出截断。                                           |

用 `antd` 实现的效果。↓↓↓↓↓↓↓↓↓↓

```tsx
import React from 'react'
import { Form, Input, Button, Checkbox, DatePicker } from 'antd'
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
      initialValues={{ createName: 'arknights', name: 'amiya', date: [moment(), moment()] }}
      onFinish={onFinish}
      style={{ width: 400, margin: '0 auto' }}
    >
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

用 `amiya` 实现的效果。↓↓↓↓↓↓↓↓↓↓

```tsx
import React from 'react'
import { AyForm, AyButton, AyFormField } from 'amiya'
import 'antd/dist/antd.min.css'
import moment from 'moment'

const fields: Array<AyFormField> = [
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

<code src="./Form/AyFormDescDemo.tsx" />

```tsx
import React from 'react'
import { Descriptions } from 'antd'
import 'antd/dist/antd.min.css'

const data = {
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

2. 提供 desc 模式。让表单以 antd descriptions 样式展示。[查看效果][2]
3. 提供提交优化。遇到 daterange ，可以让提交的 key 以 startDate, endDate 方式提交。[查看效果][3]
4. 提供表单类型注册。[查看效果][4]

### AySearchTable

1. 支持分页删除。
2. 支持表格快捷按钮。刷新、密度、列控制、全屏。
3. 支持顶部加入查询条件。（默认 span 为 8 的 AyForm）
4. 支持右侧加入查询条件。在表格的操作按钮前面。

[1]: ./form#所有的默认表单类型
[2]: ./form#desc-模式
[3]: ./form/date%20日期的格式化
[4]: ./全局方法/register-field
