# AyCtrl

- AyCtrl 下的元素会渲染成 AyAction 按钮，无论是什么元素。
- 按钮与按钮之间会有一个分割线（Divider）。
- 默认情况下超过 3 个子元素会进入折叠状态，自动折叠成下拉菜单。
- 折叠状态下的事件绑定会由 onClick 变成 onConfirm。
- 折叠状态下的 confirm 会变成弹窗确认。

## 基础示例

```tsx
import React, { useState } from 'react'
import { AyCtrl, AyAction } from 'amiya'
import 'antd/dist/antd.min.css'

export default function Demo() {
  return (
    <AyCtrl>
      <AyAction onClick={() => alert('修改')}>修改</AyAction>
      <AyAction onClick={() => alert('详情')}>详情</AyAction>
      <AyAction confirm confirmMsg="确定要删除吗？" onConfirm={() => alert('删除')}>
        删除
      </AyAction>
      <AyAction confirm confirmMsg="确定要审批吗？" onConfirm={() => alert('审批')}>
        审批
      </AyAction>
      <AyAction onClick={() => alert('复制')}>复制</AyAction>
    </AyCtrl>
  )
}
```

## 配合 AySearchTable

AySearchTable 下 AyCtrl 的样式会更加紧凑。

此表格只演示 AyCtrl 样式，点击操作列的按钮是没有效果的，想看效果点 [AySearchTable][aysearchtable]。

```tsx
import React from 'react'
import { AySearchTable, AyAction, AyCtrl, AySearchTableField } from 'amiya'
import { AyTableCtrlField } from 'amiya/lib/AyTable/ay-table'
import 'antd/dist/antd.min.css'

/**
 * 测试接口，实际过程中请使用 axios 接口
 * */
const listApi = () => {
  return new Promise((resolve) => {
    const data = [
      {
        id: '1',
        name: 'Amiya',
        cname: '阿米娅'
      },
      {
        id: '2',
        name: 'Exusiai',
        cname: '能天使'
      }
    ]
    setTimeout(() => {
      resolve({
        content: data,
        total: 2
      })
    }, 1000)
  })
}

/**
 * 测试接口，实际过程中请使用 axios 接口
 * */
const emptyApi = (params?: any) => {
  console.log(params)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 300)
  })
}

const fields: Array<AySearchTableField> = [
  {
    title: '姓名',
    key: 'cname'
  },
  {
    title: '英文名',
    key: 'name'
  }
]

// record、action 只有在 AySearchTable 下才会有作用
const CtrlField: AyTableCtrlField = {
  width: 200,
  render: (value, record) => {
    return (
      <AyCtrl>
        <AyAction record={record} action="update">
          编辑
        </AyAction>
        <AyAction record={record} action="view">
          详情
        </AyAction>
        <AyAction record={record} action="delete">
          删除
        </AyAction>
      </AyCtrl>
    )
  }
}

export default function Demo() {
  return (
    <AySearchTable
      searchVisible={false}
      extraVisible={false}
      title="注意操作列的按钮"
      api={listApi}
      fields={fields}
      ctrl={CtrlField}
    />
  )
}
```

## 参数

### max

- Type: number
- Default: 3

超过这个数值，会被折叠成下拉菜单。

### more

- Type: string
- Default: '更多'

下拉菜单的文字，默认会带一个 Icon，需要先配置 max 参数。

```tsx
import React, { useState } from 'react'
import { AyCtrl, AyAction } from 'amiya'
import 'antd/dist/antd.min.css'

export default function Demo() {
  return (
    <AyCtrl more={2} more="...">
      <AyAction>修改</AyAction>
      <AyAction>详情</AyAction>
      <AyAction>删除</AyAction>
      <AyAction>审批</AyAction>
    </AyCtrl>
  )
}
```

[aysearchtable]: ./table
